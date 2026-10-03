import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Streaming endpoint with full HTTP 206 Partial Content (Range) support for Safari & Chrome video tags
app.get('/videos/smart_child_intro.mp4', (req, res) => {
  const videoPath = path.resolve(__dirname, 'public/videos/smart_child_intro.mp4');
  if (!fs.existsSync(videoPath)) {
    return res.status(404).send('Video not found');
  }

  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;
    const file = fs.createReadStream(videoPath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
      'Accept-Ranges': 'bytes',
    };
    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
  }
});

// Serve captions and static video assets
app.use('/videos', express.static(path.resolve(__dirname, 'public/videos')));

// Initialize GoogleGenAI SDK safely
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// System Prompt for Smart Child AI Coach (Pakistani Context & Multilingual)
const COACH_SYSTEM_INSTRUCTION = `You are the "Smart Child AI Coach", an empathetic, positive, and non-judgmental educational mentor.
Your mission is to help children, teenagers, and parents develop a healthier, productive, and balanced relationship with technology.

Core Philosophy:
UNDERSTAND → BALANCE → REDIRECT → CREATE → MOVE → GROW

Crucial Behavioral Rules:
1. NEVER recommend simply taking the phone or device away. Technology is NOT the enemy.
2. Distinguish PASSIVE USE (mindless scrolling, endless gaming without breaks) from PRODUCTIVE USE (coding, digital art, video creation, game design, learning).
3. NEVER shame, blame, or criticize. Never call a child "lazy", "addicted", "bad", or "irresponsible".
4. NEVER diagnose any medical or psychological condition (such as ADHD, depression, anxiety, addiction, or eating disorders).
5. If serious danger, abuse, self-harm, or severe safety issues are mentioned, immediately advise speaking to a trusted adult or local emergency/helpline services.
6. Food advice must remain wholesome and balanced (water, fresh seasonal fruits, nutritious homemade food, mindful eating). NEVER mention calories, weight loss, or restrictive diets. Culturally connect with Pakistani family meals (roti, daal, fresh fruit, home-cooked food).
7. Physical activity should be joyful, accessible, and age-appropriate (cricket, football, cycling, badminton, neighborhood walks).
8. AI Education: teach that AI is an assistant that can make mistakes, must be fact-checked, and should amplify (not replace) human thinking.
9. World of AI & Future Skills Mindset:
   - When asked what to learn or create:
     * If user likes games but doesn't know coding: Explain warmly that game design starts with ideas, rules, and drawing on paper, or simple visual tools like Scratch.
     * If user asks "AI se app kaise bana sakta hoon?": Break it down into friendly steps: sketch the idea on paper, write what buttons do, and use beginner tools.
     * If user says "I don't want to learn coding": Strongly validate that coding is only ONE path! Highlight digital art, storytelling, video editing, music, science, sports, and nature.
     * Emphasize: AI is a tool. AI + Human Creativity = Powerful. Humans provide curiosity, judgment, empathy, and critical thinking.
10. 7-Day Smart Child Challenge Intelligence:
    - Day 1: Notice digital habits with scientific curiosity, zero shame.
    - Day 2: Move your body (cricket, football, cycling, walking, active play).
    - Day 3: Eat smart (drink water, fruit, screen-free family meal, zero diet/calorie talk).
    - Day 4: Create something (design a game, app wireframe, digital art, story).
    - Day 5: Learn with AI (Ask -> Think -> Check -> Learn; verify facts, protect privacy).
    - Day 6: Leave the screen (family time, outdoors, books, board games).
    - Day 7: Build your future idea (solve a real problem, first step, future skills).
    - When asked about the challenge in voice or text (e.g., "Aaj ka challenge kya hai?", "Start my 7-day challenge", "Day 4 mein kya karna hai?"): Explain the specific day concisely and encourage real-world action!

PAKISTANI LANGUAGE & CULTURAL INTELLIGENCE (CRITICAL):
1. Multilingual Support:
   - English: Respond in natural, encouraging English.
   - Urdu Script: Use simple everyday Pakistani Urdu. Avoid overly formal literary Urdu or Hindi-specific vocabulary. Use natural phrases like: "آپ اپنے فارغ وقت میں کچھ نیا سیکھ یا بنا سکتے ہیں۔"
   - Roman Urdu: When the user speaks or types in Roman Urdu (e.g., "mera beta mobile bohat use karta hai"), respond NATURALLY in Roman Urdu! Do NOT convert it to formal Urdu script.
     Example Roman Urdu: "Samajh sakta hoon. Mobile foran cheen lene ke bajaye pehle ye dekhna behtar hai ke woh mobile par kya karta hai. Agar usay gaming pasand hai to hum us interest ko game design ya coding ki taraf redirect kar sakte hain."
   - Code-Switching / Mixed Language: Pakistani users frequently mix English and Urdu (e.g. "mera beta gaming bohat karta hai aur studies mein interest nahi hai", "AI se app banana seekhna hai"). Understand mixed language naturally and respond in the user's blended style.
   - Follow Language Switches: If the user changes language mid-conversation (e.g., switches from Roman Urdu to English or asks "Urdu mein samjha dein"), immediately follow their chosen language while maintaining the full conversation context.

2. Tone by Age & Audience:
   - Ages 6–8: Very simple, joyful, warm ("Chalo ek fun idea try karte hain!").
   - Ages 9–12: Friendly, curious, conversational ("Tumhein gaming pasand hai? Great! Kya tumne kabhi socha hai apna game kaise banate hain?").
   - Ages 13–15: Respectful, supportive, never childish or patronizing.
   - Ages 16–17: Mature, practical, focusing on future skills, digital portfolios, and real-world creations.
   - Parents: Respectful, practical, collaborative ("Mobile foran cheen lena zaroori nahi. Pehle ye dekhna useful hoga ke woh kya pasand karta hai...").

3. Low-Cost & Inclusive Realities:
   - Never assume expensive equipment, gaming consoles, or high-speed internet.
   - Recommend accessible activities: drawing app wireframes or game levels on paper, planning stories in a notebook, backyard cricket, running, offline learning, and family board games.
   - Respect diverse Pakistani family structures, schools, and backgrounds.`;

// Endpoint 1: Generate Initial Personalized Balance Plan
app.post('/api/ai-coach/plan', async (req, res) => {
  try {
    const { role, answers, language } = req.body;

    const userPrompt = `Generate a personalized Smart Child SMART BALANCE PLAN based on the following survey data:
User Type: ${role === 'parent' ? 'Parent' : 'Child / Teenager'}
Survey Details:
${JSON.stringify(answers, null, 2)}
Preferred Language: ${language || 'Auto-detect from survey answers (English, natural everyday Pakistani Urdu, or Roman Urdu)'}

Ensure the plan follows:
- Philosophy: Don't Just Remove. Redirect. Turn screen time into skill time.
- If parent, include "whyThisPlan" explaining that this plan doesn't aim to eliminate technology, but redirects passive use while protecting movement, sleep, and family time.
- 1. todayStep: exactly ONE bite-sized action to do today.
- 2. screenToSkill: how their specific interest (gaming, videos, etc.) is redirected into a productive skill (coding, animation, UI design).
- 3. move: flexible, enjoyable physical activity (approx 30 mins, cricket, cycling, walking).
- 4. eatSmart: wholesome nourishment (water, seasonal fruit, screen-free family dining).
- 5. create: a tangible creative project (design on paper, simple script).
- 6. futureSkill: AI / future digital literacy skill.
- 7. offlineActivity: real-world hobby or outdoor exploration.
- 8. familySocial: screen-free family connection.
- 9. sleep: restful bedtime routine.
- 10. weeklyChallenge: one exciting weekly challenge (e.g., Screen-to-Skill Challenge, Game Creator Challenge).
- Language: If answers are in Roman Urdu, generate the plan in natural Roman Urdu. If in Urdu script, generate in natural Pakistani Urdu. If in English, generate in English.`;

    if (!ai) {
      return res.status(503).json({
        error: 'API key not configured',
        message: "I'm having trouble connecting right now. Please try again in a moment.",
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction: COACH_SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            whyThisPlan: {
              type: Type.STRING,
              description: 'Explanation for parents on why redirection is used instead of total restriction.',
            },
            todayStep: {
              type: Type.STRING,
              description: "1. TODAY'S SMALL STEP: Exactly one bite-sized action to do today.",
            },
            screenToSkill: {
              type: Type.STRING,
              description: '2. SCREEN -> SKILL: Turning their passive interest into a creative/productive skill.',
            },
            move: {
              type: Type.STRING,
              description: '3. MOVE: Flexible, enjoyable physical activity (e.g. cricket, cycling, walking).',
            },
            eatSmart: {
              type: Type.STRING,
              description: '4. EAT SMART: Wholesome food/water habit without diets or calorie counting.',
            },
            create: {
              type: Type.STRING,
              description: '5. CREATE: A hands-on project to design or build.',
            },
            futureSkill: {
              type: Type.STRING,
              description: '6. AI / FUTURE SKILL: Learning AI literacy or beginner programming.',
            },
            offlineActivity: {
              type: Type.STRING,
              description: '7. OFFLINE ACTIVITY: Non-digital creative, nature, or board game activity.',
            },
            familySocial: {
              type: Type.STRING,
              description: '8. FAMILY / SOCIAL TIME: Meaningful screen-free connection with family.',
            },
            sleep: {
              type: Type.STRING,
              description: '9. SLEEP REMINDER: Healthy bedtime habit.',
            },
            weeklyChallenge: {
              type: Type.STRING,
              description: '10. ONE WEEKLY CHALLENGE: One fun weekly achievement goal.',
            },
            understand: {
              type: Type.STRING,
              description: 'Empathetic summary of user situation.',
            },
            strength: {
              type: Type.STRING,
              description: 'Positive acknowledgment of the child curiosity or capability.',
            },
            redirect: {
              type: Type.STRING,
              description: 'How to channel screen habits.',
            },
            realWorld: {
              type: Type.STRING,
              description: 'Offline activity.',
            },
            encouragement: {
              type: Type.STRING,
              description: 'Short uplifting closing message.',
            },
          },
          required: [
            'todayStep',
            'screenToSkill',
            'move',
            'eatSmart',
            'create',
            'futureSkill',
            'weeklyChallenge',
          ],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error('Empty response from model');
    }

    const planData = JSON.parse(text);
    return res.json(planData);
  } catch (error: any) {
    console.error('Error generating balance plan:', error);
    return res.status(500).json({
      error: 'Failed to generate plan',
      message: "I'm having trouble connecting right now. Please try again in a moment.",
    });
  }
});

// Endpoint 1B: Day 7 Challenge Future Idea Breakdown
app.post('/api/ai-coach/day7-idea', async (req, res) => {
  try {
    const { ideaType, problemText, age, language } = req.body;

    if (!problemText) {
      return res.status(400).json({ error: 'Problem description is required' });
    }

    if (!ai) {
      return res.status(503).json({
        error: 'API key not configured',
        message: "I'm having trouble connecting right now. Please try again in a moment.",
      });
    }

    const prompt = `A young creator (Age: ${age || '10-14'}) has shared their Day 7 "Build Your Future Idea":
Idea Type: ${ideaType}
Problem to Solve: "${problemText}"
Preferred Language: ${language || 'Auto-detect from input (English, Roman Urdu, or Urdu script)'}

Provide a structured, encouraging, age-appropriate breakdown:
- idea: A clear, inspiring title and description for their invention.
- problem: Clear summary of the problem it solves.
- whoItHelps: Who benefits in their community, home, or school.
- firstStep: Exactly ONE paper-or-free-tool action they can do today in 15 minutes.
- skillsToLearn: Array of 3-4 future skills they will cultivate.
- nextStep: An exciting next milestone.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: COACH_SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            idea: { type: Type.STRING },
            problem: { type: Type.STRING },
            whoItHelps: { type: Type.STRING },
            firstStep: { type: Type.STRING },
            skillsToLearn: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            nextStep: { type: Type.STRING },
          },
          required: ['idea', 'problem', 'whoItHelps', 'firstStep', 'skillsToLearn', 'nextStep'],
        },
      },
    });

    const result = JSON.parse(response.text || '{}');
    return res.json(result);
  } catch (error: any) {
    console.error('Error in Day 7 idea endpoint:', error);
    return res.status(500).json({
      idea: 'Community Helper Project',
      problem: req.body.problemText || 'Solving an everyday problem',
      whoItHelps: 'Friends, family, and neighborhood',
      firstStep: 'Sketch 3 screen boxes on paper showing how the idea works.',
      skillsToLearn: ['Design Thinking', 'Problem Decomposition', 'User Empathy'],
      nextStep: 'Share your paper sketch with a family member and ask for 1 feedback idea!',
    });
  }
});

// Endpoint 2: Follow-up Conversational Chat (Standard)
app.post('/api/ai-coach/chat', async (req, res) => {
  try {
    const { message, history, context, mode } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!ai) {
      return res.status(503).json({
        error: 'API key not configured',
        message: "I'm having trouble connecting right now. Please try again in a moment.",
      });
    }

    const isVoiceMode = mode === 'voice';

    const chatContextPrompt = `You are the Smart Child AI Coach continuing a conversation with a ${
      context?.role === 'parent' ? 'parent' : 'child / teenager'
    }.
Context already known from assessment:
${JSON.stringify(context || {}, null, 2)}

User statement:
"${message}"

${
  isVoiceMode
    ? `VOICE CONVERSATION RULES (REAL-TIME LOW-LATENCY):
- Answer in 1 to 3 short sentences (maximum 35 words).
- Ask only ONE follow-up question at a time to keep natural back-and-forth dialogue.
- DO NOT repeat greetings ("Hi! I'm Smart Child AI").
- DO NOT use markdown symbols, asterisks (**), or bullet points, as this is spoken directly aloud.
- Language Matching & Code-Switching:
  * If the user spoke in Roman Urdu (e.g. "mera beta mobile bohat use karta hai"), reply in natural everyday Roman Urdu.
  * If the user spoke in Urdu script, reply in simple everyday Pakistani Urdu.
  * If the user spoke in English, reply in English.
  * If the user mixed English & Urdu (e.g. "mera beta gaming karta hai aur studies mein focus nahi hai"), match their natural mixed style.
  * If user asks "mobile foran cheen lena chahiye?", explain the "Don't Just Remove -> Redirect" philosophy warmly.
- Keep tone supportive, friendly, and culturally attuned to Pakistani families.`
    : `Instructions:
- Keep the response encouraging, constructive, and practical.
- Never shame or judge. Never diagnose conditions.
- Language: Automatically match the user's language (English, Pakistani Urdu script, or Roman Urdu like "mera beta mobile bohat use karta hai").
- Support code-switching naturally without forcing the user to pick one language.
- Remember previous context so you do not ask them to re-explain things they already shared.`
}`;

    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history)) {
      history.slice(-8).forEach((h: any) => {
        if (h.sender && h.text) {
          contents.push({
            role: h.sender === 'user' ? 'user' : 'model',
            parts: [{ text: h.text }],
          });
        }
      });
    }

    contents.push({
      role: 'user',
      parts: [{ text: chatContextPrompt }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction: COACH_SYSTEM_INSTRUCTION,
        temperature: isVoiceMode ? 0.5 : 0.7,
      },
    });

    const reply = response.text || "I'm here to help. What would you like to explore next?";
    return res.json({ reply });
  } catch (error: any) {
    console.error('Error in chat endpoint:', error);
    return res.status(500).json({
      error: 'Chat error',
      message: "I'm having trouble connecting right now. Please try again in a moment.",
    });
  }
});

// Endpoint 3: Real-Time Streaming Chat for Ultra-Low Latency Voice
app.post('/api/ai-coach/chat-stream', async (req, res) => {
  try {
    const { message, history, context } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!ai) {
      return res.status(503).json({
        error: 'API key not configured',
        message: "I'm having trouble connecting right now. Please try again in a moment.",
      });
    }

    const voicePrompt = `You are the Smart Child AI Coach in an active real-time voice call with a ${
      context?.role === 'parent' ? 'parent' : 'child / teenager'
    }.
Context: ${JSON.stringify(context || {}, null, 2)}
User said: "${message}"

VOICE CONVERSATION INSTRUCTIONS (PAKISTANI CONTEXT & SPEED):
- Answer in 1 to 3 short spoken sentences (maximum 35 words).
- Speak directly and naturally to the user.
- Ask only ONE follow-up question at a time to keep conversation moving.
- DO NOT repeat greetings ("Hi! I'm Smart Child AI").
- DO NOT use markdown symbols, asterisks (**), or bullet points.
- Language Matching & Code-Switching:
  * If the user spoke in Roman Urdu (e.g. "mera beta mobile bohat use karta hai"), reply in everyday conversational Roman Urdu.
  * If the user spoke in Urdu script (e.g. "میرے بیٹے کو گیمز بہت پسند ہیں"), reply in simple, natural Pakistani Urdu.
  * If the user spoke in English, reply in English.
  * If the user mixed English & Urdu, match their natural code-switching style.
  * If the user asks "mobile foran cheen lena chahiye?", explain the "Don't Just Remove -> Redirect" philosophy warmly.
- Keep tone supportive, practical, and culturally attuned to Pakistani families.`;

    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history)) {
      history.slice(-8).forEach((h: any) => {
        if (h.sender && h.text) {
          contents.push({
            role: h.sender === 'user' ? 'user' : 'model',
            parts: [{ text: h.text }],
          });
        }
      });
    }

    contents.push({
      role: 'user',
      parts: [{ text: voicePrompt }],
    });

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction: COACH_SYSTEM_INSTRUCTION,
        temperature: 0.5,
      },
    });

    for await (const chunk of responseStream) {
      const text = chunk.text;
      if (text) {
        res.write(`data: ${JSON.stringify({ text })}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error: any) {
    console.error('Error in chat-stream endpoint:', error);
    if (!res.headersSent) {
      return res.status(500).json({ error: 'Stream error' });
    }
    res.end();
  }
});

// Start Express server and attach Vite in Dev
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  // Serve static files from public directory (e.g. video files, subtitles)
  app.use(express.static(path.resolve(__dirname, 'public')));

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();

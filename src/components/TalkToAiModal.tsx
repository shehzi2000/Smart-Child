import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Sparkles,
  Bot,
  User,
  Users,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Send,
  RotateCcw,
  Lock,
  MessageSquare,
  AlertCircle,
  Headphones,
  Check,
  ChevronRight,
  PhoneOff,
  RefreshCw,
  Clock,
  Target,
  Gamepad2,
  Activity,
  Apple,
  Cpu,
  Heart,
  Moon,
  Trophy,
  Compass,
  FileText,
  Smile,
} from 'lucide-react';

interface TalkToAiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type UserRole = 'child' | 'parent';

interface SmartBalanceSurvey {
  target: 'me' | 'my-child';
  age: string;
  interests: string[];
  concern: string;
  device: string;
  freeTime: string;
  learnGoal: string;
}

interface SmartBalancePlanData {
  whyThisPlan?: string;
  todayStep: string;
  screenToSkill: string;
  move: string;
  eatSmart: string;
  create: string;
  futureSkill: string;
  offlineActivity?: string;
  familySocial?: string;
  sleep?: string;
  weeklyChallenge: string;
  understand?: string;
  strength?: string;
  encouragement?: string;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

type VoiceState = 'idle' | 'listening' | 'thinking' | 'speaking';
type MicErrorType = 'denied' | 'iframe-restriction' | 'unsupported' | 'not-found' | 'network-stuck' | null;

export const TalkToAiModal: React.FC<TalkToAiModalProps> = ({ isOpen, onClose }) => {
  // Navigation State: 'intro' -> 'survey' -> 'generating' -> 'plan' -> 'voice' -> 'voice-ended'
  const [screen, setScreen] = useState<'intro' | 'survey' | 'generating' | 'plan' | 'voice' | 'voice-ended'>('intro');
  const [role, setRole] = useState<UserRole>('child');
  const [surveyStep, setSurveyStep] = useState<number>(1);

  // 7-Question Smart Balance Survey State
  const [survey, setSurvey] = useState<SmartBalanceSurvey>({
    target: 'me',
    age: '9–12',
    interests: ['🎮 Gaming', '📱 Videos'],
    concern: 'Too much passive screen time',
    device: 'Laptop/Desktop',
    freeTime: '2 hours',
    learnGoal: 'Coding',
  });

  // Generated Smart Balance Plan from Gemini
  const [plan, setPlan] = useState<SmartBalancePlanData | null>(null);

  // Local progress tracker for the plan: item status 'done' | 'later' | null
  const [itemProgress, setItemProgress] = useState<Record<string, 'done' | 'later'>>({});
  const [encouragingToast, setEncouragingToast] = useState<string | null>(null);

  // Text Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputQuery, setInputQuery] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Voice Conversation State
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [lastAiSpokenText, setLastAiSpokenText] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [micErrorType, setMicErrorType] = useState<MicErrorType>(null);
  const [isRequestingPermission, setIsRequestingPermission] = useState(false);

  // Audio References
  const recognitionRef = useRef<any>(null);
  const isVoiceActiveRef = useRef(false);
  const currentStreamRef = useRef<MediaStream | null>(null);
  const silenceTimerRef = useRef<any>(null);
  const speechQueueRef = useRef<string[]>([]);
  const isSpeakingQueueRef = useRef(false);
  const activeAbortControllerRef = useRef<AbortController | null>(null);
  const voiceSessionHistoryRef = useRef<Array<{ sender: 'user' | 'ai'; text: string }>>([]);

  // Clean shutdown when modal closes
  useEffect(() => {
    return () => {
      stopVoiceSession();
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      stopVoiceSession();
    }
  }, [isOpen]);

  const stopVoiceSession = () => {
    isVoiceActiveRef.current = false;
    clearTimeout(silenceTimerRef.current);

    if (activeAbortControllerRef.current) {
      activeAbortControllerRef.current.abort();
      activeAbortControllerRef.current = null;
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    speechQueueRef.current = [];
    isSpeakingQueueRef.current = false;

    if (recognitionRef.current) {
      try {
        recognitionRef.current.onend = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onresult = null;
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    }

    if (currentStreamRef.current) {
      currentStreamRef.current.getTracks().forEach((track) => track.stop());
      currentStreamRef.current = null;
    }

    setVoiceState('idle');
  };

  if (!isOpen) return null;

  // Survey Question Options (as specified in prompt)
  const ageOptions = ['6–8', '9–12', '13–15', '16–17'];

  const interestOptions = [
    '🎮 Gaming',
    '📱 Videos',
    '🎨 Drawing',
    '⚽ Sports',
    '🎵 Music',
    '📚 Reading',
    '💻 Coding',
    '🤖 AI',
    '🎬 Video creation',
    '🧩 Problem solving',
    '✍️ Writing',
    '🌳 Outdoor activities',
    'Other',
  ];

  const concernOptions = [
    'Too much passive screen time',
    'Not enough physical activity',
    'Too much junk food',
    'Sleep routine',
    'Lack of creativity',
    'Difficulty balancing school and technology',
    'I want to develop future skills',
    'General healthy balance',
  ];

  const deviceOptions = [
    'Smartphone',
    'Tablet',
    'Laptop/Desktop',
    'Multiple devices',
    'Limited/no personal device',
  ];

  const freeTimeOptions = ['30 minutes', '1 hour', '2 hours', '3+ hours'];

  const learnGoalOptions = [
    'AI',
    'Coding',
    'App development',
    'Game development',
    'Digital design',
    'Video creation',
    'Writing',
    'Other',
  ];

  const starterQuestions = [
    'Mera beta mobile bohat use karta hai',
    'میرے بیٹے کو گیمز بہت پسند ہیں',
    'AI se app banana seekhna hai',
    'Mobile foran cheen lena theek hai?',
    'My child loves PUBG. What productive activity can I give him?',
    'My daughter loves drawing',
  ];

  const toggleArrayItem = (list: string[], item: string) => {
    return list.includes(item) ? list.filter((i) => i !== item) : [...list, item];
  };

  const handleStartSurvey = (chosenRole: UserRole) => {
    setRole(chosenRole);
    setSurvey((prev) => ({
      ...prev,
      target: chosenRole === 'parent' ? 'my-child' : 'me',
    }));
    setSurveyStep(1);
    setScreen('survey');
  };

  // Generate Smart Balance Plan via Gemini
  const handleGeneratePlan = async () => {
    setScreen('generating');

    try {
      const response = await fetch('/api/ai-coach/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, answers: survey }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data: SmartBalancePlanData = await response.json();
      setPlan(data);
      setScreen('plan');
      setChatMessages([
        {
          id: 'welcome-plan',
          sender: 'ai',
          text:
            role === 'child'
              ? `Hi! Your personalized Smart Balance Plan is ready below. Every step turns your current screen passions into real creation and healthy balance!`
              : `Welcome! Here is your child's personalized Smart Balance Plan. It focuses on gentle redirection toward creativity and movement rather than frustrating cutoffs.`,
          timestamp: 'Just now',
        },
      ]);
    } catch {
      const fallback = createFallbackPlan(survey, role);
      setPlan(fallback);
      setScreen('plan');
      setChatMessages([
        {
          id: 'welcome-fallback',
          sender: 'ai',
          text: `Your personalized Smart Balance Plan is ready below. Feel free to ask any question in English, Urdu, or Roman Urdu!`,
          timestamp: 'Just now',
        },
      ]);
    }
  };

  const handleMarkProgress = (key: string, status: 'done' | 'later') => {
    setItemProgress((prev) => ({
      ...prev,
      [key]: prev[key] === status ? ('later' as any) : status,
    }));

    if (status === 'done') {
      setEncouragingToast('“Nice work! One small change is still progress.”');
      setTimeout(() => setEncouragingToast(null), 3500);
    }
  };

  // Text Chat Message
  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsAiThinking(true);

    try {
      const response = await fetch('/api/ai-coach/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: chatMessages,
          context: {
            role,
            survey,
            plan,
          },
          mode: 'text',
        }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      const aiReply = data.reply || "I'm here to help. What would you like to explore next?";

      setChatMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: aiReply,
          timestamp: 'Just now',
        },
      ]);
    } catch {
      const fallbackReply = generateFallbackChatReply(query, role);
      setChatMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: fallbackReply,
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setIsAiThinking(false);
    }
  };

  // ========================================================
  // VOICE CONVERSATION ENGINE (FAST STREAMING)
  // ========================================================

  const queueSpeechSentence = (sentence: string, isFinalChunk = false) => {
    const clean = sentence.replace(/[*#_`]/g, '').trim();
    if (!clean) return;

    speechQueueRef.current.push(clean);
    if (!isSpeakingQueueRef.current) {
      playNextSpeechFromQueue();
    }
  };

  const playNextSpeechFromQueue = () => {
    if (!isVoiceActiveRef.current) return;

    if (speechQueueRef.current.length === 0) {
      isSpeakingQueueRef.current = false;
      startListeningTurn();
      return;
    }

    isSpeakingQueueRef.current = true;
    const nextSentence = speechQueueRef.current.shift()!;
    setVoiceState('speaking');
    setLastAiSpokenText((prev) => (prev ? `${prev} ${nextSentence}` : nextSentence));

    if (isMuted || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setTimeout(() => {
        playNextSpeechFromQueue();
      }, 700);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(nextSentence);
    utterance.rate = 1.0;
    utterance.pitch = 1.05;

    const isUrduScript = /[\u0600-\u06FF]/.test(nextSentence);
    utterance.lang = isUrduScript ? 'ur-PK' : 'en-US';

    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(
      (v) => v.lang.startsWith(utterance.lang.slice(0, 2)) && (v.name.includes('Natural') || v.name.includes('Google'))
    );
    if (naturalVoice) utterance.voice = naturalVoice;

    utterance.onend = () => {
      playNextSpeechFromQueue();
    };

    utterance.onerror = () => {
      playNextSpeechFromQueue();
    };

    window.speechSynthesis.speak(utterance);
  };

  const startVoiceConversation = async () => {
    setMicErrorType(null);
    setIsRequestingPermission(true);

    const hasMediaDevices = typeof navigator !== 'undefined' && !!navigator.mediaDevices;
    const hasGetUserMedia = typeof navigator !== 'undefined' && !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    const isInIframe = typeof window !== 'undefined' && window.self !== window.top;
    const SpeechRecognition = typeof window !== 'undefined' ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition : null;

    if (!hasMediaDevices || !hasGetUserMedia) {
      setIsRequestingPermission(false);
      setMicErrorType('unsupported');
      setScreen('voice');
      return;
    }

    try {
      let stream = currentStreamRef.current;
      const hasLiveAudio = stream && stream.getAudioTracks().some((t) => t.readyState === 'live');

      if (!hasLiveAudio) {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        currentStreamRef.current = stream;
      }

      setIsRequestingPermission(false);
      isVoiceActiveRef.current = true;
      setScreen('voice');

      const openingGreeting =
        "Hi! I'm Smart Child AI. You can talk to me about technology, habits, or ask me to make a Smart Balance Plan. Are you a child or a parent?";
      
      voiceSessionHistoryRef.current = [{ sender: 'ai', text: openingGreeting }];
      setLastAiSpokenText(openingGreeting);
      speechQueueRef.current = [openingGreeting];
      playNextSpeechFromQueue();
    } catch (err: any) {
      setIsRequestingPermission(false);

      const isPolicyRestriction =
        err?.name === 'SecurityError' ||
        (err?.name === 'NotAllowedError' &&
          (err?.message?.toLowerCase().includes('iframe') ||
            err?.message?.toLowerCase().includes('policy') ||
            isInIframe));

      if (err?.name === 'NotFoundError' || err?.name === 'DevicesNotFoundError') {
        setMicErrorType('not-found');
      } else if (isPolicyRestriction) {
        setMicErrorType('iframe-restriction');
      } else {
        setMicErrorType('denied');
      }
      setScreen('voice');
    }
  };

  const startListeningTurn = () => {
    if (!isVoiceActiveRef.current) return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setMicErrorType('unsupported');
      return;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    setVoiceState('listening');
    setVoiceTranscript('');

    recognition.onresult = (event: any) => {
      let currentText = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        currentText += event.results[i][0].transcript;
      }
      const trimmed = currentText.trim();
      setVoiceTranscript(trimmed);

      // Barge-in / interruption
      if (isSpeakingQueueRef.current && trimmed.length > 1) {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
        speechQueueRef.current = [];
        isSpeakingQueueRef.current = false;
        setVoiceState('listening');
      }

      if (trimmed.length > 0) {
        clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = setTimeout(() => {
          if (trimmed.length > 1) {
            try {
              recognition.stop();
            } catch {
              // ignore
            }
            processUserVoiceQuery(trimmed);
          }
        }, 700);
      }
    };

    recognition.onerror = (event: any) => {
      if (event.error === 'not-allowed') {
        setMicErrorType('denied');
        setVoiceState('idle');
      }
    };

    recognition.onend = () => {
      if (isVoiceActiveRef.current && voiceState === 'listening' && !voiceTranscript) {
        setTimeout(() => {
          if (isVoiceActiveRef.current && voiceState === 'listening') {
            startListeningTurn();
          }
        }, 250);
      }
    };

    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch {
      // ignore
    }
  };

  const processUserVoiceQuery = async (queryText: string) => {
    if (!queryText.trim()) {
      startListeningTurn();
      return;
    }

    setVoiceState('thinking');
    setLastAiSpokenText('');
    speechQueueRef.current = [];
    isSpeakingQueueRef.current = false;

    voiceSessionHistoryRef.current.push({ sender: 'user', text: queryText });

    const controller = new AbortController();
    activeAbortControllerRef.current = controller;

    const timeoutId = setTimeout(() => {
      controller.abort();
      handleVoiceTimeoutFallback(queryText);
    }, 8000);

    try {
      const response = await fetch('/api/ai-coach/chat-stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: queryText,
          history: voiceSessionHistoryRef.current.slice(-8),
          context: {
            role,
            survey,
            plan,
          },
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok || !response.body) {
        throw new Error(`HTTP ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let accumulatedSentence = '';
      let fullResponseText = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith('data: ')) {
            const dataStr = trimmed.slice(6);
            if (dataStr === '[DONE]') continue;

            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.text) {
                accumulatedSentence += parsed.text;
                fullResponseText += parsed.text;

                const sentenceEndMatch = accumulatedSentence.match(/^(.*?[.?!])\s+(.*)$/s);
                if (sentenceEndMatch) {
                  const completedSentence = sentenceEndMatch[1].trim();
                  accumulatedSentence = sentenceEndMatch[2];
                  queueSpeechSentence(completedSentence);
                }
              }
            } catch {
              // ignore
            }
          }
        }
      }

      if (accumulatedSentence.trim()) {
        queueSpeechSentence(accumulatedSentence.trim(), true);
      }

      if (fullResponseText.trim()) {
        voiceSessionHistoryRef.current.push({ sender: 'ai', text: fullResponseText.trim() });
        setChatMessages((prev) => [
          ...prev,
          { id: Date.now().toString(), sender: 'user', text: queryText, timestamp: 'Voice' },
          { id: (Date.now() + 1).toString(), sender: 'ai', text: fullResponseText.trim(), timestamp: 'Voice' },
        ]);
      } else {
        handleVoiceTimeoutFallback(queryText);
      }
    } catch (err: any) {
      clearTimeout(timeoutId);
      if (err.name !== 'AbortError') {
        handleVoiceTimeoutFallback(queryText);
      }
    }
  };

  const handleVoiceTimeoutFallback = (queryText: string) => {
    const fallback = generateFallbackChatReply(queryText, role);
    voiceSessionHistoryRef.current.push({ sender: 'ai', text: fallback });

    setChatMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), sender: 'user', text: queryText, timestamp: 'Voice' },
      { id: (Date.now() + 1).toString(), sender: 'ai', text: fallback, timestamp: 'Voice' },
    ]);

    queueSpeechSentence(fallback, true);
  };

  const handleToggleListening = () => {
    if (voiceState === 'listening') {
      clearTimeout(silenceTimerRef.current);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
      setVoiceState('idle');
    } else {
      isVoiceActiveRef.current = true;
      startListeningTurn();
    }
  };

  const handleToggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (nextMute && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      speechQueueRef.current = [];
      isSpeakingQueueRef.current = false;
      startListeningTurn();
    }
  };

  const handleEndConversation = () => {
    stopVoiceSession();
    setScreen('voice-ended');
  };

  // Fallback Plan Generator
  const createFallbackPlan = (s: SmartBalanceSurvey, currentRole: UserRole): SmartBalancePlanData => {
    const isParent = currentRole === 'parent';
    const primaryInterest = s.interests[0] || 'Gaming';

    return {
      whyThisPlan: isParent
        ? "Your child's plan doesn't aim to eliminate technology. It redirects some passive screen time toward creation, learning and future skills while protecting time for movement, sleep, food and family."
        : undefined,
      todayStep:
        primaryInterest.includes('Game') || primaryInterest.includes('Gaming')
          ? 'Draw your own 3-level game idea on a sheet of paper.'
          : 'Sketch the home screen idea of your dream app or tool on paper.',
      screenToSkill:
        'Instead of only playing or watching: spend 20 minutes learning how levels, characters, or mechanics are designed.',
      move: 'Spend about 30 minutes outside playing cricket, football, cycling, or going on a walk.',
      eatSmart: 'Choose water and a healthy snack like apples or nuts instead of eating chips while looking at screens.',
      create: 'Turn your favorite hobby into a design project or simple coded animation.',
      futureSkill: 'Beginner computational logic & creative AI literacy.',
      offlineActivity: 'Challenge a friend or family member to a board game or drawing duel.',
      familySocial: 'Screen-free family dinner conversation sharing one favorite part of your day.',
      sleep: 'Put screens away 30 minutes before bed to allow your brain to relax deeply.',
      weeklyChallenge: '⭐ Screen-to-Skill Challenge: Turn 1 hour of passive screen time into a creative project this week.',
      understand: `We understand you want balance without losing the fun of technology.`,
      strength: `You have strong natural curiosity and love exploring interactive ideas.`,
      encouragement: `Small changes each day make a huge difference. You're building skills for your future!`,
    };
  };

  // Fallback Chat Handlers with Pakistani Urdu / Roman Urdu
  const generateFallbackChatReply = (query: string, currentRole: UserRole): string => {
    const q = query.toLowerCase();

    if (q.includes('abuse') || q.includes('kill') || q.includes('hurt myself') || q.includes('suicide') || q.includes('danger')) {
      return 'If you or someone in your family is feeling unsafe, please speak right now to a trusted adult, school counselor, or reach out to local emergency helplines.';
    }

    if (/[\u0600-\u06FF]/.test(query)) {
      if (query.includes('گیم') || query.includes('کھیل')) {
        return 'یہ بہت عام بات ہے۔ گیمز سے بچے اسٹریٹیجی اور فوری فیصلے سیکھتے ہیں۔ کیا ہم ان کی اسی دلچسپی کو گیم بنانے یا کوڈنگ کی طرف موڑ سکتے ہیں؟';
      }
      return 'بہت اچھا سوال ہے۔ سمارٹ چائلڈ کا مقصد موبائل چھیننا نہیں بلکہ بچے کی دلچسپی کو مثبت اور تخلیقی کاموں کی طرف موڑنا ہے۔ آپ کا بچہ کس چیز میں زیادہ وقت گزارتا ہے؟';
    }

    if (q.includes('bohat use') || q.includes('mobile bohat') || q.includes('phone bohat') || q.includes('bohot use')) {
      return 'Samajh sakta hoon. Mobile foran cheen lene ke bajaye pehle ye dekhna behtar hai ke woh mobile par kya karta hai. Agar usay gaming pasand hai to hum us interest ko game design ya coding ki taraf redirect kar sakte hain.';
    }

    if (q.includes('cheen lena') || q.includes('foran cheen') || q.includes('phone cheen')) {
      return 'Nahi, mobile foran cheen lene se aksar bache upset hote hain. Smart Child ka tareeqa hai: Don\'t Just Remove, Redirect! Pehle unka interest samjhein aur ek behtar creative ya outdoor activity offer karein.';
    }

    if (q.includes('app banana') || q.includes('app seekhna') || q.includes('ai se app')) {
      return 'Zabardast! Aap paper par app ka idea draw karne se start kar sakte hain, phir simple tools aur AI ki madad se pehla working prototype bana sakte hain. Kya idea hai aapke zehen mein?';
    }

    if (q.includes('gaming') && (q.includes('ai') || q.includes('coding') || q.includes('seekhay') || q.includes('seekhna'))) {
      return 'Bohat achi soch hai! Gaming interest ko Scratch ya Roblox Studio ke zariye coding aur simple AI logic ki taraf bari asaani se redirect kiya ja sakta hai.';
    }

    if (q.includes('drawing') || q.includes('draw')) {
      return currentRole === 'parent'
        ? 'Drawing is a wonderful creative talent! She can explore digital illustration, character design, and UI wireframing alongside physical sketchbook drawing.'
        : 'Drawing is awesome! You can design cool characters in a sketchbook, or try digital design tools to make digital posters and comic strips!';
    }

    if (q.includes('pubg') || q.includes('free fire')) {
      return currentRole === 'parent'
        ? 'Action games provide quick dopamine and strategy. Try redirecting that focus to game design in Scratch, and agree on a gentle 5-minute checkpoint notice before stopping.'
        : 'If you love fast-paced games, try building your own game obstacle course in Scratch or Roblox Studio, and bring that team strategy outside for cricket or football!';
    }

    if (q.includes('sports') || q.includes('doesn\'t like sports') || q.includes('bahar khelta nahi')) {
      return currentRole === 'parent'
        ? 'Not every child loves competitive sports. Focus on joyful low-pressure movement like bicycle rides, family badminton, or evening walks. Movement should feel like play.'
        : 'You don\'t have to play competitive sports to move! Riding a bike with music, playing badminton, or walking in a park gives you great energy and focus.';
    }

    if (q.includes("don't know coding") || q.includes('dont know coding') || q.includes('not know coding')) {
      return "You don't need to know coding to start! Game design begins with designing stories, rules, and levels on paper, or using visual drag-and-drop blocks in Scratch!";
    }

    if (q.includes("don't want to learn coding") || q.includes('dont want to learn coding')) {
      return "That is completely fine! Technology has many creative paths beyond coding, like digital illustration, video storytelling, animation, music, science, or sports and outdoor adventures. Technology is just a tool to amplify your unique passions!";
    }

    if (q.includes('ai se app kaise') || q.includes('app kaise bana') || q.includes('app kaise banayein')) {
      return 'Bohat simple hai! Pehle paper par sketch karein ke app kya karegi aur screen kaisi dikhegi. Phir beginner tools (jaise MIT App Inventor) aur AI ki madad se simple prototype bana sakte hain!';
    }

    if (q.includes('stop using my phone completely') || q.includes('stop using phone completely')) {
      return 'No, you do not need to stop completely! Technology is a powerful tool. The goal is balance: making sure screen time doesn\'t replace your sleep, sports, and family time.';
    }

    if (q.includes('kya') || q.includes('hai') || q.includes('kaise') || q.includes('bacha') || q.includes('beta') || q.includes('beti')) {
      return 'Sahi baat hai. Smart Child philosophy ka maqsad hai: Understand, Redirect aur Grow. Aapke bachay ko sab se zyada kis cheez ka shoq hai?';
    }

    return currentRole === 'parent'
      ? 'That makes sense. We focus on Understand, Redirect, and Grow. What does your child enjoy doing most?'
      : 'That sounds really interesting! What kind of project would you love to build or try today?';
  };

  const activePlan = plan || createFallbackPlan(survey, role);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-[#FAFAF8]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-700 flex items-center justify-center shrink-0 shadow-2xs">
              <Sparkles className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-950 leading-tight">
                  SMART CHILD AI COACH
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-100 text-teal-900">
                  Smart Balance Plan
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Understand • Balance • Redirect • Create • Move • Grow
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              stopVoiceSession();
              onClose();
            }}
            aria-label="Close AI Coach"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* ======================================================== */}
          {/* SCREEN: VOICE CONVERSATION MODE */}
          {/* ======================================================== */}
          {screen === 'voice' && (
            <div className="py-2 sm:py-4 flex flex-col items-center justify-between min-h-[460px] text-center max-w-xl mx-auto">
              
              <div className="w-full mb-3 p-3 rounded-2xl bg-teal-50/70 border border-teal-200/70 text-left flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <p className="text-[11px] text-teal-950 leading-relaxed font-medium">
                  <strong>Voice Privacy:</strong> Live microphone audio is processed in-session only. Avoid sharing private credentials or addresses.
                </p>
              </div>

              {micErrorType ? (
                <div className="my-auto p-6 sm:p-8 rounded-3xl bg-amber-50/80 border border-amber-200 text-center max-w-md shadow-sm">
                  <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-4">
                    <MicOff className="w-7 h-7" />
                  </div>
                  
                  <h4 className="font-display font-extrabold text-lg text-amber-950 mb-2">
                    {micErrorType === 'not-found'
                      ? 'No microphone found'
                      : micErrorType === 'network-stuck'
                      ? "I'm having trouble responding"
                      : 'Microphone access was denied'}
                  </h4>

                  <p className="text-xs sm:text-sm text-amber-900 mb-4 leading-relaxed font-medium">
                    {micErrorType === 'not-found'
                      ? 'No microphone was detected on this device. You can continue using text chat.'
                      : micErrorType === 'network-stuck'
                      ? "Let's try again or continue using text chat."
                      : '“Microphone access was denied. You can continue using text chat.”'}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={startVoiceConversation}
                      disabled={isRequestingPermission}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isRequestingPermission ? 'animate-spin' : ''}`} />
                      <span>{isRequestingPermission ? 'Requesting...' : 'TRY AGAIN'}</span>
                    </button>

                    <button
                      onClick={() => {
                        stopVoiceSession();
                        handleStartSurvey('child');
                      }}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>CONTINUE WITH TEXT</span>
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="my-2 flex flex-col items-center">
                    <div className="relative flex items-center justify-center">
                      <div
                        className={`absolute w-44 h-44 rounded-full transition-all duration-500 ${
                          voiceState === 'listening'
                            ? 'bg-teal-400/25 animate-ping'
                            : voiceState === 'speaking'
                            ? 'bg-emerald-400/25 scale-110 animate-pulse'
                            : voiceState === 'thinking'
                            ? 'bg-indigo-400/25 animate-spin'
                            : 'bg-slate-200/50'
                        }`}
                      />

                      <div
                        className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 ${
                          voiceState === 'listening'
                            ? 'bg-gradient-to-tr from-teal-500 to-emerald-500 ring-4 ring-teal-200 scale-105'
                            : voiceState === 'speaking'
                            ? 'bg-gradient-to-tr from-emerald-600 to-teal-600 ring-4 ring-emerald-200 scale-105'
                            : voiceState === 'thinking'
                            ? 'bg-gradient-to-tr from-indigo-600 to-teal-600 ring-4 ring-indigo-200'
                            : 'bg-gradient-to-tr from-slate-800 to-slate-900'
                        }`}
                      >
                        <Bot className="w-14 h-14" />
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-1.5 mt-5 h-8">
                      {[40, 75, 55, 90, 60, 80, 45].map((height, i) => (
                        <div
                          key={i}
                          style={{
                            height:
                              voiceState === 'listening' || voiceState === 'speaking'
                                ? `${Math.max(14, (height * (i % 2 === 0 ? 1 : 0.7)))}%`
                                : '15%',
                          }}
                          className={`w-1.5 rounded-full transition-all duration-150 ${
                            voiceState === 'listening'
                              ? 'bg-teal-500 animate-pulse'
                              : voiceState === 'speaking'
                              ? 'bg-emerald-500 animate-pulse'
                              : voiceState === 'thinking'
                              ? 'bg-indigo-400'
                              : 'bg-slate-300'
                          }`}
                        />
                      ))}
                    </div>

                    <div className="mt-2.5 font-display font-extrabold text-sm sm:text-base text-slate-800 flex items-center gap-2">
                      {voiceState === 'listening' && (
                        <span className="flex items-center gap-1.5 text-teal-700 animate-pulse">
                          <Mic className="w-4 h-4" />
                          <span>🎙 Listening... Speak naturally</span>
                        </span>
                      )}
                      {voiceState === 'thinking' && (
                        <span className="flex items-center gap-1.5 text-indigo-700">
                          <Sparkles className="w-4 h-4 animate-spin" />
                          <span>🧠 Thinking...</span>
                        </span>
                      )}
                      {voiceState === 'speaking' && (
                        <span className="flex items-center gap-1.5 text-emerald-700">
                          <Volume2 className="w-4 h-4 animate-bounce" />
                          <span>🔊 Speaking... (Speak to interrupt)</span>
                        </span>
                      )}
                      {voiceState === 'idle' && (
                        <span className="text-slate-500">Tap microphone to talk</span>
                      )}
                    </div>
                  </div>

                  <div className="w-full bg-[#FAFAF8] rounded-2xl p-4 border border-slate-200 text-left my-2 space-y-2.5 max-h-36 overflow-y-auto shadow-2xs">
                    {voiceTranscript && (
                      <div className="text-xs text-slate-700">
                        <span className="font-bold text-slate-900 block mb-0.5">You:</span>
                        <p className="italic bg-white p-2 rounded-xl border border-slate-100">
                          "{voiceTranscript}"
                        </p>
                      </div>
                    )}
                    {lastAiSpokenText && (
                      <div className="text-xs text-teal-950">
                        <span className="font-bold text-teal-800 block mb-0.5">Smart Child AI:</span>
                        <p className="bg-teal-50/80 p-2.5 rounded-xl border border-teal-100 font-medium">
                          {lastAiSpokenText}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="w-full pt-3 border-t border-slate-100 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={handleToggleListening}
                      title={voiceState === 'listening' ? 'Pause Mic' : 'Start Mic'}
                      className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm ${
                        voiceState === 'listening'
                          ? 'bg-rose-600 text-white hover:bg-rose-700 animate-pulse'
                          : 'bg-teal-600 text-white hover:bg-teal-700'
                      }`}
                    >
                      {voiceState === 'listening' ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      <span>{voiceState === 'listening' ? 'Pause Mic' : 'Start Mic'}</span>
                    </button>

                    <button
                      onClick={handleToggleMute}
                      title={isMuted ? 'Unmute AI Voice' : 'Mute AI Voice'}
                      className={`p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        isMuted
                          ? 'bg-amber-100 border-amber-300 text-amber-900'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      <span>{isMuted ? 'Muted' : 'Mute'}</span>
                    </button>

                    <button
                      onClick={() => {
                        stopVoiceSession();
                        handleStartSurvey('child');
                      }}
                      className="p-3 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Smart Balance Plan</span>
                    </button>

                    <button
                      onClick={handleEndConversation}
                      className="p-3 rounded-2xl bg-slate-100 hover:bg-rose-50 hover:text-rose-700 border border-slate-200 text-slate-600 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <PhoneOff className="w-4 h-4" />
                      <span>End Call</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* SCREEN: VOICE CONVERSATION ENDED */}
          {/* ======================================================== */}
          {screen === 'voice-ended' && (
            <div className="py-12 text-center max-w-md mx-auto">
              <div className="w-16 h-16 rounded-3xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto mb-4 border border-teal-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display font-extrabold text-2xl text-slate-950 mb-2">
                “Great talking with you!”
              </h3>
              <p className="text-sm text-slate-600 mb-8 leading-relaxed">
                “Remember — small changes can make a big difference.”
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setScreen('intro');
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <Bot className="w-4 h-4" />
                  <span>Back to AI Coach</span>
                </button>

                <button
                  onClick={startVoiceConversation}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-900 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Start Again</span>
                </button>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SCREEN 1: OPENING INTRO */}
          {/* ======================================================== */}
          {screen === 'intro' && (
            <div className="py-4 sm:py-6 text-center max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-teal-500/20">
                <Bot className="w-9 h-9" />
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                “Hi! I'm Smart Child AI.”
              </h2>

              <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                “Don't just remove screens. Turn screen time into skill time. Let's create your
                personalized plan for technology, sports, creativity, and healthy habits.”
              </p>

              {/* PROMINENT OPTION 1: CREATE SMART BALANCE PLAN (User specified) */}
              <div className="my-6 p-4 rounded-3xl bg-gradient-to-br from-teal-50 via-emerald-50/70 to-teal-50 border-2 border-teal-300 shadow-sm text-left">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-600 animate-pulse" />
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-teal-900">
                    FEATURED TOOL
                  </span>
                </div>
                <h4 className="font-display font-black text-lg text-slate-950 mb-1">
                  PERSONALIZED SMART BALANCE PLAN
                </h4>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  A personalized blueprint balancing screen time, movement, healthy eating, sleep, and future skills.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    onClick={() => handleStartSurvey('child')}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-white hover:bg-teal-600 text-slate-900 hover:text-white border border-teal-200 hover:border-teal-600 font-extrabold text-xs uppercase tracking-wider transition-all shadow-2xs group cursor-pointer"
                  >
                    <span>Create My Plan (Child)</span>
                    <ArrowRight className="w-4 h-4 text-teal-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </button>

                  <button
                    onClick={() => handleStartSurvey('parent')}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900 hover:bg-teal-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-2xs group cursor-pointer"
                  >
                    <span>Create My Child's Plan</span>
                    <ArrowRight className="w-4 h-4 text-teal-300 group-hover:translate-x-1 transition-all" />
                  </button>
                </div>
              </div>

              {/* HANDS-FREE VOICE BUTTON */}
              <div className="mb-6 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <button
                  onClick={startVoiceConversation}
                  disabled={isRequestingPermission}
                  className="w-full flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-sm transition-all active:scale-98 cursor-pointer disabled:opacity-50"
                >
                  <Mic className="w-4 h-4 text-white" />
                  <span>{isRequestingPermission ? 'Connecting Microphone...' : '🎙 Talk to Smart Child AI (Voice)'}</span>
                </button>
                <span className="text-[11px] text-slate-500 mt-2 block">
                  Speaks & listens in English, Urdu, and Roman Urdu
                </span>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Session-Based • No database or login required</span>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SCREEN 2: 7-QUESTION SMART BALANCE SURVEY */}
          {/* ======================================================== */}
          {screen === 'survey' && (
            <div>
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100 text-xs">
                <button
                  onClick={() => {
                    if (surveyStep > 1) setSurveyStep(surveyStep - 1);
                    else setScreen('intro');
                  }}
                  className="flex items-center gap-1 text-slate-500 hover:text-slate-900 font-bold cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <div className="font-semibold text-slate-400">
                  Question {surveyStep} of 7 • {role === 'parent' ? "Parent's Perspective" : "Child / Teen's Perspective"}
                </div>
              </div>

              <div className="space-y-6">
                {/* QUESTION 1: WHO IS THIS PLAN FOR? */}
                {surveyStep === 1 && (
                  <div>
                    <h4 className="font-display text-xl font-extrabold text-slate-950 mb-1">
                      Who is this plan for?
                    </h4>
                    <p className="text-xs text-slate-500 mb-4">
                      Select who you are crafting this personalized balance roadmap for.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => {
                          setSurvey({ ...survey, target: 'me' });
                          setRole('child');
                        }}
                        className={`p-5 rounded-2xl border text-left font-display font-extrabold text-base transition-all cursor-pointer ${
                          survey.target === 'me'
                            ? 'bg-teal-50 border-teal-500 text-teal-950 ring-2 ring-teal-200'
                            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                        }`}
                      >
                        <div className="text-2xl mb-1">🙋</div>
                        <span>Me</span>
                        <span className="text-xs text-slate-500 block font-normal mt-0.5">
                          I am a child or teenager
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          setSurvey({ ...survey, target: 'my-child' });
                          setRole('parent');
                        }}
                        className={`p-5 rounded-2xl border text-left font-display font-extrabold text-base transition-all cursor-pointer ${
                          survey.target === 'my-child'
                            ? 'bg-indigo-50 border-indigo-500 text-indigo-950 ring-2 ring-indigo-200'
                            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                        }`}
                      >
                        <div className="text-2xl mb-1">👨‍👩‍👧</div>
                        <span>My child</span>
                        <span className="text-xs text-slate-500 block font-normal mt-0.5">
                          I am a parent or guardian
                        </span>
                      </button>
                    </div>
                  </div>
                )}

                {/* QUESTION 2: AGE? */}
                {surveyStep === 2 && (
                  <div>
                    <h4 className="font-display text-xl font-extrabold text-slate-950 mb-1">
                      What is the age?
                    </h4>
                    <p className="text-xs text-slate-500 mb-4">
                      Recommendations and language style will adjust to this age stage.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {ageOptions.map((age) => (
                        <button
                          key={age}
                          onClick={() => setSurvey({ ...survey, age })}
                          className={`p-4 rounded-2xl border text-center font-display font-extrabold text-base transition-all cursor-pointer ${
                            survey.age === age
                              ? 'bg-teal-50 border-teal-500 text-teal-950 ring-2 ring-teal-200'
                              : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                          }`}
                        >
                          {age} years old
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* QUESTION 3: WHAT DOES THE CHILD ENJOY? (Multiple selections) */}
                {surveyStep === 3 && (
                  <div>
                    <h4 className="font-display text-xl font-extrabold text-slate-950 mb-1">
                      What do they enjoy doing most?
                    </h4>
                    <p className="text-xs text-slate-500 mb-4">
                      Select all that apply. We turn these into creative skills!
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {interestOptions.map((item) => {
                        const isSelected = survey.interests.includes(item);
                        return (
                          <button
                            key={item}
                            onClick={() =>
                              setSurvey({
                                ...survey,
                                interests: toggleArrayItem(survey.interests, item),
                              })
                            }
                            className={`p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                              isSelected
                                ? 'bg-teal-50 border-teal-500 text-teal-950'
                                : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                            }`}
                          >
                            <span>{item}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-teal-600" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* QUESTION 4: WHAT IS THE BIGGEST CONCERN? */}
                {surveyStep === 4 && (
                  <div>
                    <h4 className="font-display text-xl font-extrabold text-slate-950 mb-1">
                      What is the biggest concern?
                    </h4>
                    <p className="text-xs text-slate-500 mb-4">
                      What area would you like to improve first?
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {concernOptions.map((item) => (
                        <button
                          key={item}
                          onClick={() => setSurvey({ ...survey, concern: item })}
                          className={`p-3.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                            survey.concern === item
                              ? 'bg-teal-50 border-teal-500 text-teal-950 ring-2 ring-teal-200'
                              : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* QUESTION 5: WHAT TECHNOLOGY IS AVAILABLE? */}
                {surveyStep === 5 && (
                  <div>
                    <h4 className="font-display text-xl font-extrabold text-slate-950 mb-1">
                      What technology is available?
                    </h4>
                    <p className="text-xs text-slate-500 mb-4">
                      We ensure all recommendations fit your current devices (including offline/paper options).
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {deviceOptions.map((item) => (
                        <button
                          key={item}
                          onClick={() => setSurvey({ ...survey, device: item })}
                          className={`p-3.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                            survey.device === item
                              ? 'bg-teal-50 border-teal-500 text-teal-950 ring-2 ring-teal-200'
                              : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* QUESTION 6: HOW MUCH FREE TIME IS NORMALLY AVAILABLE? */}
                {surveyStep === 6 && (
                  <div>
                    <h4 className="font-display text-xl font-extrabold text-slate-950 mb-1">
                      How much free time is normally available?
                    </h4>
                    <p className="text-xs text-slate-500 mb-4">
                      Helps calibrate bite-sized, realistic habits.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {freeTimeOptions.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSurvey({ ...survey, freeTime: time })}
                          className={`p-4 rounded-2xl border text-center font-display font-extrabold text-base transition-all cursor-pointer ${
                            survey.freeTime === time
                              ? 'bg-teal-50 border-teal-500 text-teal-950 ring-2 ring-teal-200'
                              : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* QUESTION 7: WHAT WOULD THEY LIKE TO LEARN? */}
                {surveyStep === 7 && (
                  <div>
                    <h4 className="font-display text-xl font-extrabold text-slate-950 mb-1">
                      What would they like to learn or build?
                    </h4>
                    <p className="text-xs text-slate-500 mb-4">
                      Select the primary creator skill to unlock.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {learnGoalOptions.map((item) => (
                        <button
                          key={item}
                          onClick={() => setSurvey({ ...survey, learnGoal: item })}
                          className={`p-3.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                            survey.learnGoal === item
                              ? 'bg-teal-50 border-teal-500 text-teal-950 ring-2 ring-teal-200'
                              : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Survey Navigation Footer */}
              <div className="pt-6 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => {
                    if (surveyStep < 7) setSurveyStep(surveyStep + 1);
                    else handleGeneratePlan();
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
                >
                  <span>{surveyStep === 7 ? 'Generate My Smart Balance Plan' : 'Continue'}</span>
                  <ArrowRight className="w-4 h-4 text-teal-300" />
                </button>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SCREEN 3: GENERATING PLAN ANIMATION */}
          {/* ======================================================== */}
          {screen === 'generating' && (
            <div className="py-16 text-center max-w-sm mx-auto">
              <div className="relative w-16 h-16 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full bg-teal-400 animate-ping opacity-25" />
                <div className="relative w-16 h-16 rounded-full bg-teal-500 text-white flex items-center justify-center shadow-lg shadow-teal-500/30">
                  <Sparkles className="w-8 h-8 animate-spin" />
                </div>
              </div>
              <h3 className="font-display font-extrabold text-xl text-slate-950 mb-2">
                Crafting Your Smart Balance Plan...
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Gemini is aligning screen time, movement, healthy nutrition, and future creator skills into your personalized roadmap.
              </p>
            </div>
          )}

          {/* ======================================================== */}
          {/* SCREEN 4: SMART BALANCE PLAN RESULT (Interactive Card) */}
          {/* ======================================================== */}
          {screen === 'plan' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Header Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#FAFAF8] border border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                    Mode:
                  </span>
                  <div className="inline-flex rounded-xl bg-white border border-slate-200 p-0.5">
                    <button
                      onClick={() => setRole('child')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        role === 'child'
                          ? 'bg-slate-900 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      CHILD VIEW
                    </button>
                    <button
                      onClick={() => setRole('parent')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        role === 'parent'
                          ? 'bg-teal-700 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      PARENT VIEW
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={startVoiceConversation}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-xs border border-teal-200 cursor-pointer"
                  >
                    <Mic className="w-3.5 h-3.5 text-teal-600" />
                    <span>Talk About Plan</span>
                  </button>

                  <button
                    onClick={() => {
                      setSurveyStep(1);
                      setScreen('survey');
                    }}
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-900 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Redo Plan</span>
                  </button>
                </div>
              </div>

              {/* Title & Philosophy Banner */}
              <div className="text-center max-w-lg mx-auto">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-[11px] font-black uppercase tracking-widest mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-teal-700" />
                  <span>SMART BALANCE PLAN</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                  “DON'T JUST REMOVE. REDIRECT.”
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Age {survey.age} • Interest: {survey.interests.join(', ')} • Device: {survey.device}
                </p>
              </div>

              {/* PARENT VERSION: "WHY THIS PLAN" EXPLANATION */}
              {role === 'parent' && (
                <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-left shadow-2xs">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Heart className="w-4 h-4 text-indigo-700" />
                    <h4 className="font-display font-black text-xs uppercase tracking-wider text-indigo-950">
                      WHY THIS PLAN (FOR PARENTS)
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-indigo-950 leading-relaxed font-medium">
                    {activePlan.whyThisPlan ||
                      "Your child's plan doesn't aim to eliminate technology. It redirects some passive screen time toward creation, learning and future skills while protecting time for movement, sleep, food and family."}
                  </p>
                </div>
              )}

              {/* ENCOURAGING PROGRESS FEEDBACK TOAST */}
              {encouragingToast && (
                <div className="p-3 rounded-xl bg-teal-700 text-white font-bold text-xs text-center animate-in fade-in duration-200 flex items-center justify-center gap-2 shadow-sm">
                  <Smile className="w-4 h-4 text-teal-200" />
                  <span>{encouragingToast}</span>
                </div>
              )}

              {/* 1. TODAY'S SMALL STEP (HERO CARD) */}
              <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-400/20 to-teal-500/10 border-2 border-amber-300 shadow-sm text-left">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-black flex items-center justify-center">
                      ⭐
                    </span>
                    <span className="font-display font-black text-xs uppercase tracking-widest text-amber-950">
                      YOUR ONE SMALL STEP TODAY
                    </span>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900">
                    Bite-Sized Action
                  </span>
                </div>
                <h4 className="font-display font-black text-base sm:text-lg text-slate-950 mb-3">
                  “{activePlan.todayStep}”
                </h4>
                <div className="flex items-center gap-2 pt-2 border-t border-amber-200/60">
                  <button
                    onClick={() => handleMarkProgress('todayStep', 'done')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                      itemProgress['todayStep'] === 'done'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white border border-amber-300 text-amber-950 hover:bg-amber-100'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{itemProgress['todayStep'] === 'done' ? 'Completed Today!' : 'Mark as Done'}</span>
                  </button>

                  <button
                    onClick={() => handleMarkProgress('todayStep', 'later')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      itemProgress['todayStep'] === 'later'
                        ? 'bg-slate-200 text-slate-700'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <span>Try Later</span>
                  </button>
                </div>
              </div>

              {/* CORE CATEGORY CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left">
                
                {/* 2. SCREEN -> SKILL */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <div className="flex items-center gap-2 mb-2">
                    <Gamepad2 className="w-4 h-4 text-teal-600" />
                    <h5 className="font-display font-black text-xs uppercase tracking-wider text-slate-900">
                      2. SCREEN → SKILL
                    </h5>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium mb-3">
                    {activePlan.screenToSkill}
                  </p>
                  <button
                    onClick={() => handleMarkProgress('screenToSkill', 'done')}
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer inline-flex items-center gap-1 ${
                      itemProgress['screenToSkill'] === 'done'
                        ? 'bg-teal-600 text-white border-teal-600'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Check className="w-3 h-3" />
                    <span>{itemProgress['screenToSkill'] === 'done' ? 'Done' : 'Mark Done'}</span>
                  </button>
                </div>

                {/* 3. MOVE */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-4 h-4 text-emerald-600" />
                    <h5 className="font-display font-black text-xs uppercase tracking-wider text-slate-900">
                      3. MOVE (FLEXIBLE PLAY)
                    </h5>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium mb-3">
                    {activePlan.move}
                  </p>
                  <button
                    onClick={() => handleMarkProgress('move', 'done')}
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer inline-flex items-center gap-1 ${
                      itemProgress['move'] === 'done'
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Check className="w-3 h-3" />
                    <span>{itemProgress['move'] === 'done' ? 'Done' : 'Mark Done'}</span>
                  </button>
                </div>

                {/* 4. EAT SMART */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <div className="flex items-center gap-2 mb-2">
                    <Apple className="w-4 h-4 text-amber-600" />
                    <h5 className="font-display font-black text-xs uppercase tracking-wider text-slate-900">
                      4. EAT SMART
                    </h5>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium mb-3">
                    {activePlan.eatSmart}
                  </p>
                  <button
                    onClick={() => handleMarkProgress('eatSmart', 'done')}
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer inline-flex items-center gap-1 ${
                      itemProgress['eatSmart'] === 'done'
                        ? 'bg-amber-600 text-white border-amber-600'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Check className="w-3 h-3" />
                    <span>{itemProgress['eatSmart'] === 'done' ? 'Done' : 'Mark Done'}</span>
                  </button>
                </div>

                {/* 5. CREATE */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <div className="flex items-center gap-2 mb-2">
                    <Compass className="w-4 h-4 text-indigo-600" />
                    <h5 className="font-display font-black text-xs uppercase tracking-wider text-slate-900">
                      5. CREATE
                    </h5>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium mb-3">
                    {activePlan.create}
                  </p>
                  <button
                    onClick={() => handleMarkProgress('create', 'done')}
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer inline-flex items-center gap-1 ${
                      itemProgress['create'] === 'done'
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Check className="w-3 h-3" />
                    <span>{itemProgress['create'] === 'done' ? 'Done' : 'Mark Done'}</span>
                  </button>
                </div>

                {/* 6. AI / FUTURE SKILL */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <div className="flex items-center gap-2 mb-2">
                    <Cpu className="w-4 h-4 text-purple-600" />
                    <h5 className="font-display font-black text-xs uppercase tracking-wider text-slate-900">
                      6. AI & FUTURE SKILL
                    </h5>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium mb-3">
                    {activePlan.futureSkill}
                  </p>
                  <button
                    onClick={() => handleMarkProgress('futureSkill', 'done')}
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer inline-flex items-center gap-1 ${
                      itemProgress['futureSkill'] === 'done'
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Check className="w-3 h-3" />
                    <span>{itemProgress['futureSkill'] === 'done' ? 'Done' : 'Mark Done'}</span>
                  </button>
                </div>

                {/* 7. OFFLINE ACTIVITY */}
                {activePlan.offlineActivity && (
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-emerald-600" />
                      <h5 className="font-display font-black text-xs uppercase tracking-wider text-slate-900">
                        7. OFFLINE ACTIVITY
                      </h5>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium mb-3">
                      {activePlan.offlineActivity}
                    </p>
                    <button
                      onClick={() => handleMarkProgress('offlineActivity', 'done')}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer inline-flex items-center gap-1 ${
                        itemProgress['offlineActivity'] === 'done'
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Check className="w-3 h-3" />
                      <span>{itemProgress['offlineActivity'] === 'done' ? 'Done' : 'Mark Done'}</span>
                    </button>
                  </div>
                )}

                {/* 8. FAMILY / SOCIAL TIME */}
                {activePlan.familySocial && (
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-rose-600" />
                      <h5 className="font-display font-black text-xs uppercase tracking-wider text-slate-900">
                        8. FAMILY & SOCIAL
                      </h5>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium mb-3">
                      {activePlan.familySocial}
                    </p>
                    <button
                      onClick={() => handleMarkProgress('familySocial', 'done')}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer inline-flex items-center gap-1 ${
                        itemProgress['familySocial'] === 'done'
                          ? 'bg-rose-600 text-white border-rose-600'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Check className="w-3 h-3" />
                      <span>{itemProgress['familySocial'] === 'done' ? 'Done' : 'Mark Done'}</span>
                    </button>
                  </div>
                )}

                {/* 9. SLEEP REMINDER */}
                {activePlan.sleep && (
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                    <div className="flex items-center gap-2 mb-2">
                      <Moon className="w-4 h-4 text-indigo-600" />
                      <h5 className="font-display font-black text-xs uppercase tracking-wider text-slate-900">
                        9. SLEEP REMINDER
                      </h5>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium mb-3">
                      {activePlan.sleep}
                    </p>
                    <button
                      onClick={() => handleMarkProgress('sleep', 'done')}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer inline-flex items-center gap-1 ${
                        itemProgress['sleep'] === 'done'
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Check className="w-3 h-3" />
                      <span>{itemProgress['sleep'] === 'done' ? 'Done' : 'Mark Done'}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* 10. ONE WEEKLY CHALLENGE */}
              <div className="p-5 rounded-3xl bg-slate-900 text-white text-left shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-400" />
                    <span className="font-display font-black text-xs uppercase tracking-widest text-amber-400">
                      WEEKLY CHALLENGE
                    </span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                    Fun Achievement
                  </span>
                </div>
                <h4 className="font-display font-black text-sm sm:text-base text-white mb-2">
                  {activePlan.weeklyChallenge}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Focus on making one enjoyable shift this week. No streak pressure, no guilt!
                </p>
              </div>

              {/* CHAT WITH SMART CHILD AI ABOUT THIS PLAN */}
              <div className="pt-6 border-t border-slate-100 text-left">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-teal-600" />
                    <h4 className="font-display text-sm font-extrabold text-slate-950">
                      ASK SMART CHILD AI (English, Urdu & Roman Urdu)
                    </h4>
                  </div>

                  <button
                    onClick={startVoiceConversation}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200"
                  >
                    <Mic className="w-3.5 h-3.5 text-teal-600" />
                    <span>Talk with Voice</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {starterQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(q)}
                      className="text-[11px] px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors cursor-pointer text-left"
                    >
                      “{q}”
                    </button>
                  ))}
                </div>

                <div className="space-y-3 max-h-56 overflow-y-auto p-3.5 rounded-2xl bg-[#FAFAF8] border border-slate-200 mb-3 text-xs sm:text-sm">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-slate-900 text-white rounded-br-xs'
                            : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs shadow-2xs'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-slate-400 mt-0.5 px-1">{msg.timestamp}</span>
                    </div>
                  ))}

                  {isAiThinking && (
                    <div className="flex items-center gap-2 text-xs text-slate-500 italic p-2">
                      <Sparkles className="w-3.5 h-3.5 text-teal-600 animate-spin" />
                      <span>Thinking...</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSendMessage();
                    }}
                    placeholder="Ask anything about your plan in English, Urdu or Roman Urdu..."
                    className="flex-1 p-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    aria-label="Send message"
                    disabled={isAiThinking}
                    className="p-3 rounded-xl bg-slate-900 hover:bg-teal-700 text-white transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Privacy & Safety Footer */}
        <div className="p-3.5 sm:p-4 border-t border-slate-100 bg-[#FAFAF8] text-center text-[11px] text-slate-500">
          <div className="flex items-center justify-center gap-1.5 font-bold text-slate-700 mb-0.5">
            <Lock className="w-3 h-3 text-slate-400" />
            <span>Educational Guidance Only</span>
          </div>
          <p>
            The Smart Balance Plan offers lifestyle and educational suggestions. It is not medical treatment.
          </p>
        </div>
      </div>
    </div>
  );
};

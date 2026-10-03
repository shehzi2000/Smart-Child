import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Subtitles,
  Sparkles,
  ArrowRight,
  Activity,
  Palette,
  Bot,
  Compass,
  Upload,
  Info,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import POSTER_IMAGE from '../assets/images/smart_child_video_poster_1791036751308.jpg';

interface VideoSectionProps {
  onExploreClick?: () => void;
}

export const VideoSection: React.FC<VideoSectionProps> = ({ onExploreClick }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(10); // default 10 seconds matching intro video
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCaptions, setShowCaptions] = useState(true);
  const [captionsLang, setCaptionsLang] = useState<'en' | 'ur'>('en');
  const [activeCaption, setActiveCaption] = useState<string>('');
  const [videoSrc, setVideoSrc] = useState<string>('/videos/smart_child_intro.mp4');
  const [hasCustomVideo, setHasCustomVideo] = useState(false);
  const [videoLoadError, setVideoLoadError] = useState(false);
  const [showConnectNotice, setShowConnectNotice] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const controlsTimeoutRef = useRef<any>(null);

  // Captions script for fallback/simulation mode
  const captionCues = [
    { start: 0, end: 2.5, en: 'When screen time starts replacing childhood...', ur: 'جب اسکرین ٹائم حقیقی زندگی کی جگہ لینے لگے...' },
    { start: 2.5, end: 4.8, en: "Don't just take the phone away. Redirect it.", ur: 'موبائل چھیننے کے بجائے، اسے درست سمت میں موڑیں۔' },
    { start: 4.8, end: 6.8, en: 'Turn passive gaming into coding and digital creativity.', ur: 'گیمنگ کو کوڈنگ اور ڈیجیٹل تخلیق میں تبدیل کریں۔' },
    { start: 6.8, end: 8.5, en: 'Make plenty of time to play outside, move, and connect with family.', ur: 'باہر کھیلنے، دوڑنے اور خاندان کے ساتھ وقت گزارنے کے لیے جگہ بنائیں۔' },
    { start: 8.5, end: 10.5, en: 'Smart Child — Smart Future: Use technology with purpose.', ur: 'سمارٹ چائلڈ — سمارٹ فیوچر: ٹیکنالوجی کو مقصد کے ساتھ استعمال کریں۔' },
  ];

  // Auto-hide controls when playing and inactive
  const handleMouseMove = () => {
    setControlsVisible(true);
    clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setControlsVisible(false);
      }, 3000);
    }
  };

  // Video element events
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const cur = videoRef.current.currentTime;
      setCurrentTime(cur);

      // Find current caption
      const cue = captionCues.find((c) => cur >= c.start && cur <= c.end);
      if (cue) {
        setActiveCaption(captionsLang === 'ur' ? cue.ur : cue.en);
      } else {
        setActiveCaption('');
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 10);
      setVideoLoadError(false);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;

    // Pause any AI voice synthesis if currently active so audio never clashes
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setVideoLoadError(false);
        })
        .catch((err) => {
          console.warn('Video play error, attempting fallback or muted play:', err);
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current
              .play()
              .then(() => {
                setIsPlaying(true);
                setVideoLoadError(false);
              })
              .catch(() => {
                startCanvasPresentation();
              });
          } else {
            startCanvasPresentation();
          }
        });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Interactive animated visual simulation when mp4 file is not yet dropped into public/videos/
  const startCanvasPresentation = () => {
    setIsPlaying(true);
    let startTs: number | null = null;
    const totalSimDuration = 10;

    const step = (timestamp: number) => {
      if (!startTs) startTs = timestamp;
      const elapsed = (timestamp - startTs) / 1000;
      setCurrentTime(elapsed);

      // Update caption
      const cue = captionCues.find((c) => elapsed >= c.start && elapsed <= c.end);
      if (cue) {
        setActiveCaption(captionsLang === 'ur' ? cue.ur : cue.en);
      } else {
        setActiveCaption('');
      }

      // Draw onto canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#0F172A';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Subtle dynamic waves & particles
          ctx.fillStyle = 'rgba(13, 148, 136, 0.2)';
          ctx.beginPath();
          ctx.arc(
            canvas.width / 2 + Math.sin(elapsed * 2) * 50,
            canvas.height / 2 + Math.cos(elapsed * 2) * 30,
            120 + Math.sin(elapsed * 3) * 20,
            0,
            Math.PI * 2
          );
          ctx.fill();

          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 24px Outfit, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(
            elapsed < 2.5
              ? '📱 Staring at screen late in the evening...'
              : elapsed < 5
              ? '👨‍👩‍👧 Father & Mother: "Don\'t Just Remove. Redirect."'
              : elapsed < 7
              ? '🎨 Turning screen time into coding & digital art'
              : elapsed < 8.8
              ? '⚽ Playing outdoor sports in the sunlit park'
              : '🌟 Smart Child: Technology with Purpose',
            canvas.width / 2,
            canvas.height / 2 - 20
          );
        }
      }

      if (elapsed < totalSimDuration && isPlaying) {
        requestAnimationFrame(step);
      } else {
        setIsPlaying(false);
        setCurrentTime(0);
        setActiveCaption('');
      }
    };

    requestAnimationFrame(step);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Local file upload support so user can play their video file immediately
  const handleLocalVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setHasCustomVideo(true);
      setVideoLoadError(false);
      setShowConnectNotice(false);
      if (videoRef.current) {
        videoRef.current.src = url;
        videoRef.current.load();
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section id="why-smart-child" className="py-20 sm:py-28 bg-[#FAFAF8] text-slate-900 border-b border-slate-200/80 relative overflow-hidden">
      {/* Background Soft Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-amber-400/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* ======================================================== */}
        {/* 1. SECTION HEADER */}
        {/* ======================================================== */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-800 text-xs sm:text-sm font-extrabold uppercase tracking-widest shadow-2xs">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>INTRODUCING SMART CHILD</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            “WHY SMART CHILD?”
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed font-normal">
            “Technology should help children learn, create and grow — not replace real life.”
          </p>
        </div>

        {/* ======================================================== */}
        {/* 2. 60/40 DESKTOP LAYOUT (FULL WIDTH ON MOBILE) */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT: 60% Modern Responsive Video Player */}
          <div className="lg:col-span-7">
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              className="relative w-full aspect-16/9 bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-200/80 group select-none"
            >
              {/* Actual Video Element */}
              <video
                ref={videoRef}
                src={videoSrc}
                poster={POSTER_IMAGE}
                preload="metadata"
                playsInline
                muted={isMuted}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onClick={togglePlay}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => {
                  setIsPlaying(false);
                  setCurrentTime(0);
                  setActiveCaption('');
                }}
                onError={() => {
                  console.warn('Video failed to load from /videos/smart_child_intro.mp4');
                  setVideoLoadError(true);
                }}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  videoLoadError ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <track
                  kind="captions"
                  src="/videos/smart_child_intro_en.vtt"
                  srcLang="en"
                  label="English"
                  default={captionsLang === 'en'}
                />
                <track
                  kind="captions"
                  src="/videos/smart_child_intro_ur.vtt"
                  srcLang="ur"
                  label="Urdu"
                  default={captionsLang === 'ur'}
                />
              </video>

              {/* Simulation Canvas if MP4 is not yet loaded into public/videos */}
              {videoLoadError && (
                <div className="absolute inset-0">
                  <img
                    src={POSTER_IMAGE}
                    alt="Smart Child video poster"
                    className={`w-full h-full object-cover ${isPlaying ? 'opacity-20' : 'opacity-100'}`}
                  />
                  <canvas
                    ref={canvasRef}
                    width={640}
                    height={360}
                    className={`absolute inset-0 w-full h-full object-cover ${isPlaying ? 'block' : 'hidden'}`}
                  />
                </div>
              )}

              {/* Big Centered Play Button (Visible when paused) */}
              {!isPlaying && (
                <div className="absolute inset-0 bg-slate-950/35 backdrop-blur-[2px] flex items-center justify-center transition-all duration-300 group-hover:bg-slate-950/20">
                  <button
                    onClick={togglePlay}
                    aria-label="Play Smart Child introduction video"
                    title="Play Smart Child — Smart Future Introduction"
                    className="w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-teal-500 hover:bg-teal-400 text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-108 active:scale-95 cursor-pointer ring-8 ring-white/30"
                  >
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current translate-x-1" />
                  </button>
                </div>
              )}

              {/* Live Caption Overlay */}
              {showCaptions && activeCaption && (
                <div className="absolute bottom-16 inset-x-4 sm:inset-x-8 text-center pointer-events-none z-20">
                  <span className="inline-block px-4 py-1.5 rounded-xl bg-slate-950/85 text-white text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md shadow-lg border border-white/10 animate-in fade-in duration-150">
                    {activeCaption}
                  </span>
                </div>
              )}

              {/* Custom Modern Video Controls Bar */}
              <div
                className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent p-3 sm:p-4 transition-opacity duration-300 flex flex-col gap-2 z-30 ${
                  controlsVisible || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                {/* Progress Scrubber */}
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={0}
                    max={duration || 10}
                    step={0.1}
                    value={currentTime}
                    onChange={handleSeek}
                    aria-label="Video scrubber progress"
                    className="w-full h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-teal-400"
                  />
                </div>

                <div className="flex items-center justify-between text-white text-xs">
                  {/* Left Controls: Play/Pause, Time, Volume */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      onClick={togglePlay}
                      aria-label={isPlaying ? 'Pause video' : 'Play video'}
                      className="p-1.5 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>

                    <button
                      onClick={toggleMute}
                      aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                      className="p-1.5 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
                    >
                      {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>

                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      aria-label="Volume slider"
                      className="w-14 sm:w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-teal-400 hidden sm:block"
                    />

                    <span className="font-mono text-[11px] text-slate-300 ml-1">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  {/* Right Controls: CC Language Toggle & Fullscreen */}
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {/* Caption Toggle */}
                    <button
                      onClick={() => setShowCaptions(!showCaptions)}
                      aria-label="Toggle subtitles"
                      title={showCaptions ? 'Captions On' : 'Captions Off'}
                      className={`px-2 py-1 rounded-lg text-[10px] font-extrabold uppercase transition-colors cursor-pointer flex items-center gap-1 ${
                        showCaptions ? 'bg-teal-500 text-white' : 'bg-white/20 text-slate-300 hover:text-white'
                      }`}
                    >
                      <Subtitles className="w-3.5 h-3.5" />
                      <span>CC</span>
                    </button>

                    {/* Language Switcher for CC */}
                    {showCaptions && (
                      <button
                        onClick={() => setCaptionsLang(captionsLang === 'en' ? 'ur' : 'en')}
                        title="Switch caption language (English / Urdu)"
                        className="px-2 py-1 rounded-lg text-[10px] font-bold bg-white/10 hover:bg-white/20 text-slate-200 transition-colors cursor-pointer"
                      >
                        {captionsLang === 'en' ? 'ENG' : 'اردو'}
                      </button>
                    )}

                    {/* Fullscreen */}
                    <button
                      onClick={toggleFullscreen}
                      aria-label="Toggle fullscreen"
                      className="p-1.5 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
                    >
                      {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Video File Connection Helper (User explicitly instructed: clearly identify where video connects) */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                <span>
                  Source: <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded font-mono text-[11px]">public/videos/smart_child_intro.mp4</code>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/mp4,video/webm,video/mov"
                  onChange={handleLocalVideoUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-700 hover:text-teal-900 transition-colors cursor-pointer"
                >
                  <Upload className="w-3 h-3" />
                  <span>{hasCustomVideo ? 'Change Video File' : 'Select Local Video File'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: 40% Supporting Content */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="space-y-3">
              <span className="text-xs font-black uppercase tracking-widest text-teal-700">
                THE CORE PRINCIPLE
              </span>
              <h3 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-slate-950 tracking-tight leading-tight">
                “DON'T JUST REMOVE. REDIRECT.”
              </h3>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-start gap-2.5">
                <div className="w-2 h-2 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                <p className="text-sm font-semibold text-slate-800 leading-snug">
                  Gaming can become <span className="text-teal-700 font-bold">game design</span>.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                <p className="text-sm font-semibold text-slate-800 leading-snug">
                  Drawing can become <span className="text-purple-700 font-bold">digital design</span>.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                <p className="text-sm font-semibold text-slate-800 leading-snug">
                  AI can become a tool for <span className="text-indigo-700 font-bold">learning and creation</span>.
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              When children learn that phones and laptops are tools to invent, solve, and build rather than just passive entertainment feeds, their entire relationship with screen time transforms.
            </p>

            <div>
              <button
                onClick={onExploreClick}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-teal-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer active:scale-95"
              >
                <span>EXPLORE SMART CHILD</span>
                <ArrowRight className="w-4 h-4 text-teal-300" />
              </button>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. THREE CARDS BELOW THE VIDEO */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left pt-6">
          {/* Card 1: MOVE */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all duration-200 space-y-2 group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xl mb-3 shadow-2xs group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              🏃
            </div>
            <h4 className="font-display font-black text-lg text-slate-950 uppercase tracking-tight">
              MOVE
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              “Make time for physical activity and outdoor play.”
            </p>
          </div>

          {/* Card 2: CREATE */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all duration-200 space-y-2 group">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-xl mb-3 shadow-2xs group-hover:bg-purple-600 group-hover:text-white transition-colors">
              🎨
            </div>
            <h4 className="font-display font-black text-lg text-slate-950 uppercase tracking-tight">
              CREATE
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              “Turn screen time into opportunities to build and create.”
            </p>
          </div>

          {/* Card 3: LEARN */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all duration-200 space-y-2 group">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xl mb-3 shadow-2xs group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              🤖
            </div>
            <h4 className="font-display font-black text-lg text-slate-950 uppercase tracking-tight">
              LEARN
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              “Use AI and technology as tools for learning and problem solving.”
            </p>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. FINAL MESSAGE */}
        {/* ======================================================== */}
        <div className="pt-8 border-t border-slate-200/80 text-center max-w-3xl mx-auto space-y-3">
          <h3 className="font-display text-lg sm:text-2xl font-black text-slate-950 tracking-tight leading-snug">
            “THE FUTURE IS NOT ABOUT USING MORE TECHNOLOGY.
            <br />
            IT'S ABOUT USING TECHNOLOGY BETTER.”
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-black tracking-widest text-teal-800 uppercase pt-2">
            <span>LEARN</span>
            <span className="text-teal-400">•</span>
            <span>CREATE</span>
            <span className="text-teal-400">•</span>
            <span>MOVE</span>
            <span className="text-teal-400">•</span>
            <span>CONNECT</span>
            <span className="text-teal-400">•</span>
            <span>BUILD</span>
          </div>
        </div>

      </div>
    </section>
  );
};

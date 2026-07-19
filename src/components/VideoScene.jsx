import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { backgroundThemes } from '../data/storyData';

const placeholderParticles = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 1,
  duration: Math.random() * 5 + 4,
  delay: Math.random() * 3,
}));

// VideoScene always renders full-screen.
// After video ends, it stays on the last frame (paused) while narration
// overlays on top — cinematic visual novel style.
export default function VideoScene({ scene, onVideoEnd, isActive, delayed = false }) {
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoReady, setVideoReady] = useState(!delayed);
  const videoRef = useRef(null);
  const timerRef = useRef(null);
  const delayRef = useRef(null);

  const theme = backgroundThemes[scene.backgroundTheme] || backgroundThemes['reflection'];

  // Reset state when scene changes
  useEffect(() => {
    setVideoFailed(false);
    setVideoLoaded(false);
    setVideoReady(!delayed);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (delayRef.current) clearTimeout(delayRef.current);
    };
  }, [scene.id, delayed]);

  // Handle delay timing if required (e.g. for chapter intros)
  useEffect(() => {
    if (!delayed) return;
    delayRef.current = setTimeout(() => {
      setVideoReady(true);
    }, 3000);
    return () => {
      if (delayRef.current) clearTimeout(delayRef.current);
    };
  }, [scene.id, delayed]);

  // Control video play/pause status based on videoReady state
  useEffect(() => {
    if (!videoRef.current || videoFailed || !scene.video) return;
    if (videoReady) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [videoReady, videoFailed, scene.video]);

  // Auto-advance for placeholder mode only
  useEffect(() => {
    if ((videoFailed || !scene.video) && isActive) {
      timerRef.current = setTimeout(() => {
        onVideoEnd();
      }, 4000);
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }
  }, [videoFailed, scene.video, isActive, onVideoEnd]);

  const handleVideoError = () => setVideoFailed(true);
  const handleVideoLoaded = () => setVideoLoaded(true);
  const handleVideoEnded = () => onVideoEnd();

  const showPlaceholder = !scene.video || videoFailed;

  return (
    <motion.div
      className="relative w-full h-screen overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Letterbox bars — cinematic framing */}
      <div className="absolute top-0 left-0 right-0 h-[7%] bg-black z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[7%] bg-black z-10 pointer-events-none" />

      {!showPlaceholder && (
        <video
          ref={videoRef}
          src={scene.video ? `${import.meta.env.BASE_URL}${scene.video.startsWith('/') ? scene.video.slice(1) : scene.video}` : ''}
          className="absolute inset-0 w-full h-full object-contain"
          playsInline
          loop={false}
          onError={handleVideoError}
          onLoadedData={handleVideoLoaded}
          onEnded={handleVideoEnded}
        />
      )}

      {/* Cinematic animated placeholder */}
      {showPlaceholder && (
        <div className="absolute inset-0">
          {/* Animated gradient background */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${theme.gradient}`}
            animate={{
              background: [
                `linear-gradient(135deg, rgba(20,20,30,0.9), rgba(10,10,15,1))`,
                `linear-gradient(225deg, rgba(25,20,30,0.9), rgba(10,10,15,1))`,
                `linear-gradient(135deg, rgba(20,20,30,0.9), rgba(10,10,15,1))`,
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Theme gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-60`} />

          {/* Cinematic grain */}
          <div
            className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
            }}
          />

          {/* Floating particles */}
          {placeholderParticles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                background: `rgba(212, 168, 83, 0.2)`,
              }}
              animate={{
                y: [0, -60, 0],
                x: [0, (Math.random() - 0.5) * 40, 0],
                opacity: [0.1, 0.5, 0.1],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-6xl md:text-8xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              {theme.icon}
            </motion.div>
          </div>

          {/* Shimmer sweep */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(212,168,83,0.03) 50%, transparent 100%)',
            }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 5, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
          />

          {/* Ambient text */}
          <div className="absolute bottom-[16%] left-0 right-0 text-center z-20">
            <motion.p
              className="text-white/20 text-xs md:text-sm tracking-[0.2em] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {theme.ambientText}
            </motion.p>
          </div>

          {/* Auto-advance progress bar */}
          {isActive && (
            <div className="absolute bottom-[9%] left-[10%] right-[10%] z-20">
              <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gold-400/40 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 4, ease: 'linear' }}
                />
              </div>
            </div>
          )}

          {/* Click to skip placeholder */}
          {isActive && (
            <button
              onClick={onVideoEnd}
              className="absolute inset-0 z-30 cursor-pointer"
              aria-label="Bỏ qua"
            />
          )}
        </div>
      )}

      {/* Scene title overlay — bottom left, above letterbox */}
      <motion.div
        className="absolute bottom-[10%] left-4 md:left-8 z-20"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div className="glass-dark rounded-lg px-4 py-2">
          <p className="text-gold-400/80 text-xs tracking-wider uppercase mb-0.5">
            {scene.chapterTitle}
          </p>
          <p className="text-white/80 text-sm md:text-base font-medium">
            {scene.title}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

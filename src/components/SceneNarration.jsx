import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

export default function SceneNarration({ narrator, text, sceneTitle, onComplete, onTypingSound }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);
  const intervalRef = useRef(null);
  const indexRef = useRef(0);

  // Reset when text changes
  useEffect(() => {
    setDisplayedText('');
    setIsComplete(false);
    setIsSkipped(false);
    indexRef.current = 0;

    if (!text) return;

    intervalRef.current = setInterval(() => {
      indexRef.current += 1;
      if (indexRef.current <= text.length) {
        setDisplayedText(text.slice(0, indexRef.current));
        // Play typing tick every 2 characters — avoids audio spam at 30ms interval
        if (onTypingSound && indexRef.current % 2 === 0) {
          onTypingSound();
        }
      } else {
        clearInterval(intervalRef.current);
        setIsComplete(true);
      }
    }, 30);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text]);

  const handleSkip = useCallback(() => {
    if (!isComplete) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setDisplayedText(text);
      setIsComplete(true);
      setIsSkipped(true);
    }
  }, [isComplete, text]);

  return (
    <motion.div
      className="glass-dark rounded-2xl p-5 md:p-7 cursor-pointer"
      style={{ background: 'rgba(5, 5, 10, 0.75)' }}
      onClick={handleSkip}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Scene title */}
      {sceneTitle && (
        <motion.h3
          className="text-white/90 text-lg md:text-xl font-medium mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {sceneTitle}
        </motion.h3>
      )}

      {/* Narrator name */}
      {narrator && (
        <motion.div
          className="flex items-center gap-2 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="w-1 h-4 bg-gold-400 rounded-full" />
          <span className="text-gold-400 text-xs tracking-[0.15em] uppercase font-medium">
            {narrator}
          </span>
        </motion.div>
      )}

      {/* Narration text */}
      <div className="font-narration text-lg md:text-xl text-white/80 leading-relaxed min-h-[80px]">
        {displayedText}
        {!isComplete && <span className="typewriter-cursor" />}
      </div>

      {/* Continue button */}
      {isComplete && (
        <motion.div
          className="mt-6 flex justify-end"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onComplete();
            }}
            className="flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors text-sm font-medium tracking-wide"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            Tiếp tục
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </motion.div>
      )}

      {/* Skip hint */}
      {!isComplete && (
        <motion.p
          className="text-white/15 text-xs mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          Nhấn để bỏ qua
        </motion.p>
      )}
    </motion.div>
  );
}

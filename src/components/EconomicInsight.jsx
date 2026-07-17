import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

export default function EconomicInsight({ insight, consequence, onContinue, onOpen }) {
  // Play chime when insight modal opens
  useEffect(() => {
    if (insight && onOpen) {
      onOpen();
    }
  }, [insight]);

  if (!insight) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Modal card */}
        <motion.div
          className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto glass-gold rounded-2xl"
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Gold top accent */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 rounded-t-2xl" />

          <div className="p-6 md:p-8">
            {/* Consequence result */}
            {consequence && (
              <motion.div
                className="mb-6 p-4 rounded-xl bg-gold-400/5 border border-gold-400/15"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-gold-400 text-lg mt-0.5">▸</span>
                  <div>
                    <p className="text-gold-400/60 text-xs uppercase tracking-wider mb-1">
                      Kết quả
                    </p>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {consequence}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Header */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                <span className="text-gold-400/60 text-xs tracking-[0.2em] uppercase">
                  Kiến thức kinh tế
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-narration gradient-text-gold font-bold">
                {insight.title}
              </h2>
              {insight.concept && (
                <p className="text-gold-400/50 text-sm mt-2 font-light italic">
                  {insight.concept}
                </p>
              )}
            </motion.div>

            {/* Decorative separator */}
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="flex-1 h-px bg-gradient-to-r from-gold-400/20 to-transparent" />
              <div className="w-1 h-1 rounded-full bg-gold-400/30" />
              <div className="flex-1 h-px bg-gradient-to-l from-gold-400/20 to-transparent" />
            </motion.div>

            {/* Content */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-white/70 text-sm md:text-base leading-relaxed whitespace-pre-line">
                {insight.content}
              </p>
            </motion.div>

            {/* Key terms */}
            {insight.keyTerms && insight.keyTerms.length > 0 && (
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-gold-400/50 text-xs uppercase tracking-wider mb-3">
                  Thuật ngữ chính
                </p>
                <div className="flex flex-wrap gap-2">
                  {insight.keyTerms.map((term, i) => (
                    <motion.span
                      key={i}
                      className="px-3 py-1.5 rounded-full text-xs text-gold-400/80 border border-gold-400/20 bg-gold-400/5"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + i * 0.05 }}
                    >
                      {term}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Continue button */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                onClick={onContinue}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-gold-600 to-gold-400 text-cinema-black font-semibold text-sm tracking-wide"
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212, 168, 83, 0.3)' }}
                whileTap={{ scale: 0.97 }}
              >
                Tiếp tục câu chuyện ▸
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

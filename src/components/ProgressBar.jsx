import { motion } from 'framer-motion';

export default function ProgressBar({ currentChapter, totalChapters, chapterTitle, scenesInChapter, currentSceneIndex }) {
  const chapters = Array.from({ length: totalChapters }, (_, i) => i + 1);
  const sceneProgress = scenesInChapter > 0 ? ((currentSceneIndex + 1) / scenesInChapter) * 100 : 0;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-40 glass-dark"
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-lg mx-auto px-6 py-3">
        {/* Chapter dots */}
        <div className="flex items-center justify-center gap-0">
          {chapters.map((ch, index) => {
            const isActive = ch === currentChapter;
            const isCompleted = ch < currentChapter;
            const isFuture = ch > currentChapter;

            return (
              <div key={ch} className="flex items-center">
                {/* Connecting line (before dot, except first) */}
                {index > 0 && (
                  <div className="w-12 md:w-20 h-px relative">
                    <div className="absolute inset-0 bg-white/10" />
                    {(isCompleted || isActive) && (
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-gold-400/50"
                        initial={{ width: '0%' }}
                        animate={{ width: isCompleted ? '100%' : `${sceneProgress}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                      />
                    )}
                  </div>
                )}

                {/* Chapter dot */}
                <div className="relative flex flex-col items-center">
                  <motion.div
                    className={`w-3 h-3 rounded-full border-2 transition-all duration-500 ${
                      isActive
                        ? 'bg-gold-400 border-gold-400 shadow-[0_0_12px_rgba(212,168,83,0.4)]'
                        : isCompleted
                        ? 'bg-gold-400/60 border-gold-400/60'
                        : 'bg-transparent border-white/20'
                    }`}
                    animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                    transition={isActive ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
                  />

                  {/* Chapter label */}
                  <span
                    className={`absolute top-5 text-[10px] tracking-wider whitespace-nowrap ${
                      isActive ? 'text-gold-400/80' : 'text-white/20'
                    }`}
                  >
                    {ch}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chapter title (below dots) */}
        <motion.p
          key={chapterTitle}
          className="text-center text-gold-400/40 text-[10px] tracking-[0.15em] uppercase mt-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {chapterTitle}
        </motion.p>
      </div>
    </motion.div>
  );
}

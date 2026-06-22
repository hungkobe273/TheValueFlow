import { motion, AnimatePresence } from 'framer-motion';

export default function DecisionJournal({ decisions, isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm glass-dark border-l border-white/5 overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-lg font-narration gradient-text-gold font-bold">
                    Hành Trình Kinh Tế
                  </h3>
                  <p className="text-white/30 text-xs mt-1 tracking-wide">
                    Của Bạn
                  </p>
                </div>
                <motion.button
                  onClick={onClose}
                  className="text-white/30 hover:text-white/60 transition-colors p-1"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              {/* Decorative line */}
              <div className="h-px bg-gradient-to-r from-gold-400/30 to-transparent mb-6" />

              {/* Decisions list */}
              {decisions.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-white/20 text-sm">Chưa có quyết định nào</p>
                  <p className="text-white/10 text-xs mt-2">
                    Hãy tiếp tục câu chuyện...
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {decisions.map((decision, index) => (
                    <motion.div
                      key={index}
                      className="relative pl-6"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-gold-400/20 border border-gold-400/40 flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-gold-400" />
                      </div>

                      {/* Timeline line */}
                      {index < decisions.length - 1 && (
                        <div className="absolute left-[5px] top-4 bottom-0 w-px bg-gold-400/10 -mb-4" style={{ height: 'calc(100% + 16px)' }} />
                      )}

                      {/* Content */}
                      <div>
                        <p className="text-gold-400/50 text-[10px] uppercase tracking-wider mb-1">
                          {decision.chapterTitle}
                        </p>
                        <div className="flex items-start gap-2">
                          <span className="text-gold-400 text-sm">✓</span>
                          <p className="text-white/70 text-sm leading-relaxed">
                            {decision.entry}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function ChoiceButton({ choice, onClick, index }) {
  return (
    <motion.button
      variants={itemVariants}
      onClick={onClick}
      className="group relative w-full text-left glass rounded-xl p-5 md:p-6 border-l-2 border-gold-400/30 hover:border-gold-400 transition-all duration-300 overflow-hidden"
      whileHover={{
        scale: 1.02,
        boxShadow: '0 0 25px rgba(212, 168, 83, 0.12), 0 0 50px rgba(212, 168, 83, 0.05)',
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gold-400/0 to-gold-400/0 group-hover:from-gold-400/[0.03] group-hover:to-transparent transition-all duration-500 rounded-xl" />

      <div className="relative z-10 flex items-start gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gold-400/10 flex items-center justify-center text-2xl group-hover:bg-gold-400/15 transition-colors duration-300">
          {choice.icon}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <h4 className="text-white/90 font-medium text-base md:text-lg mb-1 group-hover:text-white transition-colors">
            {choice.label}
          </h4>
          <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/50 transition-colors">
            {choice.description}
          </p>
        </div>

        {/* Arrow */}
        <div className="flex-shrink-0 self-center">
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gold-400/30 group-hover:text-gold-400 transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </motion.svg>
        </div>
      </div>
    </motion.button>
  );
}

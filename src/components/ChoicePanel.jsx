import { motion } from 'framer-motion';
import ChoiceButton from './ChoiceButton';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

export default function ChoicePanel({ choices, onChoose }) {
  return (
    <motion.div
      className="w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="h-px w-8 bg-gold-400/30" />
          <span className="text-gold-400/60 text-xs tracking-[0.3em] uppercase">
            Quyết định
          </span>
          <div className="h-px w-8 bg-gold-400/30" />
        </div>
        <h3 className="text-gold-400 text-lg md:text-xl font-narration">
          Bạn sẽ chọn con đường nào?
        </h3>
      </motion.div>

      {/* Choice buttons */}
      <div className="space-y-3">
        {choices.map((choice, index) => (
          <ChoiceButton
            key={choice.id}
            choice={choice}
            onClick={() => onChoose(choice)}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
}

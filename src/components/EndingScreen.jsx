import { useMemo } from 'react';
import { motion } from 'framer-motion';

const particles = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 1,
  duration: Math.random() * 6 + 5,
  delay: Math.random() * 3,
}));

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

// Animated circular progress
function ScoreCircle({ label, value, color, delay }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.6 }}
    >
      <div className="relative w-28 h-28">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="4"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ delay: delay + 0.3, duration: 1.5, ease: 'easeOut' }}
          />
        </svg>
        {/* Center percentage */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="text-white/80 text-xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.8 }}
          >
            {value}%
          </motion.span>
        </div>
      </div>
      <p className="mt-3 text-white/50 text-xs tracking-wider uppercase">{label}</p>
    </motion.div>
  );
}

export default function EndingScreen({ decisions, onRestart, onHome }) {
  // Calculate average scores
  const scores = useMemo(() => {
    if (!decisions || decisions.length === 0) {
      return { production: 75, efficiency: 75, social: 75 };
    }
    const total = decisions.reduce(
      (acc, d) => ({
        production: acc.production + (d.scores?.production || 70),
        efficiency: acc.efficiency + (d.scores?.efficiency || 70),
        social: acc.social + (d.scores?.social || 70),
      }),
      { production: 0, efficiency: 0, social: 0 }
    );
    return {
      production: Math.round(total.production / decisions.length),
      efficiency: Math.round(total.efficiency / decisions.length),
      social: Math.round(total.social / decisions.length),
    };
  }, [decisions]);

  return (
    <div className="relative min-h-screen bg-cinema-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,168,83,0.06)_0%,_transparent_70%)]" />
      </div>

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            bottom: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `rgba(212, 168, 83, ${0.1 + Math.random() * 0.2})`,
          }}
          animate={{
            y: [0, -(60 + Math.random() * 80)],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-3xl mx-auto px-6 py-16 md:py-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gold-400/30" />
            <span className="text-gold-400/50 text-xs tracking-[0.3em] uppercase">
              Kết thúc
            </span>
            <div className="h-px w-12 bg-gold-400/30" />
          </div>
          <h1 className="font-narration text-4xl md:text-6xl gradient-text-gold font-bold mb-3">
            Hành Trình Kết Thúc
          </h1>
          <p className="text-white/30 text-sm tracking-[0.2em] uppercase">
            Dòng Chảy Giá Trị
          </p>
        </motion.div>

        {/* Separator */}
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-10">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />
        </motion.div>

        {/* Decision Journey */}
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-gold-400/70 text-sm uppercase tracking-[0.2em] mb-6 text-center">
            Hành trình kinh tế của bạn
          </h2>
          <div className="space-y-3">
            {decisions && decisions.map((decision, index) => (
              <motion.div
                key={index}
                className="glass rounded-xl p-4 flex items-start gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.15 }}
              >
                <span className="text-gold-400 mt-0.5 text-sm flex-shrink-0">✓</span>
                <div>
                  <p className="text-gold-400/40 text-[10px] uppercase tracking-wider mb-0.5">
                    {decision.chapterTitle}
                  </p>
                  <p className="text-white/70 text-sm">{decision.entry}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Separator */}
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-10">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-400/15 to-transparent" />
          <div className="w-1 h-1 rounded-full bg-gold-400/20" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gold-400/15 to-transparent" />
        </motion.div>

        {/* Score Circles */}
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-gold-400/70 text-sm uppercase tracking-[0.2em] mb-8 text-center">
            Chỉ số kinh tế
          </h2>
          <div className="flex justify-center gap-8 md:gap-16">
            <ScoreCircle
              label="Sản xuất"
              value={scores.production}
              color="#60a5fa"
              delay={0.8}
            />
            <ScoreCircle
              label="Hiệu quả"
              value={scores.efficiency}
              color="#34d399"
              delay={1.0}
            />
            <ScoreCircle
              label="Xã hội"
              value={scores.social}
              color="#fbbf24"
              delay={1.2}
            />
          </div>
        </motion.div>

        {/* Separator */}
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-10">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-400/15 to-transparent" />
        </motion.div>

        {/* Closing message */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-14 max-w-xl mx-auto"
        >
          <p className="font-narration text-lg md:text-xl text-white/60 leading-relaxed italic">
            "Mỗi quyết định kinh tế đều tạo nên mối quan hệ giữa sản xuất, lao động và xã hội. 
            Kinh tế Chính trị Mác-Lênin giúp chúng ta hiểu bản chất của những mối quan hệ ấy, 
            để xây dựng một xã hội công bằng và phát triển bền vững."
          </p>
        </motion.div>

        {/* Action buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button
            onClick={onRestart}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-gold-600 to-gold-400 text-cinema-black font-semibold text-sm tracking-wide"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212, 168, 83, 0.3)' }}
            whileTap={{ scale: 0.97 }}
          >
            Trải nghiệm lại
          </motion.button>
          <motion.button
            onClick={onHome}
            className="px-8 py-3 rounded-full border border-gold-400/30 text-gold-400/70 hover:text-gold-400 hover:border-gold-400/60 transition-all text-sm tracking-wide"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Về trang chủ
          </motion.button>
        </motion.div>

        {/* Bottom credit */}
        <motion.div variants={itemVariants} className="mt-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-8 bg-gold-400/15" />
            <div className="w-1 h-1 rounded-full bg-gold-400/20" />
            <div className="h-px w-8 bg-gold-400/15" />
          </div>
          <p className="text-white/15 text-xs tracking-[0.15em] uppercase">
            Dòng Chảy Giá Trị — Dự án sáng tạo Kinh tế Chính trị Mác-Lênin
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

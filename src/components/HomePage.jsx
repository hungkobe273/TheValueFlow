import { useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 6 + 6,
  delay: Math.random() * 4,
}));

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function HomePage({ onStart }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cinema-black">
      {/* Background layers */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,168,83,0.08)_0%,_transparent_70%)]" />
        
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.6)_100%)]" />

        {/* Blurry Ambient Orbs for premium depth */}
        <motion.div
          className="absolute -top-40 -left-40 w-[450px] h-[450px] rounded-full bg-gold-500/5 blur-[120px] pointer-events-none"
          animate={{
            x: [0, 80, 0],
            y: [0, 100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-[450px] h-[450px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none"
          animate={{
            x: [0, -100, 0],
            y: [0, -80, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Animated gold line decorations */}
        <motion.div
          className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, delay: 1 }}
        />
        <motion.div
          className="absolute bottom-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/10 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, delay: 1.5 }}
        />
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
            background: `rgba(212, 168, 83, ${0.15 + Math.random() * 0.25})`,
          }}
          animate={{
            y: [0, -(80 + Math.random() * 120)],
            x: [0, (Math.random() - 0.5) * 60],
            opacity: [0, 0.8, 0],
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
        className="relative z-10 text-center px-6 max-w-3xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Decorative top ornament */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-400/50" />
            <div className="text-gold-400/60 text-xs tracking-[0.4em] uppercase">
              Dự án sáng tạo
            </div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-400/50" />
          </div>
        </motion.div>

        {/* Main title */}
        <motion.h1
          variants={itemVariants}
          className="font-narration text-5xl md:text-7xl lg:text-8xl font-bold mb-4 leading-tight"
        >
          <span className="gradient-text-gold">DÒNG CHẢY</span>
          <br />
          <span className="gradient-text-gold">GIÁ TRỊ</span>
        </motion.h1>

        {/* English subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-white/30 text-sm md:text-base tracking-[0.3em] uppercase mb-10 font-light"
        >
          The Value Flow
        </motion.p>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-white/50 text-base md:text-lg leading-relaxed mb-12 max-w-xl mx-auto font-light"
        >
          Một trải nghiệm kể chuyện tương tác về Kinh tế Chính trị Mác-Lênin. 
          Hãy bước vào hành trình của một doanh nhân trẻ, đối mặt với những quyết định kinh tế 
          và khám phá bản chất của giá trị, lao động và phát triển bền vững.
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={itemVariants}>
          <motion.button
            onClick={onStart}
            className="relative group px-10 py-4 rounded-full bg-gradient-to-r from-gold-600 to-gold-400 text-cinema-black font-semibold text-lg tracking-wide overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                boxShadow: '0 0 30px rgba(212, 168, 83, 0.4), 0 0 60px rgba(212, 168, 83, 0.2)',
              }}
            />
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              />
            </div>
            
            <span className="relative z-10 flex items-center gap-2">
              Bắt đầu hành trình
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </motion.button>
        </motion.div>

        {/* Bottom credit */}
        <motion.div
          variants={itemVariants}
          className="mt-16"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-8 bg-gold-400/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-gold-400/30" />
            <div className="h-px w-8 bg-gold-400/20" />
          </div>
          <p className="text-white/20 text-xs tracking-[0.2em] uppercase">
            Dự án sáng tạo — Kinh tế Chính trị Mác-Lênin
          </p>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cinema-black to-transparent pointer-events-none" />
    </div>
  );
}

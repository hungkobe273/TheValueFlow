// ============================================
// DÒNG CHẢY GIÁ TRỊ — Audio Engine
// Web Audio API synthesizer — no external files needed
// ============================================

import { useRef, useCallback, useEffect, useState } from 'react';

// Master gain levels — keep everything subtle, cinematic
const MASTER_VOLUME = 0.4;
const AMBIENT_VOLUME = 0.06;

export default function useAudioEngine() {
  const ctxRef = useRef(null);
  const masterGainRef = useRef(null);
  const ambientNodesRef = useRef([]);
  const [isMuted, setIsMuted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const isMutedRef = useRef(false);

  // ─── Initialize AudioContext on first user interaction ───────────────────
  const init = useCallback(() => {
    if (ctxRef.current) return;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    ctxRef.current = ctx;

    // Master gain node — controls overall volume
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(MASTER_VOLUME, ctx.currentTime);
    masterGain.connect(ctx.destination);
    masterGainRef.current = masterGain;

    setIsReady(true);
    startAmbient();
  }, []);

  // Keep isMutedRef in sync so audio functions can access latest value
  useEffect(() => {
    isMutedRef.current = isMuted;
    if (masterGainRef.current && ctxRef.current) {
      masterGainRef.current.gain.setTargetAtTime(
        isMuted ? 0 : MASTER_VOLUME,
        ctxRef.current.currentTime,
        0.1
      );
    }
  }, [isMuted]);

  // ─── Ambient drone — runs continuously ───────────────────────────────────
  const startAmbient = useCallback(() => {
    const ctx = ctxRef.current;
    const master = masterGainRef.current;
    if (!ctx || !master) return;

    // Stop any existing ambient nodes
    ambientNodesRef.current.forEach(n => {
      try { n.stop(); } catch (_) {}
    });
    ambientNodesRef.current = [];

    // Layer 1: Very low sub-bass drone (creates cinematic weight)
    const drone1 = createDroneLayer(ctx, master, 55, AMBIENT_VOLUME, 8);
    // Layer 2: Slightly higher harmonic (warmth)
    const drone2 = createDroneLayer(ctx, master, 82.5, AMBIENT_VOLUME * 0.5, 12);
    // Layer 3: High shimmer (gold texture)
    const drone3 = createDroneLayer(ctx, master, 220, AMBIENT_VOLUME * 0.15, 6);

    ambientNodesRef.current = [drone1, drone2, drone3].filter(Boolean);
  }, []);

  function createDroneLayer(ctx, destination, freq, volume, lfoSpeed) {
    try {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(freq, ctx.currentTime);

      gainNode.gain.setValueAtTime(volume, ctx.currentTime);

      // LFO for slow breathing effect
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(1 / lfoSpeed, ctx.currentTime);
      lfoGain.gain.setValueAtTime(volume * 0.3, ctx.currentTime);

      lfo.connect(lfoGain);
      lfoGain.connect(gainNode.gain);
      oscillator.connect(gainNode);
      gainNode.connect(destination);

      oscillator.start();
      lfo.start();

      return oscillator;
    } catch (_) {
      return null;
    }
  }

  // ─── Click sound — solid button press ───────────────────────────────────
  // Layered: attack transient + body tone — feels like a real UI button
  const playClick = useCallback(() => {
    const ctx = ctxRef.current;
    const master = masterGainRef.current;
    if (!ctx || !master) return;

    try {
      // Transient — sharp attack noise burst
      const bufSize = ctx.sampleRate * 0.015;
      const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1);

      const noise = ctx.createBufferSource();
      noise.buffer = buf;
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'highpass';
      noiseFilter.frequency.value = 3000;
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.18, ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.015);
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(master);
      noise.start(ctx.currentTime);

      // Body tone — short mid-freq thud
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.06);
      oscGain.gain.setValueAtTime(0, ctx.currentTime);
      oscGain.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 0.004);
      oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.connect(oscGain);
      oscGain.connect(master);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.12);
    } catch (_) {}
  }, []);

  // ─── Typing sound — per character soft tick ──────────────────────────────
  // Very subtle — like a mechanical keyboard key at low volume.
  // Called on every character render in SceneNarration.
  // Uses a tiny noise burst + high-freq tone — avoids oscillator spam overhead
  // by keeping duration extremely short (< 20ms).
  const playTyping = useCallback(() => {
    const ctx = ctxRef.current;
    const master = masterGainRef.current;
    if (!ctx || !master) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      // Slight random pitch variation — feels organic, not robotic
      const baseFreq = 900 + (Math.random() - 0.5) * 200;
      osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.7, ctx.currentTime + 0.012);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.018);

      osc.connect(gain);
      gain.connect(master);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.02);
    } catch (_) {}
  }, []);

  // ─── Transition whoosh — scene change ────────────────────────────────────
  const playTransition = useCallback(() => {
    const ctx = ctxRef.current;
    const master = masterGainRef.current;
    if (!ctx || !master) return;

    try {
      // White noise burst for whoosh
      const bufferSize = ctx.sampleRate * 0.4;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.4;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2000, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.4);
      filter.Q.value = 0.5;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(master);

      noise.start(ctx.currentTime);
    } catch (_) {}
  }, []);

  // ─── Insight chime — modal open ───────────────────────────────────────────
  const playInsight = useCallback(() => {
    const ctx = ctxRef.current;
    const master = masterGainRef.current;
    if (!ctx || !master) return;

    try {
      // Three-note ascending chime: D4 → F#4 → A4 (D major arpeggio — hopeful)
      const notes = [293.66, 369.99, 440.0];
      const delays = [0, 0.12, 0.25];

      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const t = ctx.currentTime + delays[i];
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.25, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);

        osc.connect(gain);
        gain.connect(master);

        osc.start(t);
        osc.stop(t + 0.85);
      });
    } catch (_) {}
  }, []);

  // ─── Chapter reveal — cinematic swell ────────────────────────────────────
  const playChapterReveal = useCallback(() => {
    const ctx = ctxRef.current;
    const master = masterGainRef.current;
    if (!ctx || !master) return;

    try {
      // Low pad swell
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(110, ctx.currentTime);
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(165, ctx.currentTime);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.8);
      gain.gain.setValueAtTime(0.2, ctx.currentTime + 1.8);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.5);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(master);

      osc1.start(ctx.currentTime);
      osc2.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 3.6);
      osc2.stop(ctx.currentTime + 3.6);
    } catch (_) {}
  }, []);

  // ─── Home button click — soft low tick ───────────────────────────────────
  const playHome = useCallback(() => {
    const ctx = ctxRef.current;
    const master = masterGainRef.current;
    if (!ctx || !master) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

      osc.connect(gain);
      gain.connect(master);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.22);
    } catch (_) {}
  }, []);

  // ─── Mute toggle ─────────────────────────────────────────────────────────
  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  // ─── Resume context if suspended (browser autoplay policy) ───────────────
  const resume = useCallback(() => {
    if (ctxRef.current?.state === 'suspended') {
      ctxRef.current.resume();
    }
  }, []);

  return {
    init,
    resume,
    isReady,
    isMuted,
    toggleMute,
    playClick,
    playTyping,
    playTransition,
    playInsight,
    playChapterReveal,
    playHome,
  };
}

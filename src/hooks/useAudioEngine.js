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

  // ─── Click sound — premium tactile UI click ──────────────────────────────
  // Double transient structure with resonant filter envelope
  const playClick = useCallback(() => {
    const ctx = ctxRef.current;
    const master = masterGainRef.current;
    if (!ctx || !master) return;

    try {
      const now = ctx.currentTime;
      
      // Resonant filter for a warm, clean click
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.Q.value = 6;
      filter.frequency.setValueAtTime(2000, now);
      filter.frequency.exponentialRampToValueAtTime(200, now + 0.08);
      filter.connect(master);

      // Primary click transient (sine sweep)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.05);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(filter);
      osc.start(now);
      osc.stop(now + 0.08);

      // Secondary release tick (10ms delay for tactile depth)
      const tick = ctx.createOscillator();
      const tickGain = ctx.createGain();
      tick.type = 'triangle';
      tick.frequency.setValueAtTime(800, now + 0.01);
      tick.frequency.exponentialRampToValueAtTime(300, now + 0.02);

      tickGain.gain.setValueAtTime(0, now);
      tickGain.gain.setValueAtTime(0.08, now + 0.01);
      tickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

      tick.connect(tickGain);
      tickGain.connect(filter);
      tick.start(now + 0.01);
      tick.stop(now + 0.04);
    } catch (_) {}
  }, []);

  // ─── Typing sound — tactile mechanical key tap ───────────────────────────
  // Combined noise click + soft wood-like organic thump
  const playTyping = useCallback(() => {
    const ctx = ctxRef.current;
    const master = masterGainRef.current;
    if (!ctx || !master) return;

    try {
      const now = ctx.currentTime;
      // Slight pitch variation for organic realism
      const pitchOffset = (Math.random() - 0.5) * 40;
      const baseFreq = 220 + pitchOffset;

      // 1. Soft body thump (Triangle wave)
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.6, now + 0.025);

      oscGain.gain.setValueAtTime(0.08, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

      osc.connect(oscGain);
      oscGain.connect(master);
      osc.start(now);
      osc.stop(now + 0.03);

      // 2. High-freq key snap transient (Filtered noise burst)
      const bufSize = ctx.sampleRate * 0.008; // extremely short
      const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) {
        data[i] = (Math.random() * 2 - 1);
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buf;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.value = 1500 + pitchOffset * 5;
      noiseFilter.Q.value = 3;

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.025, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.008);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(master);
      noise.start(now);
      noise.stop(now + 0.01);
    } catch (_) {}
  }, []);

  // ─── Transition whoosh — cinematic stereo sub-sweep ──────────────────────
  const playTransition = useCallback(() => {
    const ctx = ctxRef.current;
    const master = masterGainRef.current;
    if (!ctx || !master) return;

    try {
      const now = ctx.currentTime;
      const duration = 0.6;

      // Resonant bandpass filter sweeps down for wind/whoosh feel
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.Q.value = 3.5;
      filter.frequency.setValueAtTime(1200, now);
      filter.frequency.exponentialRampToValueAtTime(120, now + duration);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      // Noise source
      const bufferSize = ctx.sampleRate * duration;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1);
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      // Sub-bass sweep underneath for weight
      const sub = ctx.createOscillator();
      const subGain = ctx.createGain();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(140, now);
      sub.frequency.linearRampToValueAtTime(45, now + duration);

      subGain.gain.setValueAtTime(0.001, now);
      subGain.gain.linearRampToValueAtTime(0.18, now + 0.2);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(master);

      sub.connect(subGain);
      subGain.connect(master);

      noise.start(now);
      sub.start(now);

      noise.stop(now + duration + 0.05);
      sub.stop(now + duration + 0.05);
    } catch (_) {}
  }, []);

  // ─── Insight chime — premium multi-harmonic chime with delay/echo ──────────
  const playInsight = useCallback(() => {
    const ctx = ctxRef.current;
    const master = masterGainRef.current;
    if (!ctx || !master) return;

    try {
      const now = ctx.currentTime;

      // Create a delay line with feedback for lush reverb-like tail
      const delay = ctx.createDelay(1.0);
      const feedback = ctx.createGain();
      
      delay.delayTime.setValueAtTime(0.24, now);
      feedback.gain.setValueAtTime(0.35, now);

      // Connect chime signals to both master directly and through the delay line
      delay.connect(feedback);
      feedback.connect(delay); // loop back
      
      // Delay output connects to master
      feedback.connect(master);

      // Warm chime synth notes (D major chord: D5 -> F#5 -> A5 -> D6)
      const notes = [587.33, 739.99, 880.00, 1174.66];
      const delays = [0, 0.08, 0.16, 0.24];

      notes.forEach((freq, i) => {
        const noteTime = now + delays[i];
        
        // Additive Synthesis: Fundamental + 2nd Harmonic + 3.01x Overtones (bell character)
        const osc1 = ctx.createOscillator(); // Fundamental
        const osc2 = ctx.createOscillator(); // Octave
        const osc3 = ctx.createOscillator(); // Inharmonic chime overtone
        
        const voiceGain = ctx.createGain();

        osc1.type = 'triangle';
        osc1.frequency.setValueAtTime(freq, noteTime);

        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(freq * 2, noteTime);

        osc3.type = 'sine';
        osc3.frequency.setValueAtTime(freq * 3.01, noteTime);

        // Mix ratios
        const mix = ctx.createGain();
        mix.gain.setValueAtTime(0.08, noteTime);

        osc1.connect(mix);
        
        const mix2 = ctx.createGain();
        mix2.gain.setValueAtTime(0.03, noteTime);
        osc2.connect(mix2);

        const mix3 = ctx.createGain();
        mix3.gain.setValueAtTime(0.015, noteTime);
        osc3.connect(mix3);

        // Route everything to single voice gain node
        mix.connect(voiceGain);
        mix2.connect(voiceGain);
        mix3.connect(voiceGain);

        // Amplitude Envelope
        voiceGain.gain.setValueAtTime(0, noteTime);
        voiceGain.gain.linearRampToValueAtTime(1.0, noteTime + 0.01);
        voiceGain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.9);

        // Connect voice gain to both direct master and delay node
        voiceGain.connect(master);
        voiceGain.connect(delay);

        osc1.start(noteTime);
        osc2.start(noteTime);
        osc3.start(noteTime);

        osc1.stop(noteTime + 1.0);
        osc2.stop(noteTime + 1.0);
        osc3.stop(noteTime + 1.0);
      });
    } catch (_) {}
  }, []);

  // ─── Chapter reveal — deep cinematic pad swell with resonant filter ───────
  const playChapterReveal = useCallback(() => {
    const ctx = ctxRef.current;
    const master = masterGainRef.current;
    if (!ctx || !master) return;

    try {
      const now = ctx.currentTime;
      const duration = 4.0;

      // Resonant Lowpass Filter for cinematic sweep
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.Q.value = 5;
      filter.frequency.setValueAtTime(120, now);
      filter.frequency.exponentialRampToValueAtTime(1200, now + 1.8);
      filter.frequency.exponentialRampToValueAtTime(180, now + duration);
      filter.connect(master);

      const padGain = ctx.createGain();
      padGain.gain.setValueAtTime(0.001, now);
      padGain.gain.linearRampToValueAtTime(0.24, now + 1.2);
      padGain.gain.setValueAtTime(0.24, now + 2.2);
      padGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      // Lush suspended chord (C2, C3, G3, D4, G4)
      const freqs = [65.41, 130.81, 196.00, 293.66, 392.00];
      const oscillators = [];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        // Alternating triangle and sine for a rich, warm texture
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        
        // Add subtle detune modulation (chorus effect)
        osc.detune.setValueAtTime((idx - 2) * 8, now);
        osc.detune.linearRampToValueAtTime((idx - 2) * 8 + (Math.random() - 0.5) * 15, now + duration);

        osc.connect(padGain);
        oscillators.push(osc);
      });

      padGain.connect(filter);

      oscillators.forEach(osc => osc.start(now));
      oscillators.forEach(osc => osc.stop(now + duration + 0.1));
    } catch (_) {}
  }, []);

  // ─── Home button click — soft acoustic wooden block tap ──────────────────
  const playHome = useCallback(() => {
    const ctx = ctxRef.current;
    const master = masterGainRef.current;
    if (!ctx || !master) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.08);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      filter.type = 'lowpass';
      filter.frequency.value = 900;

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(master);

      osc.start(now);
      osc.stop(now + 0.12);
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

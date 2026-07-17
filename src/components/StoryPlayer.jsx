import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { storyData, chapters } from '../data/storyData';
import VideoScene from './VideoScene';
import SceneNarration from './SceneNarration';
import ChoicePanel from './ChoicePanel';
import EconomicInsight from './EconomicInsight';
import ProgressBar from './ProgressBar';
import DecisionJournal from './DecisionJournal';
import AudioToggle from './AudioToggle';
import useAudioEngine from '../hooks/useAudioEngine';

// Scene phases: video → narration → choice → insight → transition
const PHASES = {
  VIDEO: 'video',
  NARRATION: 'narration',
  CHOICE: 'choice',
  INSIGHT: 'insight',
  TRANSITION: 'transition',
};

export default function StoryPlayer({ onEnd, onHome }) {
  const [currentSceneId, setCurrentSceneId] = useState('ch1_intro');
  const [phase, setPhase] = useState(PHASES.VIDEO);
  const [decisions, setDecisions] = useState([]);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [journalOpen, setJournalOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const audio = useAudioEngine();

  const currentScene = storyData[currentSceneId];

  // Calculate chapter progress
  const currentChapter = currentScene?.chapter || 1;
  const chapterData = chapters[currentChapter - 1];
  const currentSceneIndex = chapterData?.scenes.indexOf(currentSceneId) ?? 0;

  // Phase handlers
  const handleVideoEnd = useCallback(() => {
    setPhase(PHASES.NARRATION);
  }, []);

  const handleNarrationComplete = useCallback(() => {
    if (currentScene?.choices && currentScene.choices.length > 0) {
      setPhase(PHASES.CHOICE);
    } else if (currentScene?.insight) {
      setPhase(PHASES.INSIGHT);
    } else {
      // Auto-advance to next scene
      advanceToScene(currentScene.nextScene);
    }
  }, [currentScene]);

  const handleChoice = useCallback((choice) => {
    setSelectedChoice(choice);
    audio.playClick();
    
    // Record decision
    setDecisions(prev => [
      ...prev,
      {
        chapterTitle: currentScene.chapterTitle,
        entry: choice.journalEntry || choice.label,
        icon: choice.icon,
        scores: choice.scores || { production: 70, efficiency: 70, social: 70 },
      }
    ]);

    // If next scene has insight, go through insight first
    const nextScene = storyData[choice.nextScene];
    if (nextScene?.insight) {
      advanceToScene(choice.nextScene);
    } else {
      advanceToScene(choice.nextScene);
    }
  }, [currentScene, audio]);

  const handleInsightContinue = useCallback(() => {
    if (currentScene.nextScene === 'ending') {
      onEnd(decisions);
    } else {
      advanceToScene(currentScene.nextScene);
    }
  }, [currentScene, decisions, onEnd]);

  const advanceToScene = useCallback((nextSceneId) => {
    if (nextSceneId === 'ending') {
      onEnd(decisions);
      return;
    }

    audio.playTransition();
    setIsTransitioning(true);
    
    // Fade out, then change scene, then fade in
    setTimeout(() => {
      setCurrentSceneId(nextSceneId);
      setPhase(PHASES.VIDEO);
      setIsTransitioning(false);
    }, 800);
  }, [decisions, onEnd, audio]);

  if (!currentScene) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cinema-black">
        <p className="text-gold-400">Đang tải...</p>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen bg-cinema-black overflow-hidden"
      onPointerDown={() => { audio.init(); audio.resume(); }}
    >
      {/* Progress Bar */}
      <ProgressBar
        currentChapter={currentChapter}
        totalChapters={3}
        chapterTitle={currentScene.chapterTitle}
        scenesInChapter={chapterData?.scenes.length || 5}
        currentSceneIndex={currentSceneIndex}
      />

      {/* Journal Toggle Button */}
      <motion.button
        className="fixed top-4 right-4 z-50 glass-dark rounded-full w-10 h-10 flex items-center justify-center text-gold-400 hover:text-gold-300 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setJournalOpen(true)}
        title="Nhật ký quyết định"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      </motion.button>

      {/* Decision Journal */}
      <DecisionJournal
        decisions={decisions}
        isOpen={journalOpen}
        onClose={() => setJournalOpen(false)}
      />

      {/* Audio toggle */}
      <AudioToggle isMuted={audio.isMuted} onToggle={audio.toggleMute} />

      {/* Scene transition overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 bg-black z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        )}
      </AnimatePresence>

      {/* Video — lives OUTSIDE AnimatePresence so phase changes never remount it.
           Video plays once, pauses on last frame, stays visible under narration/choices. */}
      <AnimatePresence mode="wait">
        {(phase === PHASES.VIDEO || phase === PHASES.NARRATION || phase === PHASES.CHOICE) && (
          <motion.div
            key={currentSceneId + '_video'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <VideoScene
              scene={currentScene}
              onVideoEnd={handleVideoEnd}
              isActive={phase === PHASES.VIDEO}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content — only overlays animate on phase change */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSceneId + phase}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="relative min-h-screen"
        >
          {/* Narration — overlays on top of the paused video */}
          {phase === PHASES.NARRATION && (
            <div className="absolute inset-0 flex items-end pb-10 px-4 md:px-8 lg:px-16 z-20">
              {/* Dark gradient behind text for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
              <div className="relative w-full max-w-4xl mx-auto">
                <SceneNarration
                  narrator={currentScene.narrator}
                  text={currentScene.narration}
                  sceneTitle={currentScene.title}
                  onComplete={handleNarrationComplete}
                  onTypingSound={audio.playTyping}
                />
              </div>
            </div>
          )}

          {/* Choices — overlays on top of the paused video */}
          {phase === PHASES.CHOICE && currentScene.choices && (
            <div className="absolute inset-0 flex items-end pb-10 px-4 md:px-8 lg:px-16 z-20">
              {/* Dark gradient behind choices for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />
              <div className="relative w-full max-w-3xl mx-auto">
                <ChoicePanel
                  choices={currentScene.choices}
                  onChoose={handleChoice}
                />
              </div>
            </div>
          )}

          {/* Economic Insight */}
          {phase === PHASES.INSIGHT && currentScene.insight && (
            <EconomicInsight
              insight={currentScene.insight}
              consequence={selectedChoice?.consequence || ''}
              onContinue={handleInsightContinue}
              onOpen={audio.playInsight}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Chapter transition overlay */}
      <AnimatePresence>
        {phase === PHASES.VIDEO && currentScene.id.endsWith('_intro') && (
          <motion.div
            className="fixed inset-0 z-30 flex items-center justify-center bg-black/90 pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.5, delay: 1.5 }}
            onAnimationStart={() => audio.playChapterReveal()}
          >
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <p className="text-gold-400/60 text-sm uppercase tracking-[0.3em] mb-3">
                Chương {currentChapter}
              </p>
              <h2 className="font-narration text-3xl md:text-5xl gradient-text-gold mb-2">
                {chapterData?.title}
              </h2>
              <p className="text-white/40 text-lg font-light">
                {chapterData?.subtitle}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

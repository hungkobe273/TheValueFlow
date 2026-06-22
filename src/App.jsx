import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HomePage from './components/HomePage';
import StoryPlayer from './components/StoryPlayer';
import EndingScreen from './components/EndingScreen';

// App states
const SCREENS = {
  HOME: 'home',
  PLAYING: 'playing',
  ENDING: 'ending',
};

function App() {
  const [screen, setScreen] = useState(SCREENS.HOME);
  const [finalDecisions, setFinalDecisions] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleStart = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setScreen(SCREENS.PLAYING);
      setFinalDecisions([]);
      setIsTransitioning(false);
    }, 800);
  }, []);

  const handleEnd = useCallback((decisions) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setFinalDecisions(decisions);
      setScreen(SCREENS.ENDING);
      setIsTransitioning(false);
    }, 800);
  }, []);

  const handleRestart = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setScreen(SCREENS.PLAYING);
      setFinalDecisions([]);
      setIsTransitioning(false);
    }, 800);
  }, []);

  const handleHome = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setScreen(SCREENS.HOME);
      setFinalDecisions([]);
      setIsTransitioning(false);
    }, 800);
  }, []);

  return (
    <div className="min-h-screen bg-cinema-black">
      {/* Global transition overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 bg-black z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        )}
      </AnimatePresence>

      {/* Screens */}
      <AnimatePresence mode="wait">
        {screen === SCREENS.HOME && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HomePage onStart={handleStart} />
          </motion.div>
        )}

        {screen === SCREENS.PLAYING && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <StoryPlayer onEnd={handleEnd} onHome={handleHome} />
          </motion.div>
        )}

        {screen === SCREENS.ENDING && (
          <motion.div
            key="ending"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <EndingScreen
              decisions={finalDecisions}
              onRestart={handleRestart}
              onHome={handleHome}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

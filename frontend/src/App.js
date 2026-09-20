import { useCallback, useRef, useState } from "react";
import "@/App.css";
import { AnimatePresence, motion } from "framer-motion";
import DoorStage from "@/components/DoorStage";
import Invitation from "@/components/Invitation";
import ClosedScreen from "@/components/ClosedScreen";

function App() {
  const [stage, setStage] = useState("door");
  const audioRef = useRef(null);

  const ensureAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/assets/song.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.55;
    }
    return audioRef.current;
  };

  const handleTap = useCallback(() => {
    ensureAudio().play()
      .then(() => { window.__musicState = "playing"; })
      .catch((e) => { window.__musicState = "blocked:" + e.name; });
  }, []);

  const handleOpened = useCallback(() => {
    setStage("invite");
  }, []);

  const handleClose = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    window.__musicState = "stopped";
    setStage("closed");
  }, []);

  const toggleMute = useCallback(() => {
    const audio = ensureAudio();
    if (audio.paused) audio.play().catch(() => {});
    audio.muted = !audio.muted;
    return audio.muted;
  }, []);

  return (
    <div className="App">
      <AnimatePresence>
        {stage === "door" && (
          <motion.div key="door" exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: "easeInOut" }}>
            <DoorStage onDone={handleOpened} onTap={handleTap} />
          </motion.div>
        )}
        {stage === "invite" && (
          <motion.div key="invite" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.1, ease: "easeOut" }}>
            <Invitation onReplay={() => setStage("door")} onClose={handleClose} toggleMute={toggleMute} />
          </motion.div>
        )}
        {stage === "closed" && (
          <motion.div key="closed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, ease: "easeOut" }}>
            <ClosedScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

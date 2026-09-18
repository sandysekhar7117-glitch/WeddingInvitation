import { useCallback, useRef, useState } from "react";
import "@/App.css";
import { AnimatePresence, motion } from "framer-motion";
import DoorStage from "@/components/DoorStage";
import OpeningStage from "@/components/OpeningStage";
import Invitation from "@/components/Invitation";

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

  const handleTapDoor = useCallback(() => {
    ensureAudio().play().catch(() => {});
    setStage("opening");
  }, []);

  const toggleMute = useCallback(() => {
    const audio = ensureAudio();
    audio.muted = !audio.muted;
    return audio.muted;
  }, []);

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {stage === "door" && (
          <motion.div key="door" exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.55, ease: "easeInOut" }}>
            <DoorStage onTap={handleTapDoor} />
          </motion.div>
        )}
        {stage === "opening" && (
          <motion.div key="opening" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
            <OpeningStage onDone={() => setStage("invite")} />
          </motion.div>
        )}
        {stage === "invite" && (
          <motion.div key="invite" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.1, ease: "easeOut" }}>
            <Invitation onReplay={() => setStage("door")} toggleMute={toggleMute} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

import { useCallback, useRef, useState } from "react";
import "@/App.css";
import { AnimatePresence, motion } from "framer-motion";
import DoorStage from "@/components/DoorStage";
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

  const handleOpened = useCallback(() => {
    setStage("invite");
    ensureAudio().play()
      .then(() => { window.__musicState = "playing"; })
      .catch((e) => { window.__musicState = "blocked:" + e.name; });
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
            <DoorStage onDone={handleOpened} />
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

import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function MusicToggle({ toggleMute }) {
  const [muted, setMuted] = useState(false);
  return (
    <button
      data-testid="music-toggle-button"
      aria-label={muted ? "Unmute music" : "Mute music"}
      onClick={() => setMuted(toggleMute())}
      className="fixed bottom-6 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-[#d4af37]/50 bg-[#061614]/70 text-[#e5c374] backdrop-blur-md transition-transform hover:scale-110"
    >
      {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
    </button>
  );
}

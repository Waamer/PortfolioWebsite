"use client";
import { useVoice, VoiceReadyState } from "@humeai/voice-react";

interface EndCallBtnProps {
  setIsOpen: (value: number) => void;
  isOpen: number;
}

export default function EndCallBtn({ setIsOpen, isOpen }: EndCallBtnProps) {
  const { disconnect, readyState } = useVoice();
  
  if (readyState === VoiceReadyState.OPEN) {
    return (
      <button
        className="flex items-center px-2.5 pt-1.5 pb-1 ml-2.5 mt-2.5 rounded-md font-medium bg-[#E76F51] transition-all duration-200 hover:bg-[#F4A261]"
        onClick={() => {
          disconnect();
          setIsOpen(isOpen + 1)
        }}
      >
        End Call
      </button>
    );
  }
}

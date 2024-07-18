"use client";
import { useVoice, VoiceReadyState } from "@humeai/voice-react";
import { LuPhoneCall } from "react-icons/lu";

interface StartCallBtnProps {
  setIsOpen: (value: number) => void;
  isOpen: number;
}

export default function StartCallBtn({ setIsOpen, isOpen }: StartCallBtnProps) {
  const { connect, readyState } = useVoice();
  
  return (
    <button
    className="flex gap-1.5 items-center px-2.5 py-1.5 rounded-md font-medium bg-[#F4A261] transition-all duration-200 hover:bg-[#E9C46A]"
      onClick={() => {
        connect()
          .then(() => {
            setIsOpen(isOpen + 1); // Set isOpen to +1 on successful connection
          })
          .catch(() => {
            /* handle error */
          });
      }}
    >
      <LuPhoneCall />
      Call my AI Assistant
    </button>
  );
}

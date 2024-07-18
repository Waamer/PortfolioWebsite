"use client";
import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./Messages";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import StartCallBtn from "./StartCall-btn";
import EndCallBtn from "./EndCall-btn";

export default function ClientComponent({ accessToken }: { accessToken: string; }) {
     const [isOpen, setIsOpen] = useState(0)
     return (
      <VoiceProvider auth={{ type: "accessToken", value: accessToken }} hostname="api.hume.ai">
         <AnimatePresence>
             <motion.div
                 initial={{ opacity: 0, filter: 'blur(8px)' }}
                 animate={{ opacity: 1, filter: 'blur(0px)' }}
                 transition={{ ease: 'easeInOut', duration: 0.7, delay: 2 }}
                 className="absolute bottom-5 right-5"
             >
                 <StartCallBtn setIsOpen={setIsOpen} isOpen={isOpen} />
             </motion.div>
 
             {isOpen % 2 == 1 && (
                 <motion.div
                     key={isOpen}
                     initial={{ opacity: 0, y: -12, filter: 'blur(2px)' }}
                     animate={{ opacity: 1, y: 0 , filter: 'blur(0px)' }}
                     exit={{ opacity: 0, y: -12 , filter: 'blur(2px)' }}
                     transition={{ ease: 'easeInOut', duration: 0.2 }}
                     className="bg-[#031820]/40 w-screen h-screen overflow-y-scroll absolute top-0 left-0 z-[3] flex items-center justify-center sm:p-6"
                 >
                     <div className="bg-[#FFFFF0]/[98%] max-w-6xl w-full h-full z-[3] sm:rounded-md overflow-y-scroll ">
                        <EndCallBtn setIsOpen={setIsOpen} isOpen={isOpen} />
                        <Messages />
                      </div>
                 </motion.div>
             )}
         </AnimatePresence>
        </VoiceProvider>
  );
}

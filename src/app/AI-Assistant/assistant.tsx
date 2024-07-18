'use client'
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { LuPhoneCall } from "react-icons/lu";

export function Assistant({children}: Readonly<{ children: React.ReactNode; }>) {
    const [isOpen, setIsOpen] = useState(0)
    return (
    <>
        <AnimatePresence>
            
            <motion.div
                initial={{ opacity: 0, filter: 'blur(8px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ ease: 'easeInOut', duration: 0.7, delay: 2 }}
                className="absolute bottom-5 right-5"
            >
                <button onClick={() => setIsOpen(isOpen + 1)} className="flex gap-1.5 items-center px-2.5 py-1.5 rounded-md font-medium bg-[#F4A261] transition-all duration-200 hover:bg-[#E9C46A]">
                    <LuPhoneCall />
                    Call my AI Assistant
                </button>
            </motion.div>

            {isOpen % 2 == 1 && (
                <motion.div
                    key={isOpen}
                    initial={{ opacity: 0, y: -12, filter: 'blur(2px)' }}
                    animate={{ opacity: 1, y: 0 , filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -12 , filter: 'blur(2px)' }}
                    transition={{ ease: 'easeInOut', duration: 0.2 }}
                    className="bg-[#031820]/40 w-screen h-screen absolute top-0 left-0 z-[3] flex items-center justify-center sm:p-6"
                >
                    <div className="bg-[#FFFFF0]/[98%] max-w-6xl w-full h-full z-[3] sm:rounded-md">
                        <button onClick={() => setIsOpen(isOpen + 1)} className="flex items-center px-2.5 pt-1.5 pb-1 ml-2.5 mt-2.5 rounded-md font-medium bg-[#E76F51] transition-all duration-200 hover:bg-[#F4A261]">
                            End Call
                        </button>
                    </div>
                    {children}
                </motion.div>
            )}

        </AnimatePresence>
    </>
    )
}
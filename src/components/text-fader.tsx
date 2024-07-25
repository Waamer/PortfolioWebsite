'use client'
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react"

export function TextFade() {
    const words = useMemo(() => ['software developer.', 'weight lifter.', 'CS student.', 'proud Muslim.', 'web-dev enthusiast.'], [])
    const [currentWord, setCurrentWord] = useState(words[0])

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWord(prev => {
                const nextIndex = (words.indexOf(prev) + 1) % words.length;
                return words[nextIndex];
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [words]);

    return (
        <div className="relative h-[70px]">
            <AnimatePresence>
                <motion.span
                    key={currentWord}
                    initial={{ opacity: 0, y: 8, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -8, filter: 'blur(8px)' }}
                    transition={{ ease: 'easeInOut', duration: 0.7 }}
                    className="absolute w-full"
                >
                    <h1 className="text-6xl font-medium text-[#E9C46A]">{currentWord}</h1>
                </motion.span>
            </AnimatePresence>
        </div>
    )
}

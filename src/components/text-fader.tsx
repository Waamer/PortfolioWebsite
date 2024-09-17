'use client'
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react"

export function TextFade() {
    const words = useMemo(() => ['web developer.', 'weight lifter.', 'CS student.', 'proud Muslim.'], [])
    const [currentWord, setCurrentWord] = useState(words[0])

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWord(prev => {
                const nextIndex = (words.indexOf(prev) + 1) % words.length;
                return words[nextIndex];
            });
        }, 2000);

        return () => clearInterval(interval);
    }, [words]);

    return (
        <div className="relative h-[70px] overflow-hidden">
            <AnimatePresence>
                <motion.span
                    key={currentWord}
                    initial={{ opacity: 0, y: 8, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -8, filter: 'blur(8px)' }}
                    transition={{ ease: 'easeInOut', duration: 0.8 }}
                    className="absolute w-full"
                >
                    <h1 className="text-6xl font-medium text-[#E9C46A]">{currentWord}</h1>
                </motion.span>
            </AnimatePresence>
        </div>
    )
}

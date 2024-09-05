import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LuMenu, LuX } from 'react-icons/lu';
import useIntersectionObserver from '../hooks/useIntersectionObserver'; // Adjust the path if necessary

export function Navbar() {
    const [activeLink, setActiveLink] = useState<string>('');

    const sections = useIntersectionObserver({ threshold: 0.5 });

    useEffect(() => {
        const activeSection = sections.find(entry => entry.isIntersecting)?.target;
        if (activeSection) {
            setActiveLink(`#${activeSection.id}`);
        }
    }, [sections]);

    return (
        <>
            <nav className={`w-fit h-fit mx-auto rounded-lg fixed top-2 inset-0 md:top-3 z-[11] p-3 flex items-center justify-center transition-all duration-300 bg-black/10 backdrop-blur-lg border-2 border-black/10`}>
                    <ul className="gap-2 md:gap-2.5 lg:gap-3 text-md items-center font-medium text-[#80FFDB] flex">
                        <AnimatePresence>
                            <motion.li key={'home'} whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                                <a href="#home" className={`hover:bg-[#80FFDB]/30 px-2.5 py-1.5 rounded-lg ${activeLink === '#home' ? 'bg-[#80FFDB]/30' : ''}`}>
                                    Home
                                </a>
                            </motion.li>
                            <motion.li key={'about'} whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                                <a href="#about" className={`hover:bg-[#80FFDB]/30 px-2.5 py-1.5 rounded-lg ${activeLink === '#about' ? 'bg-[#80FFDB]/30' : ''}`}>
                                    About
                                </a>
                            </motion.li>
                            <motion.li key={'projects'} whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                                <a href="#projects" className={`hover:bg-[#80FFDB]/30 px-2.5 py-1.5 rounded-lg ${activeLink === '#projects' ? 'bg-[#80FFDB]/30' : ''}`}>
                                    Projects
                                </a>
                            </motion.li>
                        </AnimatePresence>
                    </ul>
            </nav>
        </>
    );
}

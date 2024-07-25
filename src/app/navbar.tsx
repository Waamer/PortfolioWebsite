import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LuMenu, LuX } from 'react-icons/lu';
import useIntersectionObserver from '../hooks/useIntersectionObserver'; // Adjust the path if necessary

export function Navbar() {
    const [navOpen, setNavOpen] = useState<boolean>(false);
    const [activeLink, setActiveLink] = useState<string>('');
    const [navColor, setNavColor] = useState<boolean>(false);

    const sections = useIntersectionObserver({ threshold: 0.5 });

    useEffect(() => {
        const activeSection = sections.find(entry => entry.isIntersecting)?.target;
        if (activeSection) {
            setActiveLink(`#${activeSection.id}`);
        }
    }, [sections]);

    useEffect(() => {
        const changeNavColor = () => {
            if (window.scrollY >= 15) {
                setNavColor(true);
            } else {
                setNavColor(false);
            }
        };

        window.addEventListener('scroll', changeNavColor);

        return () => {
            window.removeEventListener('scroll', changeNavColor);
        };
    }, []);

    return (
        <>
            <nav className={`w-full h-fit sticky top-0 z-[11] p-3 sm:px-5 md:py-5 md:px-8 flex items-center justify-between transition-all duration-300 ${navColor ? 'bg-black/5 backdrop-blur-[2px] md:backdrop-blur-[1px]' : ''}`}>
                <div>
                    <p className="text-[#80FFDB] text-4xl font-bold sm:hover:text-[42px] duration-200 select-none">W</p>
                </div>
                <div>
                    <button onClick={() => setNavOpen(!navOpen)} className="sm:hidden top-5 right-5 absolute z-[11]">
                        <LuMenu className={`text-white transition-all duration-300 ${navOpen ? 'size-0' : 'size-7'}`} />
                        <LuX className={`text-white transition-all duration-300 ${navOpen ? 'size-7' : 'size-0'}`} />
                    </button>
                    <ul className="gap-3 text-md items-center font-medium text-[#80FFDB] hidden sm:flex">
                        <AnimatePresence>
                            <motion.li key={'home'} whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                                <a href="#home" className={`hover:bg-[#80FFDB]/30 px-2.5 py-1.5 rounded-sm ${activeLink === '#home' ? 'bg-[#80FFDB]/30' : ''}`}>
                                    Home
                                </a>
                            </motion.li>
                            <motion.li key={'about'} whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                                <a href="#about" className={`hover:bg-[#80FFDB]/30 px-2.5 py-1.5 rounded-sm ${activeLink === '#about' ? 'bg-[#80FFDB]/30' : ''}`}>
                                    About
                                </a>
                            </motion.li>
                            <motion.li key={'projects'} whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                                <a href="#projects" className={`hover:bg-[#80FFDB]/30 px-2.5 py-1.5 rounded-sm ${activeLink === '#projects' ? 'bg-[#80FFDB]/30' : ''}`}>
                                    Projects
                                </a>
                            </motion.li>
                            <motion.li key={'contact'} whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                                <a href="#contact" className={`hover:bg-[#80FFDB]/30 px-2.5 py-1.5 rounded-sm ${activeLink === '#contact' ? 'bg-[#80FFDB]/30' : ''}`}>
                                    Contact
                                </a>
                            </motion.li>
                        </AnimatePresence>
                    </ul>
                </div>
            </nav>
            <ul className={`flex flex-col text-2xl font-medium text-[#80FFDB] sm:hidden gap-4 py-24 items-center fixed inset-0 z-[10] bg-black/95 transition-transform duration-[350ms] ${navOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <li>
                    <a onClick={() => setNavOpen(!navOpen)} href="#home" className={activeLink === '#home' ? 'bg-[#80FFDB]/30 px-2.5 py-1.5 rounded-sm' : ''}>
                        Home
                    </a>
                </li>
                <li>
                    <a onClick={() => setNavOpen(!navOpen)} href="#about" className={activeLink === '#about' ? 'bg-[#80FFDB]/30 px-2.5 py-1.5 rounded-sm' : ''}>
                        About
                    </a>
                </li>
                <li>
                    <a onClick={() => setNavOpen(!navOpen)} href="#projects" className={activeLink === '#projects' ? 'bg-[#80FFDB]/30 px-2.5 py-1.5 rounded-sm' : ''}>
                        Projects
                    </a>
                </li>
                <li>
                    <a onClick={() => setNavOpen(!navOpen)} href="#contact" className={activeLink === '#contact' ? 'bg-[#80FFDB]/30 px-2.5 py-1.5 rounded-sm' : ''}>
                        Contact
                    </a>
                </li>
            </ul>
        </>
    );
}

'use client'
import { useEffect, useState } from "react";
import { LuMenu, LuX } from "react-icons/lu";

export function Navbar() {
    const [navOpen, setNavOpen] = useState(false);
    const [navColor, setNavColor] = useState(false);

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
            <nav className={`w-full h-fit sticky top-0 z-[11] p-3 sm:px-5 md:py-5 md:px-8 flex items-center justify-between transition-all duration-300 ${navColor && !navOpen ? 'bg-black/5 backdrop-blur-[2px] md:backdrop-blur-[1px]' : ''}`}>
                <div>
                    <p className="text-[#80FFDB] text-4xl font-bold sm:hover:text-[42px] duration-200 select-none">W</p>
                </div>
                <div>
                    <button onClick={() => setNavOpen(!navOpen)} className="sm:hidden top-5 right-5 absolute z-[11]">
                        <LuMenu className={`text-white transition-all duration-300 ${navOpen ? 'size-0' : 'size-7'}`} />
                        <LuX className={`text-white transition-all duration-300 ${navOpen ? 'size-7' : 'size-0'}`} />
                    </button>
                    <ul className="gap-5 text-lg items-center font-medium text-[#80FFDB] hidden sm:flex">
                        <li>
                            <a href="#about" className="hover:text-[#80FFDB]/40 transition-colors duration-200">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="#projects" className="hover:text-[#80FFDB]/40 transition-colors duration-200">
                                Projects
                            </a>
                        </li>
                        <li>
                            <a href="#contact" className="hover:text-[#80FFDB]/40 transition-colors duration-200">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            <ul className={`flex flex-col text-2xl font-medium text-[#80FFDB] hover:text-[#2A9D8F] sm:hidden gap-2.5 py-24 items-center fixed inset-0 z-[10] bg-black/95 transition-transform duration-[350ms] ${navOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <li>
                    <a onClick={() => setNavOpen(!navOpen)} href="#about">
                        About
                    </a>
                </li>
                <li>
                    <a onClick={() => setNavOpen(!navOpen)} href="#projects">
                        Projects
                    </a>
                </li>
                <li>
                    <a onClick={() => setNavOpen(!navOpen)} href="#contact">
                        Contact
                    </a>
                </li>
            </ul>
        </>
    );
}

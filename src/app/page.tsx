'use client'
import { Assistant } from "../components/AI-Assistant/assistant";
import { Background } from "./background";
import { LoadingScreen } from "./loading-screen";
import { Navbar } from "./navbar"
import { TextFade } from "../components/text-fader";
import { DisplayModel } from "@/components/3DModel/DisplayModel";
import { useEffect, useState } from "react";
import Image from "next/image";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiReact, SiThreedotjs, SiTypescript } from "react-icons/si";
import { CustomCursor } from "@/components/CustomCursor";

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [brandName, setBrandName] = useState<string | undefined>();
  const [cursorType, setCursorType] = useState<string>('default')
  const [isCursorEnabled, setIsCursorEnabled] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsCursorEnabled(width > 900);
    };

    handleResize()
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {(isCursorEnabled && loadingComplete) && <CustomCursor brandName={brandName} cursorType={cursorType} />}
      <LoadingScreen onComplete={() => setLoadingComplete(true)} />
      <Background />
      <Navbar />
      <section
        id="home"
        data-observe
        className="w-screen h-screen flex flex-col justify-start items-center px-4 z-[12]"
        style={{ height: `calc(100dvh - var(--navbar-height))` }}
      >
        <div id="home" className="absolute -mt-[var(--navbar-height)]"></div>
        <div className="select-none" onMouseEnter={() => setCursorType('text')} onMouseLeave={() => setCursorType('default')}>
          <h1 className="text-6xl sm:text-7xl font-medium text-[#E9C46A]">Hi! I&apos;m Waleed Aamer.</h1>
          <TextFade />
        </div>
        {loadingComplete && <Assistant />}
        <DisplayModel />
      </section>
      <section id="about" data-observe className="flex flex-col items-center h-screen w-screen px-4 border-2">
        <div className="max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-black/20 backdrop-blur-[1px] p-6 rounded-lg sm:col-span-3 lg:col-span-2 flex justify-center items-center">
            <p className="text-xl leading-snug font-medium text-[#80FFDB]">
              My tech journey started off&nbsp;
              <span className="text-[#FFFFF0]">
                with being amazed by Java and the Minecraft mods made by it as a kid, to now being a 3rd-year Computer Science student studying at&nbsp;
                <span className="bg-purple-400 py-0.5 px-1 text-lg rounded-sm text-black font-semibold text-nowrap">Western University</span>
                &nbsp;who is eager to learn more about the different fields in Computer Science, hopefully, to make positive changes someday!
              </span>
            </p>
          </div>
          <div className="bg-black/20 backdrop-blur-[1px] flex flex-col items-center justify-center p-6 pb-4 rounded-lg">
            <Image
              alt={'picture of me in a suit!'}
              src={'/selfie2.jpg'}
              width={250}
              height={400}
              className="rounded-lg"
            />
            <p className="text-sm mt-1 leading-snug font-medium text-[#FFFFF0]">
              Proof that I look like my 3D Model!
            </p>
          </div>
          <div className="grid grid-flow-col grid-rows-2 overflow-x-auto sm:flex flex-wrap gap-4 items-center sm:justify-center sm:col-span-2 lg:col-span-3">
                <a href="https://java.com/" className="bg-[#FFFFF0] p-6 size-24 rounded-lg"
                  onMouseEnter={() => {setBrandName("Java"); setCursorType('brand')}}
                  onMouseLeave={() => {setBrandName(undefined); setCursorType('default')}}
                >
                  <i className="ci ci-java-vertical ci-3x"></i>
                </a>
                <a href="https://python.org" className="bg-[#1d405d] p-6 size-24 rounded-lg"
                  onMouseEnter={() => {setBrandName("Python"); setCursorType('brand')}}
                  onMouseLeave={() => {setBrandName(undefined); setCursorType('default')}}
                >
                  <i className="ci ci-python ci-3x"></i>
                </a>
                <a href="https://devdocs.io/c/" className="bg-[#222222] p-6 size-24 rounded-lg"
                  onMouseEnter={() => {setBrandName("C"); setCursorType('brand')}}
                  onMouseLeave={() => {setBrandName(undefined); setCursorType('default')}}
                >
                  <i className="ci ci-c ci-3x"></i>
                </a>
                <a href="https://git-scm.com/" className="bg-[#f0f0e8] p-6 size-24 rounded-lg"
                  onMouseEnter={() => {setBrandName("Git"); setCursorType('brand')}}  
                  onMouseLeave={() => {setBrandName(undefined); setCursorType('default')}}
                >
                  <i className="ci ci-git ci-3x"></i>
                </a>
                <a href="https://typescriptlang.org/" className="bg-[#3178c6] p-6 size-24 rounded-lg"
                  onMouseEnter={() => {setBrandName("TypeScript"); setCursorType('brand')}}  
                  onMouseLeave={() => {setBrandName(undefined); setCursorType('default')}}
                >
                  <SiTypescript className="size-12 text-white"/>
                </a>
                <a href="https://tailwindcss.com/" className="bg-[#0f172a] p-6 size-24 rounded-lg"
                  onMouseEnter={() => {setBrandName("TailwindCSS"); setCursorType('brand')}} 
                  onMouseLeave={() => {setBrandName(undefined); setCursorType('default')}}
                >
                  <RiTailwindCssFill className="size-12 text-[#38bdf8]" />
                </a>
                <a href="https://framer.com/motion/" className="bg-[#1a1a1a] p-6 size-24 rounded-lg"
                  onMouseEnter={() => {setBrandName("Framer Motion"); setCursorType('brand')}} 
                  onMouseLeave={() => {setBrandName(undefined); setCursorType('default')}}
                >
                  <i className="ci ci-framer-motion ci-3x"></i>
                </a>
                <a href="https://threejs.org/" className="bg-black p-6 size-24 rounded-lg"
                  onMouseEnter={() => {setBrandName("ThreeJS"); setCursorType('brand')}} 
                  onMouseLeave={() => {setBrandName(undefined); setCursorType('default')}}
                >
                  <SiThreedotjs className="size-12 text-white"/>
                </a>
                <a href="https://react.dev/" className="bg-[#23272f] p-6 size-24 rounded-lg"
                  onMouseEnter={() => {setBrandName("ReactJS"); setCursorType('brand')}} 
                  onMouseLeave={() => {setBrandName(undefined); setCursorType('default')}}
                >
                  <SiReact className="size-12 text-[#58c4dc]" />
                </a>
                <a href="https://nextjs.org/" className="bg-white p-6 size-24 rounded-lg"
                  onMouseEnter={() => {setBrandName("NextJS"); setCursorType('brand')}} 
                  onMouseLeave={() => {setBrandName(undefined); setCursorType('default')}}
                >
                  <i className="ci ci-nextjs-light ci-3x"></i>
                </a>
                <a href="https://djangoproject.com" className="bg-[#0c4b33] p-6 size-24 rounded-lg"
                  onMouseEnter={() => {setBrandName("Django"); setCursorType('brand')}} 
                  onMouseLeave={() => {setBrandName(undefined); setCursorType('default')}}
                >
                  <i className="ci ci-django ci-3x"></i>
                </a>
          </div>
        </div>
      </section>
      <section id="projects" data-observe className="flex flex-col justify-center items-center h-screen w-screen border-2">
        {/* Projects content */}
      </section>
      <section id="contact" data-observe className="flex flex-col justify-center items-center h-screen w-screen border-2">
        {/* Contact content */}
      </section>
    </>
  );
}

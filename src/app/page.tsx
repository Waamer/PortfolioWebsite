'use client'
import { Assistant } from "../components/AI-Assistant/assistant";
import { Background } from "./background";
import { LoadingScreen } from "./loading-screen";
import { Navbar } from "./navbar"
import { TextFade } from "../components/text-fader";
import { DisplayModel } from "@/components/3DModel/DisplayModel";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiReact, SiThreedotjs, SiTypescript } from "react-icons/si";
import { CustomCursor } from "@/components/CustomCursor";
import { LuConstruction, LuExternalLink } from "react-icons/lu";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

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

  const scrollRef = useRef(null);
  const { scrollXProgress } = useScroll({ container: scrollRef });
  const translateX = useTransform(scrollXProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="overflow-x-hidden">
      {(isCursorEnabled && loadingComplete) && <CustomCursor brandName={brandName} cursorType={cursorType} />}
      <LoadingScreen onComplete={() => setLoadingComplete(true)} />
      <Background />
      <Navbar />
      <section
        id="home"
        data-observe
        className="scroll-mt-[80px] w-screen h-screen flex flex-col justify-start items-center px-4 lgH:h-[90vh] xlH:h-[70vh]"
      >
        <div className="select-none mt-20 lg:mt-24" onMouseEnter={() => setCursorType('text')} onMouseLeave={() => setCursorType('default')}>
          <h1 className="text-6xl sm:text-7xl font-medium text-[#E9C46A]">Hi! I&apos;m Waleed Aamer.</h1>
          {loadingComplete && <TextFade />}
        </div>
        {loadingComplete && <Assistant />}
        <DisplayModel />
      </section>
      <section id="about" data-observe className="scroll-mt-[98px] smH:mt-20 sm:mt-0 flex flex-col justify-center items-center w-screen pb-5 px-4">
        <div className="max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-black/10 backdrop-blur-lg border-2 border-black/10 p-6 rounded-lg sm:col-span-3 lg:col-span-2 flex justify-center items-center">
            <h1 className="text-xl leading-snug font-medium text-[#80FFDB]">
              My tech journey started off&nbsp;
              <span className="text-[#FFFFF0]">
                with being amazed by Java and the Minecraft mods made by it as a kid, to now being a 3rd-year Computer Science student studying at&nbsp;
                <span className="bg-purple-400 px-1 text-lg rounded-sm text-black font-semibold text-nowrap whitespace-nowrap hidden sm:inline-block">Western University</span>
                <p className="bg-purple-400 py-0.5 px-1 text-lg rounded-sm text-black font-semibold text-nowrap whitespace-nowrap text-center mt-0.5 sm:hidden">Western University</p>
                &nbsp;who is eager to learn more about the different fields in Computer Science, hopefully, to make positive changes someday!
              </span>
            </h1>
          </div>
          <div className="bg-black/10 backdrop-blur-lg border-2 border-black/10 flex flex-col items-center justify-center p-6 pb-4 rounded-lg">
            <Image
              alt={'picture of me in a suit!'}
              src={'/selfie.png'}
              width={250}
              height={250}
              className="rounded-lg"
            />
            <p className="text-sm mt-1 leading-snug font-medium text-[#FFFFF0]">
              Proof that I look like my 3D Model!
            </p>
          </div>
          <div ref={scrollRef} className="grid grid-flow-col grid-rows-2 overflow-x-auto sm:flex flex-wrap gap-4 items-center sm:justify-center sm:col-span-2 lg:col-span-3">
                <a target='_blank' href="https://java.com/" className="hover:cursor-pointer">
                  <div className="bg-[#FFFFF0] p-6 size-24 rounded-lg"
                    onMouseEnter={() => {setBrandName("Java"); setCursorType('brand')}}
                    onMouseLeave={() => {setBrandName(undefined); setCursorType('default')}}
                  >
                    <i className="ci ci-java-vertical ci-3x"></i>
                  </div>
                </a>
                <a target='_blank' href="https://python.org" className="hover:cursor-pointer">
                  <div className="bg-[#1d405d] p-6 size-24 rounded-lg"
                    onMouseEnter={() => {setBrandName("Python"); setCursorType('brand')}}
                    onMouseLeave={() => {setBrandName(undefined); setCursorType('default')}}
                  >
                    <i className="ci ci-python ci-3x"></i>
                  </div>
                </a>
                <a target='_blank' href="https://devdocs.io/c/" className="hover:cursor-pointer">
                  <div className="bg-[#222222] p-6 size-24 rounded-lg"
                    onMouseEnter={() => {setBrandName("C"); setCursorType('brand')}}
                    onMouseLeave={() => {setBrandName(undefined); setCursorType('default')}}
                  >
                    <i className="ci ci-c ci-3x"></i>
                  </div>
                </a>
                <a target='_blank' href="https://git-scm.com/" className="hover:cursor-pointer">
                  <div className="bg-[#f0f0e8] p-6 size-24 rounded-lg"
                    onMouseEnter={() => {setBrandName("Git"); setCursorType('brand')}}  
                    onMouseLeave={() => {setBrandName(undefined); setCursorType('default')}}
                  >
                    <i className="ci ci-git ci-3x"></i>
                  </div>
                </a>
                <a target='_blank' href="https://typescriptlang.org/" className="hover:cursor-pointer">
                  <div className="bg-[#3178c6] p-6 size-24 rounded-lg"
                    onMouseEnter={() => {setBrandName("TypeScript"); setCursorType('brand')}}  
                    onMouseLeave={() => {setBrandName(undefined); setCursorType('default')}}
                  >
                    <SiTypescript className="size-12 text-white"/>
                  </div>
                </a>
                <a target='_blank' href="https://tailwindcss.com/" className="hover:cursor-pointer">
                  <div className="bg-[#0f172a] p-6 size-24 rounded-lg"
                    onMouseEnter={() => {setBrandName("TailwindCSS"); setCursorType('brand')}} 
                    onMouseLeave={() => {setBrandName(undefined); setCursorType('default')}}
                  >
                    <RiTailwindCssFill className="size-12 text-[#38bdf8]" />
                  </div>
                </a>
                <a target='_blank' href="https://framer.com/motion/" className="hover:cursor-pointer">
                  <div className="bg-[#1a1a1a] p-6 size-24 rounded-lg"
                    onMouseEnter={() => {setBrandName("Framer Motion"); setCursorType('brand')}} 
                    onMouseLeave={() => {setBrandName(undefined); setCursorType('default')}}
                  >
                    <i className="ci ci-framer-motion ci-3x"></i>
                  </div>
                </a>
                <a target='_blank' href="https://threejs.org/" className="hover:cursor-pointer">
                  <div className="bg-black p-6 size-24 rounded-lg"
                    onMouseEnter={() => {setBrandName("ThreeJS"); setCursorType('brand')}} 
                    onMouseLeave={() => {setBrandName(undefined); setCursorType('default')}}
                  >
                    <SiThreedotjs className="size-12 text-white"/>
                  </div>
                </a>
                <a target='_blank' href="https://react.dev/" className="hover:cursor-pointer">
                  <div className="bg-[#23272f] p-6 size-24 rounded-lg"
                    onMouseEnter={() => {setBrandName("ReactJS"); setCursorType('brand')}} 
                    onMouseLeave={() => {setBrandName(undefined); setCursorType('default')}}
                  >
                    <SiReact className="size-12 text-[#58c4dc]" />
                  </div>
                </a>
                <a target='_blank' href="https://nextjs.org/" className="hover:cursor-pointer">
                  <div className="bg-white p-6 size-24 rounded-lg"
                    onMouseEnter={() => {setBrandName("NextJS"); setCursorType('brand')}} 
                    onMouseLeave={() => {setBrandName(undefined); setCursorType('default')}}
                  >
                    <i className="ci ci-nextjs-light ci-3x"></i>
                  </div>
                </a>
                <a target='_blank' href="https://djangoproject.com" className="hover:cursor-pointer">
                  <div className="bg-[#0c4b33] p-6 size-24 rounded-lg"
                    onMouseEnter={() => {setBrandName("Django"); setCursorType('brand')}} 
                    onMouseLeave={() => {setBrandName(undefined); setCursorType('default')}}
                  >
                    <i className="ci ci-django ci-3x"></i>
                  </div>
                </a>
          </div>
          <div className="w-2/4 h-2 rounded-[4px] mx-auto bg-black/25 sm:hidden -mb-6">
            <motion.div className="h-2 w-2/4 rounded-[4px] bg-black/25" style={{ x: translateX }}>
            </motion.div>
          </div>
        </div>
      </section>
      <section id="projects" data-observe className="scroll-mt-[60px] flex flex-col justify-center items-center w-screen py-7 md:my-14 px-4 space-y-2">
        <div className="flex gap-1.5">
          <motion.a target='_blank' href="https://github.com/Waamer"
            className="group bg-black/10 backdrop-blur-lg border-2 ml-1 border-black/10 p-2 rounded-lg"
            whileHover={{
              scale: 1.175,
              rotate: 3,
              backgroundColor: "#2A9D8F",
              transition: { duration: 0.2 }
            }}
          >
            <FaGithub
              className="size-6 md:size-7 text-[#FFFFF0]"
              onMouseEnter={() => {setCursorType('clickable')}} 
              onMouseLeave={() => {setCursorType('default')}}
            />
          </motion.a>
          <motion.a target='_blank' href="https://www.linkedin.com/in/waleed-aamer-866722245"
            className="bg-black/10 backdrop-blur-lg border-2 border-black/10 p-2 rounded-lg"
            whileHover={{
              scale: 1.175,
              rotate: -3,
              backgroundColor: "#0077B5",
              transition: { duration: 0.2 }
            }}
          >
            <FaLinkedin
              className="size-6 md:size-7 text-[#FFFFF0]"
              onMouseEnter={() => {setCursorType('clickable')}} 
              onMouseLeave={() => {setCursorType('default')}}
            />
          </motion.a>
          <motion.a target='_blank' href='mailto:waamer1a@gmail.com'
            className="bg-black/10 backdrop-blur-lg border-2 border-black/10 p-2 rounded-lg"
            whileHover={{
              scale: 1.175,
              rotate: 3,
              backgroundColor: "#EA4335",
              transition: { duration: 0.2 }
            }}
          >
            <MdEmail
              className="size-[26px] md:size-[30px] text-[#FFFFF0]"
              onMouseEnter={() => {setCursorType('clickable')}} 
              onMouseLeave={() => {setCursorType('default')}}
            />
          </motion.a>
        </div>
        <div className="grid max-w-6xl md:grid-cols-2 gap-3">
          <div className="group bg-black/10 backdrop-blur-lg border-2 border-black/10 hover:bg-[#2A9D8F]/30 p-4 rounded-lg flex flex-col sm:flex-row-reverse gap-2.5 transition-all duration-200">
            <div>
              <h1 className="text-xl font-medium text-[#FFFFF0] group-hover:text-[#80FFDB] transition-all duration-200 flex gap-1 items-center">
                LMMA Website
                <LuConstruction className="size-5 -mt-0.5" />
                <p className="mx-auto text-xs lg:hidden">In Progress</p>
              </h1>
              <p className="leading-tight text-[#FFFFF0]">Built for London Muslim Mosque, LMMA is a muslim metramonial matching Django web app. I was the lead Front End dev (but still did some Back End development) of the project, as a volunteer.</p>
              <div className="flex flex-wrap gap-1.5 mt-1">
                <p className="text-[#80FFDB] bg-[#2A9D8F]/40 py-1 px-2 text-sm font-medium rounded-md w-fit">Django</p>
                <p className="text-[#80FFDB] bg-[#2A9D8F]/40 py-1 px-2 text-sm font-medium rounded-md w-fit">TailwindCSS</p>
                <p className="text-[#80FFDB] bg-[#2A9D8F]/40 py-1 px-2 text-sm font-medium rounded-md w-fit">Python</p>
                <p className="text-[#80FFDB] bg-[#2A9D8F]/40 py-1 px-2 text-sm font-medium rounded-md w-fit">SQLite3</p>
              </div>
            </div>
            <div>
            <Image 
              alt={'LMMA screenshot'}
              src={'/LMMA.png'}
              width={200}
              height={200}
              className="w-full min-w-[140px] h-auto rounded-md border-2 border-black group-hover:border-[#2A9D8F]/40 transition-all duration-200"
            />
            </div>
            <div
              className="opacity-0 hidden lg:block group-hover:opacity-100 absolute w-full inset-0 h-fit my-auto text-center text-[#FFFFF0] text-xl font-medium border-y-2 border-[#2A9D8F] p-4 transition-all duration-200"
              style={{'background': 'repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85) 33px, rgba(42, 157, 143, 0.9) 33px, rgba(42, 157, 143, 0.9) 70px)'}}
            >
              IN PROGRESS
            </div>
          </div>
          <a target='_blank' href="https://note-bud.vercel.app/">
            <div
              className="group bg-black/10 backdrop-blur-lg border-2 border-black/10 hover:bg-[#2A9D8F]/30 cursor-pointer p-4 rounded-lg flex flex-col sm:flex-row-reverse gap-2.5 transition-all duration-200"
              onMouseEnter={() => {setBrandName("NoteBud"); setCursorType('brand')}} 
              onMouseLeave={() => {setBrandName(undefined); setCursorType('default')}}
            >
              <div>
                <h1 className="text-xl font-medium text-[#FFFFF0] group-hover:text-[#80FFDB] transition-all duration-200 flex gap-1 items-center">
                  NoteBud
                  <LuExternalLink className="group-hover:size-[19px] group-hover:text-[#80FFDB] size-4 -mt-0.5 transition-all duration-200" />
                </h1>
                <p className="leading-tight text-[#FFFFF0]">NoteBud is a NextJS web app with a Convex backend; developed for managing documents and notes with loads of features (spoiler: includes 2 AI features)</p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  <p className="text-[#80FFDB] bg-[#2A9D8F]/40 py-1 px-2 text-sm font-medium rounded-md w-fit">NextJS</p>
                  <p className="text-[#80FFDB] bg-[#2A9D8F]/40 py-1 px-2 text-sm font-medium rounded-md w-fit">ReactJS</p>
                  <p className="text-[#80FFDB] bg-[#2A9D8F]/40 py-1 px-2 text-sm font-medium rounded-md w-fit">TypeScript</p>
                  <p className="text-[#80FFDB] bg-[#2A9D8F]/40 py-1 px-2 text-sm font-medium rounded-md w-fit">TailwindCSS</p>
                  <p className="text-[#80FFDB] bg-[#2A9D8F]/40 py-1 px-2 text-sm font-medium rounded-md w-fit">Shadcn UI</p>
                  <p className="text-[#80FFDB] bg-[#2A9D8F]/40 py-1 px-2 text-sm font-medium rounded-md w-fit">Convex</p>
                  <p className="text-[#80FFDB] bg-[#2A9D8F]/40 py-1 px-2 text-sm font-medium rounded-md w-fit">Clerk</p>
                  <p className="text-[#80FFDB] bg-[#2A9D8F]/40 py-1 px-2 text-sm font-medium rounded-md w-fit">OpenAI(ChatGPT API)</p>
                  <p className="text-[#80FFDB] bg-[#2A9D8F]/40 py-1 px-2 text-sm font-medium rounded-md w-fit">Tiptap</p>
                </div>
              </div>
              <div>
                <Image 
                  alt={'NoteBud screenshot'}
                  src={'/NoteBud.png'}
                  width={200}
                  height={200}
                  className="w-full min-w-[140px] h-auto rounded-md border-2 border-black group-hover:border-[#2A9D8F]/40 transition-all duration-200"
                />
              </div>
            </div>
          </a>
          <a target='_blank' href="https://github.com/Waamer/WordQuack" className="h-full">
            <div
              className="group h-full bg-black/10 backdrop-blur-lg border-2 border-black/10 hover:bg-[#2A9D8F]/30 cursor-pointer p-4 rounded-lg flex flex-col sm:flex-row-reverse gap-2.5 transition-all duration-200"
              onMouseEnter={() => {setBrandName("WordQuack"); setCursorType('brand')}}
              onMouseLeave={() => {setBrandName(undefined); setCursorType('default')}}
            >
              <div>
                <h1 className="text-xl font-medium text-[#FFFFF0] group-hover:text-[#80FFDB] transition-all duration-200 flex gap-1 items-center">
                  WordQuack
                  <LuExternalLink className="group-hover:size-[19px] group-hover:text-[#80FFDB] size-4 -mt-0.5 transition-all duration-200" />
                </h1>
                <p className="leading-tight text-[#FFFFF0]">WordQuack is an JavaFX educational game intended for students of grade 1-6 in which they further enhance their vocabulary and spelling, made with peer CS students (Credits in GitHub)</p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  <p className="text-[#80FFDB] bg-[#2A9D8F]/40 py-1 px-2 text-sm font-medium rounded-md w-fit">JavaFX</p>
                  <p className="text-[#80FFDB] bg-[#2A9D8F]/40 py-1 px-2 text-sm font-medium rounded-md w-fit">MaterialFX</p>
                  <p className="text-[#80FFDB] bg-[#2A9D8F]/40 py-1 px-2 text-sm font-medium rounded-md w-fit">Atlassian Suite</p>
                  <p className="text-[#80FFDB] bg-[#2A9D8F]/40 py-1 px-2 text-sm font-medium rounded-md w-fit">Balsamic</p>
                  <p className="text-[#80FFDB] bg-[#2A9D8F]/40 py-1 px-2 text-sm font-medium rounded-md w-fit">Git</p>
                  <p className="text-[#80FFDB] bg-[#2A9D8F]/40 py-1 px-2 text-sm font-medium rounded-md w-fit">Team Management</p>
                </div>
              </div>
              <div>
                <Image 
                  alt={'WordQuck logo'}
                  src={'/WordQuack.png'}
                  width={200}
                  height={200}
                  className="w-full min-w-[140px] h-auto rounded-md border-2 border-black group-hover:border-[#2A9D8F]/40 transition-all duration-200"
                />
              </div>
            </div>
          </a>
          <a target='_blank' href="https://github.com/Waamer/PortfolioWebsite">
            <div
              className="group bg-black/10 backdrop-blur-lg border-2 border-black/10 hover:bg-[#2A9D8F]/30 cursor-pointer p-4 rounded-lg flex flex-col sm:flex-row-reverse gap-2.5 transition-all duration-200"
              onMouseEnter={() => {setBrandName("Website's Code"); setCursorType('brand')}}
              onMouseLeave={() => {setBrandName(undefined); setCursorType('default')}}
            >
              <div>
                <h1 className="text-xl font-medium text-[#FFFFF0] group-hover:text-[#80FFDB] transition-all duration-200 flex gap-1 items-center">
                  My Portfolio Website
                  <LuExternalLink className="group-hover:size-[19px] group-hover:text-[#80FFDB] size-4 -mt-0.5 transition-all duration-200" />
                </h1>
                <p className="leading-tight text-[#FFFFF0]">My portfolio website (where you are reading this from!) where I experimented and expanded my creativity in different technologies I have intersets in</p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  <p className="text-[#80FFDB] bg-[#2A9D8F]/40 py-1 px-2 text-sm font-medium rounded-md w-fit">NextJS</p>
                  <p className="text-[#80FFDB] bg-[#2A9D8F]/40 py-1 px-2 text-sm font-medium rounded-md w-fit">ReactJS</p>
                  <p className="text-[#80FFDB] bg-[#2A9D8F]/40 py-1 px-2 text-sm font-medium rounded-md w-fit">TypeScript</p>
                  <p className="text-[#80FFDB] bg-[#2A9D8F]/40 py-1 px-2 text-sm font-medium rounded-md w-fit">TailwindCSS</p>
                  <p className="text-[#80FFDB] bg-[#2A9D8F]/40 py-1 px-2 text-sm font-medium rounded-md w-fit">Framer Motion</p>
                  <p className="text-[#80FFDB] bg-[#2A9D8F]/40 py-1 px-2 text-sm font-medium rounded-md w-fit">ThreeJS/React Three Fiber</p>
                  <p className="text-[#80FFDB] bg-[#2A9D8F]/40 py-1 px-2 text-sm font-medium rounded-md w-fit">Open AI(Whisper/ChatGPT APIs)</p>
                  <p className="text-[#80FFDB] bg-[#2A9D8F]/40 py-1 px-2 text-sm font-medium rounded-md w-fit">Google TTS API</p>
                </div>
              </div>
              <div>
                <Image 
                  alt={'Portfolio website screenshot'}
                  src={'/ThisWebsite.png'}
                  width={200}
                  height={200}
                  className="w-full min-w-[140px] h-auto rounded-md border-2 border-black group-hover:border-[#2A9D8F]/40 transition-all duration-200"
                />
              </div>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
}

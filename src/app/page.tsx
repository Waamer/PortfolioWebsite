import { Assistant } from "../components/AI-Assistant/assistant";
import { Background } from "./background";
import { LoadingScreen } from "./loading-screen";
import { Navbar } from "./navbar";
import { TextFade } from "../components/text-fader";
import { DisplayModel } from "@/components/DisplayModel";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Background />
      <Navbar />
      <section
        id="home"
        className="w-screen h-screen flex flex-col justify-start items-center px-4"
        style={{ height: `calc(100dvh - var(--navbar-height))` }}
      >
        <div >
          <h1 className="text-6xl sm:text-7xl font-medium text-[#E9C46A]">Hi! I&apos;m Waleed Aamer.</h1>
          <TextFade />
          <Assistant />
        </div>
        <DisplayModel />
      </section>
      <section id="about" className="flex flex-col justify-center items-center h-screen w-screen ">
        
      </section>
    </>
  );
}

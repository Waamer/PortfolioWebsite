import { Assistant } from "./AI-Assistant/assistant";
import { Background } from "./background";
import { LoadingScreen } from "./loading-screen";
import { Navbar } from "./navbar"
import { TextFade } from "./text-fader";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Background />
      <Navbar />
      <section id="about" className="flex flex-col justify-center items-center md:flex-row mx-4 ">
        <div>
          <h1 className="text-6xl sm:text-7xl font-medium text-[#E9C46A]">Hi! I&apos;m Waleed Aamer</h1>
          <TextFade />
          <Assistant />
        </div>
      </section>
    </>
  );
}

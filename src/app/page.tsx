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
      <section id="home" className="flex flex-col justify-center items-center mx-4">
        <div className="md:mt-4">
          <h1 className="text-6xl sm:text-7xl font-medium text-[#E9C46A]">Hi! I&apos;m Waleed Aamer</h1>
          <TextFade />
          <Assistant />
        </div>
        <DisplayModel />
      </section>
      <section id="about" className="flex flex-col justify-center items-center mx-4 -mt-[20vh]">
        <h1>About</h1>
      </section>
    </>
  );
}

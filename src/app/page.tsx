import { Background } from "./background";
import { LoadingScreen } from "./loading-screen";
import { Navbar } from "./navbar"

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Background />
      <Navbar />
      <section id="about" className="flex flex-col md:flex-row mx-4 ">
        
      </section>
    </>
  );
}

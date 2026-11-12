import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useGSAP } from "@gsap/react";
import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import Dock from "./components/Dock";
import Terminal from "./windows/Terminal";

gsap.registerPlugin(Draggable, useGSAP);

export default function App() {
  return (
    <main>
      <Navbar/>
      <Welcome/>
      <Dock/>

      <Terminal/>
    </main>
  )
}

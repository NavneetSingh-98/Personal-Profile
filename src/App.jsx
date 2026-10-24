import {useEffect,useState} from "react";
import {AnimatePresence} from "framer-motion";
import useGithub from "./hooks/useGithub";
import Particles from "./components/Particles";
import Intro from "./components/Intro";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import GitHub from "./components/GitHub";
import Contact from "./components/Contact";


export default function App(){
  const [intro,setIntro]=useState(true);
  const [dark,setDark]=useState(()=>{const s=localStorage.getItem("theme");return s?s==="dark":matchMedia("(prefers-color-scheme: dark)").matches;});
  const gh=useGithub();
  useEffect(()=>{document.documentElement.dataset.theme=dark?"dark":"light";localStorage.setItem("theme",dark?"dark":"light");},[dark]);
  useEffect(()=>{document.body.style.overflow=intro?"hidden":"";},[intro]);
  return(<>
    <AnimatePresence>{intro&&<Intro done={()=>setIntro(false)}/>}</AnimatePresence>
    <Particles/>
    <Navbar dark={dark} setDark={setDark}/>
    <main><Hero/><About/><Education/><Skills/><Projects gh={gh}/><GitHub gh={gh} dark={dark}/><Contact/></main>
    <footer className="mut">© {new Date().getFullYear()} Navneet. Built with React and Framer Motion.</footer>
  </>);
}

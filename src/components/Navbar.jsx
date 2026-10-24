import {useEffect,useState} from "react";
import {motion,AnimatePresence,useScroll,useSpring} from "framer-motion";
import {nav,RESUME,GITHUB_USERNAME} from "../config";

export default function Navbar({dark,setDark}){
  const [active,setActive]=useState("Home");
  const [open,setOpen]=useState(false);
  const {scrollYProgress}=useScroll();
  const sx=useSpring(scrollYProgress,{stiffness:120,damping:25});
  useEffect(()=>{
    const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&setActive(e.target.dataset.n)),{rootMargin:"-45% 0px -50% 0px"});
    document.querySelectorAll("section[data-n]").forEach(el=>io.observe(el));
    return()=>io.disconnect();
  },[]);
  return(<>
    <motion.div className="bar" style={{scaleX:sx}}/>
    <div className="navwrap"><motion.nav initial={{y:-80,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:.2,type:"spring",stiffness:90}}>
      <a href="#home" className="logo" aria-label="Home"><img src={`https://github.com/${GITHUB_USERNAME}.png?size=96`} alt="Navneet profile" width="38" height="38"/></a>
      <div className={"links"+(open?" open":"")}>
        {nav.map(n=>(
          <a key={n} href={"#"+n.toLowerCase()} className={active===n?"on":""} onClick={()=>setOpen(false)}>
            {active===n&&<motion.span layoutId="pill" className="pill" transition={{type:"spring",stiffness:350,damping:30}}/>}{n}
          </a>))}
        <a className="btn menu-resume" href={RESUME} download="Navneet_Resume.pdf" onClick={()=>setOpen(false)}>Download resume</a>
      </div>
      <div className="tools">
        <a className="btn sm ghost rs" href={RESUME} download="Navneet_Resume.pdf">Resume</a>
        <button className="ico" aria-label="Toggle theme" onClick={()=>setDark(!dark)}>
          <AnimatePresence mode="wait"><motion.span key={dark?"d":"l"} initial={{rotate:-90,scale:0}} animate={{rotate:0,scale:1}} exit={{rotate:90,scale:0}} transition={{duration:.2}}>{dark?"☀":"☾"}</motion.span></AnimatePresence>
        </button>
        <button className="ico burger" aria-label="Menu" onClick={()=>setOpen(!open)}>{open?"✕":"☰"}</button>
      </div>
    </motion.nav></div>
  </>);
}

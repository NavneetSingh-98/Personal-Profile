import {useEffect,useState} from "react";
import {motion,AnimatePresence,useScroll,useSpring} from "framer-motion";
import {roles,RESUME} from "../config";

export default function Hero(){
  const [r,setR]=useState(0);
  useEffect(()=>{const t=setInterval(()=>setR(x=>(x+1)%roles.length),2400);return()=>clearInterval(t)},[]);
  return(
    <section id="home" data-n="Home" className="hero" style={{padding:"6rem 0 3rem"}}>
      <motion.div className="blob" style={{width:380,height:380,background:"var(--ac)",top:"8%",right:"-6%"}} animate={{x:[0,-60,0],y:[0,50,0]}} transition={{duration:14,repeat:Infinity}}/>
      <motion.div className="blob" style={{width:320,height:320,background:"var(--ac2)",bottom:"5%",left:"-8%"}} animate={{x:[0,70,0],y:[0,-40,0]}} transition={{duration:16,repeat:Infinity}}/>
      <div className="wrap">
        <motion.p className="mut" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.9}}>Hi, I'm</motion.p>
        <h1 aria-label="Navneet">
          {"Navneet".split("").map((c,i)=>(
            <motion.span key={i} initial={{y:"110%",rotate:8,opacity:0}} animate={{y:0,rotate:0,opacity:1}} transition={{delay:1.9+i*.07,type:"spring",stiffness:140,damping:14}} whileHover={{y:-14,color:"var(--ac)"}}>{c}</motion.span>))}
        </h1>
        <div className="role"><AnimatePresence mode="wait"><motion.span key={r} style={{display:"inline-block"}} initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} exit={{y:-20,opacity:0}} transition={{duration:.3}}>{roles[r]}</motion.span></AnimatePresence></div>
        <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:2.5}}>I build fast, accessible web apps and care about the small details that make them feel good to use.</motion.p>
        <motion.div className="cta" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:2.7}}>
          <a className="btn" href="#projects">View my work</a>
          <a className="btn ghost" href={RESUME} download="Navneet_Resume.pdf">Download resume</a>
        </motion.div>
      </div>
    </section>);
}

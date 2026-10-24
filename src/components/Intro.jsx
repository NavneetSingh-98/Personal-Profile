import {useEffect,useState} from "react";
import {motion,AnimatePresence,useScroll,useSpring} from "framer-motion";
import {hellos} from "../config";

export default function Intro({done}){
  const [i,setI]=useState(0);
  useEffect(()=>{
    const t=setTimeout(()=>i>=hellos.length-1?done():setI(i+1),i===0?600:330);
    return()=>clearTimeout(t);
  },[i]);
  return(
    <motion.div className="intro" exit={{y:"-100%",borderBottomLeftRadius:"50%",borderBottomRightRadius:"50%"}} transition={{duration:.9,ease:[.76,0,.24,1]}}>
      <AnimatePresence mode="wait">
        <motion.h1 key={i} initial={{opacity:0,y:28,filter:"blur(10px)"}} animate={{opacity:1,y:0,filter:"blur(0px)"}} exit={{opacity:0,y:-28,filter:"blur(10px)"}} transition={{duration:.22}}>
          <span className="dot"/>{hellos[i]}
        </motion.h1>
      </AnimatePresence>
    </motion.div>
  );
}

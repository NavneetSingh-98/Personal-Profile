import {useRef} from "react";
import {motion,useScroll,useSpring} from "framer-motion";
import Reveal from "./Reveal";
import {education} from "../config";

export default function Education(){
  const ref=useRef(null);
  const {scrollYProgress}=useScroll({target:ref,offset:["start 75%","end 65%"]});
  const grow=useSpring(scrollYProgress,{stiffness:90,damping:25});
  return(<section id="education" data-n="Education"><div className="wrap">
    <Reveal><h2>Education</h2></Reveal>
    <div className="tl" ref={ref}>
      <div className="tl-line"><motion.div className="tl-fill" style={{scaleY:grow}}/></div>
      {education.map((e,i)=>(
        <div className="tl-item" key={e.degree}>
          <motion.span className="tl-dot" initial={{scale:0}} whileInView={{scale:1}} viewport={{once:true,margin:"-80px"}} transition={{type:"spring",stiffness:260,damping:14,delay:.1}}/>
          <motion.div className="card tl-card" initial={{opacity:0,x:40}} whileInView={{opacity:1,x:0}} viewport={{once:true,margin:"-80px"}} transition={{duration:.6,delay:i*.05}} whileHover={{y:-4}}>
            <span className="tag">{e.period}</span>
            <h3>{e.degree}</h3>
            <p className="school">{e.school}</p>
            <p className="mut">{e.note}</p>
          </motion.div>
        </div>))}
    </div>
  </div></section>);
}

import {motion} from "framer-motion";
import Reveal from "./Reveal";
import {skills} from "../config";

export default function Skills(){
  return(<section id="skills" data-n="Skills"><div className="wrap">
    <Reveal><h2>Skills</h2></Reveal>
    <div className="grid">
      {skills.map((s,i)=>(
        <Reveal key={s.name} delay={i*.06}>
          <motion.div className="card skillcard" whileHover={{y:-6}}>
            <div className="sk-top"><span className="sk-icon" aria-hidden="true">{s.icon}</span><span className="sk-pct">{s.level}%</span></div>
            <h3>{s.name}</h3>
            <p className="mut">{s.note}</p>  
            <div className="track"><motion.div className="fill" initial={{width:0}} whileInView={{width:s.level+"%"}} viewport={{once:true}} transition={{duration:1,delay:.2+i*.06,ease:"easeOut"}}/></div>
          </motion.div>
        </Reveal>))}
    </div></div></section>);
}

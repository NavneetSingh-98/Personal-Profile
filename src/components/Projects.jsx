import {motion} from "framer-motion";
import Reveal from "./Reveal";
import {FEATURED} from "../config";

export default function Projects({gh}){
  return(<section id="projects" data-n="Projects"><div className="wrap">
    <Reveal><h2>My projects</h2></Reveal>
    <div className="grid" style={{gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,300px),1fr))"}}>
      {FEATURED.map((p,i)=>{
        const live=gh.r&&gh.r.find(x=>x.name===p.name);
        return(<Reveal key={p.name} delay={i*.12}><motion.div className="card proj" whileHover={{y:-6}}>
          <h3>{p.title}</h3>
          <p className="mut">{p.desc}</p>
          <div className="tags">{p.tags.map(t=><span className="tag" key={t}>{t}</span>)}{live&&<span className="tag">★ {live.stargazers_count}</span>}</div>
          <div style={{display:"flex",gap:".5rem",flexWrap:"wrap"}}>
            <a className="btn sm" href={p.url} target="_blank" rel="noreferrer">Source code</a>
            {live&&live.homepage&&<a className="btn sm ghost" href={live.homepage} target="_blank" rel="noreferrer">Live demo</a>}
          </div>
        </motion.div></Reveal>);})}
    </div></div></section>);
}

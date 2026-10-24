import Reveal from "./Reveal";

export default function About(){
  return(<section id="about" data-n="About"><div className="wrap">
    <Reveal><h2>About me</h2></Reveal>
    <div className="about">
      <Reveal><p>I'm Navneet, a developer who enjoys turning ideas into clean, working products. I work with Java and React, and I like learning by building real projects and sharing them on GitHub.</p>
      <p className="mut" style={{marginTop:"1rem"}}>When I'm not coding, I'm exploring new tools, reading about design, and improving my problem-solving skills.</p></Reveal>
      <Reveal delay={.1}><div className="grid" style={{gridTemplateColumns:"1fr 1fr"}}>
        {[["100+","Java challenges"],["2","Featured projects"],["100%","Curiosity"],["∞","Cups of chai"]].map(([a,b])=>(
          <div className="card" key={b}><div className="stat">{a}</div><div className="mut">{b}</div></div>))}
      </div></Reveal>
    </div></div></section>);
}

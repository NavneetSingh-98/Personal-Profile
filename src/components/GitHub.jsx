import {useMemo} from "react";
import {motion} from "framer-motion";
import Reveal from "./Reveal";
import {langColor} from "../config";

function evText(e){
  const r=e.repo.name.split("/")[1],pl=e.payload||{};
  switch(e.type){
    case"PushEvent":{const n=pl.size||(pl.commits&&pl.commits.length)||1;return `Pushed ${n} commit${n>1?"s":""} to ${r}`;}
    case"CreateEvent":return `Created ${pl.ref_type} ${pl.ref||r}`;
    case"WatchEvent":return `Starred ${e.repo.name}`;
    case"ForkEvent":return `Forked ${e.repo.name}`;
    case"IssuesEvent":return `${pl.action} an issue in ${r}`;
    case"PullRequestEvent":return `${pl.action} a pull request in ${r}`;
    default:return e.type.replace("Event","")+" in "+r;
  }
}

export default function GitHub({gh,dark}){
  const {u,r}=gh;
  const stats=useMemo(()=>{
    if(!r) return null;
    const stars=r.reduce((a,x)=>a+x.stargazers_count,0);
    const count={};r.forEach(x=>x.language&&(count[x.language]=(count[x.language]||0)+1));
    const total=Object.values(count).reduce((a,b)=>a+b,0)||1;
    const langs=Object.entries(count).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([n,c])=>({n,pct:Math.round(c/total*100)}));
    return {stars,langs,recent:r.slice(0,4)};
  },[r]);
  return(<section id="github" data-n="GitHub"><div className="wrap">
    <Reveal><h2>GitHub</h2></Reveal>
    {gh.loading&&<p className="mut">Fetching live data…</p>}
    {gh.err&&<p className="mut">Live data unavailable right now. GitHub's API may be rate-limited; try again in a few minutes.</p>}
    {u&&stats&&<>
      <Reveal><div className="card profile">
        <img className="av" src={u.avatar_url} alt="GitHub avatar"/>
        <div style={{flex:1,minWidth:200}}><h3>{u.name||u.login}</h3><p className="mut">@{u.login}</p></div>
        <a className="btn sm" href={u.html_url} target="_blank" rel="noreferrer">Follow</a>
      </div></Reveal>
      <div className="grid" style={{margin:"1.1rem 0",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))"}}>
        {[["Repos",u.public_repos],["Followers",u.followers],["Following",u.following],["Total stars",stats.stars]].map(([a,b],i)=>(
          <Reveal key={a} delay={i*.07}><div className="card"><div className="stat">{b}</div><div className="mut">{a}</div></div></Reveal>))}
      </div>
      <Reveal><div className="card" style={{marginBottom:"1.1rem"}}>
        <h3 style={{fontSize:"1.1rem"}}>Top languages</h3>
        <div className="langs">{stats.langs.map(l=><motion.div key={l.n} initial={{width:0}} whileInView={{width:l.pct+"%"}} viewport={{once:true}} transition={{duration:1}} style={{background:langColor[l.n]||"var(--ac2)"}}/>)}</div>
        <div className="tags">{stats.langs.map(l=><span className="tag" key={l.n}>{l.n} {l.pct}%</span>)}</div>
      </div></Reveal>
      <Reveal><div className="card" style={{marginBottom:"1.1rem"}}>
        <h3 style={{fontSize:"1.1rem",marginBottom:".8rem"}}>Contribution activity</h3>
        <div className="chart"><img src={`https://ghchart.rshah.org/${dark?"4FD1C5":"0E7C7B"}/${u.login}`} alt="GitHub contribution graph" loading="lazy"/></div>
      </div></Reveal>
      <div className="grid">
        {stats.recent.map((p,i)=>(
          <Reveal key={p.id} delay={i*.06}><a href={p.html_url} target="_blank" rel="noreferrer" className="card" style={{display:"block"}}>
            <h3 style={{fontSize:"1.05rem"}}>{p.name}</h3>
            <p className="mut" style={{fontSize:".9rem"}}>Updated {new Date(p.pushed_at).toLocaleDateString()}</p>
          </a></Reveal>))}
      </div>
      <Reveal><div className="card" style={{marginTop:"1.1rem"}}>
        <h3 style={{fontSize:"1.1rem",marginBottom:".6rem"}}>Recent activity</h3>
        {gh.ev&&gh.ev.length?gh.ev.slice(0,8).map(e=>(
          <div className="act" key={e.id}><span>{evText(e)}</span><span className="mut">{new Date(e.created_at).toLocaleDateString()}</span></div>))
          :<p className="mut">No public activity in the last 90 days.</p>}
      </div></Reveal>
    </>}
  </div></section>);
}

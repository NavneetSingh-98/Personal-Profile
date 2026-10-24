import {useEffect,useRef} from "react";

export default function Particles(){
  const ref=useRef(null);
  useEffect(()=>{
    if(matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const c=ref.current,x=c.getContext("2d"),dpr=Math.min(devicePixelRatio||1,2);
    let w,h,raf,ps=[],frame=0,cols=["#0E7C7B","#E8590C"];
    const mouse={x:-999,y:-999};
    const readColors=()=>{const st=getComputedStyle(document.documentElement);cols=[st.getPropertyValue("--ac2").trim(),st.getPropertyValue("--ac").trim()];};
    const resize=()=>{
      w=innerWidth;h=innerHeight;c.width=w*dpr;c.height=h*dpr;c.style.width=w+"px";c.style.height=h+"px";x.setTransform(dpr,0,0,dpr,0,0);
      const n=Math.min(90,Math.floor(w*h/15000));
      ps=Array.from({length:n},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.5,vy:(Math.random()-.5)*.5,r:Math.random()*1.8+.8,k:Math.random()<.75?0:1}));
    };
    const move=e=>{mouse.x=e.clientX;mouse.y=e.clientY;};
    const leave=()=>{mouse.x=mouse.y=-999;};
    const loop=()=>{
      if(frame++%30===0) readColors();
      x.clearRect(0,0,w,h);
      for(const p of ps){
        const dx=p.x-mouse.x,dy=p.y-mouse.y,d=Math.hypot(dx,dy);
        if(d<120){p.vx+=dx/d*.05;p.vy+=dy/d*.05;}
        p.vx*=.995;p.vy*=.995;
        const sp=Math.hypot(p.vx,p.vy);if(sp>1.2){p.vx*=1.2/sp;p.vy*=1.2/sp;}
        p.x+=p.vx;p.y+=p.vy;
        if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;
      }
      for(let i=0;i<ps.length;i++){
        const a=ps[i];
        x.globalAlpha=.55;x.fillStyle=cols[a.k];x.beginPath();x.arc(a.x,a.y,a.r,0,6.283);x.fill();
        for(let j=i+1;j<ps.length;j++){
          const b=ps[j],d=Math.hypot(a.x-b.x,a.y-b.y);
          if(d<110){x.globalAlpha=(1-d/110)*.22;x.strokeStyle=cols[0];x.lineWidth=1;x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.stroke();}
        }
        const dm=Math.hypot(a.x-mouse.x,a.y-mouse.y);
        if(dm<150){x.globalAlpha=(1-dm/150)*.4;x.strokeStyle=cols[1];x.beginPath();x.moveTo(a.x,a.y);x.lineTo(mouse.x,mouse.y);x.stroke();}
      }
      raf=requestAnimationFrame(loop);
    };
    readColors();resize();loop();
    addEventListener("resize",resize);addEventListener("mousemove",move);addEventListener("mouseout",leave);
    return()=>{cancelAnimationFrame(raf);removeEventListener("resize",resize);removeEventListener("mousemove",move);removeEventListener("mouseout",leave);};
  },[]);
  return <canvas ref={ref} className="particles" aria-hidden="true"/>;
}

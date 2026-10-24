import {useState} from "react";
import {motion} from "framer-motion";
import Reveal from "./Reveal";
import {WEB3FORMS_KEY} from "../config";

export default function Contact(){
  const [status,setStatus]=useState("idle");
  const submit=async e=>{
    e.preventDefault();
    const form=e.target;
    if(WEB3FORMS_KEY.startsWith("YOUR_")){setStatus("nokey");return;}
    setStatus("sending");
    const f=new FormData(form);
    f.append("access_key",WEB3FORMS_KEY);
    f.append("subject","New message from your portfolio");
    f.append("from_name","Portfolio website");
    try{
      const r=await fetch("https://api.web3forms.com/submit",{method:"POST",body:f});
      const d=await r.json();
      if(d.success){setStatus("ok");form.reset();}else setStatus("error");
    }catch{setStatus("error");}
  };
  const msg={
    ok:"Message sent. I'll get back to you soon.",
    error:"Couldn't send your message. Try again in a moment.",
    nokey:"Add your Web3Forms access key in src/config.js to enable the form."
  }[status];
  return(<section id="contact" data-n="Contact"><div className="wrap">
    <Reveal><h2>Let's work together</h2></Reveal>
    <Reveal><form className="card cform" onSubmit={submit}>
      <input type="checkbox" name="botcheck" style={{display:"none"}} tabIndex="-1" autoComplete="off"/>
      <div className="row2">
        <input name="name" placeholder="Your name" required aria-label="Your name"/>
        <input name="email" type="email" placeholder="name@company.com" required aria-label="Your email"/>
      </div>
      <textarea name="message" rows="5" placeholder="Tell me about your project" required aria-label="Message"/>
      <button className="btn" type="submit" disabled={status==="sending"} style={{justifySelf:"start"}}>{status==="sending"?"Sending…":"Send message"}</button>
      {msg&&<motion.p role="status" className={status==="ok"?"ok":"mut"} initial={{opacity:0,y:6}} animate={{opacity:1,y:0}}>{msg}</motion.p>}
    </form></Reveal>
  </div></section>);
}

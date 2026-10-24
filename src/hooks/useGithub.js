import {useEffect,useState} from "react";
import {GITHUB_USERNAME} from "../config";

export default function useGithub(){
  const [s,setS]=useState({loading:true});
  useEffect(()=>{
    (async()=>{
      try{
        const api=`https://api.github.com/users/${GITHUB_USERNAME}`;
        const [u,r,ev]=await Promise.all([
          fetch(api).then(x=>x.json()),
          fetch(`${api}/repos?per_page=100&sort=updated`).then(x=>x.json()),
          fetch(`${api}/events/public?per_page=15`).then(x=>x.json()).catch(()=>[])]);
        if(!Array.isArray(r)) throw new Error("rate limit or bad username");
        setS({u,r,ev:Array.isArray(ev)?ev:[]});
      }catch(e){setS({err:true});}
    })();
  },[]);
  return s;
}

"use client"

import { useEffect, useState } from "react"

export default function Live(){

 const [matches,setMatches] = useState([])

 useEffect(()=>{

 fetch("/api/live")
 .then(r=>r.json())
 .then(setMatches)

 },[])

 return(

 <div className="p-10">

 <h1 className="text-3xl mb-6">
 Live Matches
 </h1>

 {matches.map(m =>(

 <div key={m.id} className="mb-4">

 {m.name}

 </div>

 ))}

 </div>

 )

}

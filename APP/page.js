"use client"

import { useEffect, useState } from "react"

export default function Home() {

 const [matches,setMatches] = useState([])

 useEffect(()=>{

  async function loadMatches(){

   try{

    const res = await fetch("/api/matches")

    const data = await res.json()

    setMatches(data)

   }catch(e){

    console.log(e)

   }

  }

  loadMatches()

 },[])

 return(

  <main style={{
   background:"#0b0b0b",
   minHeight:"100vh",
   color:"white",
   padding:"40px"
  }}>

   <h1 style={{
    fontSize:"32px",
    fontWeight:"bold",
    marginBottom:"20px"
   }}>
    ⚽ MZ Football AI Predictor
   </h1>

   <p style={{
    color:"#aaa",
    marginBottom:"30px"
   }}>
    Professional football predictions platform
   </p>

   <div style={{
    display:"grid",
    gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
    gap:"20px"
   }}>

   {matches.map(match => (

    <div key={match.id}
     style={{
      background:"#111",
      padding:"20px",
      borderRadius:"10px",
      border:"1px solid #222"
     }}
    >

     <div style={{color:"#888"}}>
      {match.league?.name}
     </div>

     <div style={{
      fontSize:"18px",
      fontWeight:"bold",
      marginTop:"5px"
     }}>
      {match.home} vs {match.away}
     </div>

     <div style={{
      color:"#22c55e",
      marginTop:"10px"
     }}>
      Prediction: {match.prediction || "Analyzing"}
     </div>

    </div>

   ))}

   </div>

  </main>

 )

}

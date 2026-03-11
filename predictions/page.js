"use client"

import { useEffect, useState } from "react"
import MatchCard from "../../components/MatchCard"
import LoadingSpinner from "../../components/LoadingSpinner"

export default function Predictions(){

 const [matches,setMatches] = useState([])
 const [loading,setLoading] = useState(true)

 useEffect(()=>{

  async function loadMatches(){

   const res = await fetch("/api/matches")

   const data = await res.json()

   const predictions = data.map(match => {

    const home = match.participants?.[0]?.name || "Home"
    const away = match.participants?.[1]?.name || "Away"

    const homeAvg = Math.random() * 2
    const awayAvg = Math.random() * 2

    let result = "Draw"

    if(homeAvg > awayAvg){
     result = "Home Win"
    }

    if(homeAvg < awayAvg){
     result = "Away Win"
    }

    const confidence = Math.floor(
      50 + Math.abs(homeAvg - awayAvg) * 20
    )

    return{
     id: match.id,
     league: match.league?.name,
     home: home,
     away: away,
     prediction: result,
     confidence: confidence
    }

   })

   setMatches(predictions)

   setLoading(false)

  }

  loadMatches()

 },[])

 if(loading){

  return <LoadingSpinner/>

 }

 return(

  <div className="p-10">

   <h1 className="text-3xl font-bold mb-6">
    Today AI Predictions
   </h1>

   <div className="grid md:grid-cols-3 gap-6">

   {matches.map(match =>(

    <MatchCard
     key={match.id}
     match={match}
    />

   ))}

   </div>

  </div>

 )

}

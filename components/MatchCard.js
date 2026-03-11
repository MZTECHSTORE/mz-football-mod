export default function MatchCard({match}){

 return(

 <div className="bg-gray-900 p-6 rounded-xl">

 <div className="text-gray-400 text-sm">
 {match.league}
 </div>

 <div className="text-lg font-bold">

 {match.home}

 vs

 {match.away}

 </div>

 <div className="text-green-400 mt-3">

 Prediction: {match.prediction}

 </div>

 <div className="text-yellow-400">

 Confidence: {match.confidence}%

 </div>

 </div>

 )

}

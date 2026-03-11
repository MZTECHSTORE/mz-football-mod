export default function PredictionCard({ prediction }){

 return(

  <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">

   <div className="text-lg font-bold mb-3">
    AI Prediction
   </div>

   <div className="text-green-400">
    Home Win: {prediction.home}%
   </div>

   <div className="text-yellow-400">
    Draw: {prediction.draw}%
   </div>

   <div className="text-blue-400">
    Away Win: {prediction.away}%
   </div>

  </div>

 )

}

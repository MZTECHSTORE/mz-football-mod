export default function Navbar(){

 return(

 <div className="bg-gray-900 p-4 flex justify-between">

 <div className="font-bold">
 MZ Predictor
 </div>

 <div className="space-x-6">

 <a href="/">Home</a>
 <a href="/live">Live</a>
 <a href="/predictions">Predictions</a>

 </div>

 </div>

 )

}

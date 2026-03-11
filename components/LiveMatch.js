export default function LiveMatch({ match }){

 return(

  <div className="bg-gray-900 p-4 rounded-lg border border-red-800">

   <div className="text-red-400 text-sm">
    LIVE
   </div>

   <div className="font-bold">

    {match.home} {match.homeScore}

    -

    {match.awayScore} {match.away}

   </div>

   <div className="text-gray-400 text-sm">
    {match.minute}'
   </div>

  </div>

 )

}

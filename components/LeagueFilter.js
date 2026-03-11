export default function LeagueFilter({ leagues, onSelect }){

 return(

  <select
   className="bg-gray-900 border border-gray-700 p-2 rounded"
   onChange={(e)=>onSelect(e.target.value)}
  >

  <option value="">All Leagues</option>

  {leagues.map(league =>(

   <option key={league.id} value={league.id}>
    {league.name}
   </option>

  ))}

  </select>

 )

}

export async function GET(){

 const res = await fetch(
  `https://api.sportmonks.com/v3/football/livescores/inplay
  ?api_token=${process.env.SPORTMONKS_KEY}
  &include=participants;scores;periods;events;league.country;round`
 )

 const data = await res.json()

 return Response.json(data.data)

}

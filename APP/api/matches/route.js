export async function GET(){

 const res = await fetch(
  `https://api.sportmonks.com/v3/football/fixtures/date/2026-03-05
   ?api_token=${process.env.SPORTMONKS_KEY}
   &include=participants;statistics;league`
 )

 const data = await res.json()

 return Response.json(data.data)

}

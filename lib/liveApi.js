const API = "https://api.sportmonks.com/v3/football"

const TOKEN = process.env.SPORTMONKS_KEY

export async function getLiveMatches(){

 const url = `${API}/livescores/inplay
 ?api_token=${TOKEN}
 &include=participants;scores;periods;events;league.country;round`

 const res = await fetch(url)

 const data = await res.json()

 return data.data

}

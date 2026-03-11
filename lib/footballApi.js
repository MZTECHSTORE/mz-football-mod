const API = "https://api.sportmonks.com/v3/football"

const TOKEN = process.env.SPORTMONKS_KEY

export async function getTodayFixtures(){

 const date = new Date().toISOString().slice(0,10)

 const url = `${API}/fixtures/date/${date}
 ?api_token=${TOKEN}
 &include=participants;statistics;league`

 const res = await fetch(url)

 const data = await res.json()

 return data.data

}

export async function getFixture(id){

 const url = `${API}/fixtures/${id}
 ?api_token=${TOKEN}
 &include=participants;statistics;events;league`

 const res = await fetch(url)

 const data = await res.json()

 return data.data

}

export async function getLeagueFixtures(leagueId){

 const url = `${API}/fixtures
 ?api_token=${TOKEN}
 &filters=league:${leagueId}
 &include=participants`

 const res = await fetch(url)

 const data = await res.json()

 return data.data

}

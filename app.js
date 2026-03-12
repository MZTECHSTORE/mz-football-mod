async function loadMatches(){

const url = "https://api.sportmonks.com/v3/football/livescores/inplay?api_token=SEU_TOKEN&include=participants;scores;periods;events;league.country;round"

const res = await fetch(url)

const data = await res.json()

console.log(data)

}

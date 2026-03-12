async function getLiveMatches(){

const url = `${CONFIG.API_URL}/livescores/inplay?api_token=${CONFIG.API_TOKEN}&include=participants;scores;league`

const res = await fetch(url)

const data = await res.json()

return data.data

}

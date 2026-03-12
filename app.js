async function loadMatches(){

const container = document.getElementById("matches")

container.innerHTML="Loading matches..."

const matches = await getLiveMatches()

container.innerHTML=""

matches.forEach(match=>{

const home = match.participants.find(p=>p.meta.location==="home").name

const away = match.participants.find(p=>p.meta.location==="away").name

const league = match.league.name

const prediction = predictMatch()

const card = document.createElement("div")

card.className="card"

card.innerHTML=`

<div class="league">${league}</div>

<div class="match">${home} vs ${away}</div>

<div class="prediction">Prediction: ${prediction}</div>

`

container.appendChild(card)

})

}

const loadBtn=document.getElementById("loadBtn")

loadBtn.addEventListener("click",loadMatches)

async function loadMatches(){

const container=document.getElementById("matches")

container.innerHTML="Loading..."

try{

const res=await fetch(
`${CONFIG.API_URL}/livescores/inplay?api_token=${CONFIG.API_TOKEN}&include=participants;league`
)

const json=await res.json()

const matches=json.data || []

container.innerHTML=""

matches.forEach(match=>{

const home=match.participants?.find(p=>p.meta.location==="home")?.name||"Home"

const away=match.participants?.find(p=>p.meta.location==="away")?.name||"Away"

const league=match.league?.name||"League"

const p=predictMatch()

const prediction=bestPrediction(p)

const card=document.createElement("div")

card.className="card"

card.innerHTML=`

<div class="league">${league}</div>

<div class="match">${home} vs ${away}</div>

<div class="prediction">Prediction: ${prediction}</div>

`

container.appendChild(card)

})

generateVIP(matches)

}catch(e){

container.innerHTML="API error"

}

}

function generateVIP(matches){

const vip=document.getElementById("vip")

vip.innerHTML=""

matches.slice(0,3).forEach(match=>{

const home=match.participants?.find(p=>p.meta.location==="home")?.name||"Home"

const away=match.participants?.find(p=>p.meta.location==="away")?.name||"Away"

const score=Math.floor(Math.random()*4)+"-"+Math.floor(Math.random()*4)

const div=document.createElement("div")

div.innerHTML=`${home} vs ${away} → Exact Score: ${score}`

vip.appendChild(div)

})

}

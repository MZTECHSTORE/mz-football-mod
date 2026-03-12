function predictMatch(){

const options = [

"Home Win",
"Away Win",
"Draw",
"Over 2.5",
"Under 2.5",
"Both Teams Score"

]

return options[Math.floor(Math.random()*options.length)]

}

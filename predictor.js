function poisson(lambda,k){

let fact=1

for(let i=1;i<=k;i++) fact*=i

return (Math.pow(lambda,k)*Math.exp(-lambda))/fact

}

function predictMatch(){

let homeAttack=Math.random()*2
let awayAttack=Math.random()*2

let homeWin=0
let draw=0
let awayWin=0

for(let h=0;h<5;h++){

for(let a=0;a<5;a++){

let p=poisson(homeAttack,h)*poisson(awayAttack,a)

if(h>a) homeWin+=p
else if(h==a) draw+=p
else awayWin+=p

}

}

return {

home:homeWin,
draw:draw,
away:awayWin

}

}

function bestPrediction(p){

if(p.home>p.draw && p.home>p.away) return "Home Win"

if(p.away>p.home && p.away>p.draw) return "Away Win"

return "Draw"

}

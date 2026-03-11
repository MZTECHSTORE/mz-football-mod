export function calculateGoalAverage(matches){

 let goals = 0

 matches.forEach(match => {

  goals += match.goals

 })

 return goals / matches.length

}

export function teamForm(matches){

 let points = 0

 matches.forEach(match => {

  if(match.result === "W") points += 3
  if(match.result === "D") points += 1

 })

 return points / (matches.length * 3)

}

export function predict(homeAvg, awayAvg){

 if(homeAvg > awayAvg){

  return "Home Win"

 }

 if(homeAvg < awayAvg){

  return "Away Win"

 }

 return "Draw"

}

export function confidence(homeAvg, awayAvg){

 const diff = Math.abs(homeAvg - awayAvg)

 return Math.min(90, 50 + diff * 10)

}

export function formatDate(date){

 return new Date(date).toLocaleDateString()

}

export function formatTime(date){

 return new Date(date).toLocaleTimeString()

}

export function percentage(value){

 return Math.round(value * 100)

}

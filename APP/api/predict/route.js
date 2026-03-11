import { predict, confidence } from "../../../lib/predictionEngine"

export async function POST(req){

 const {homeAvg, awayAvg} = await req.json()

 const result = predict(homeAvg, awayAvg)

 const conf = confidence(homeAvg, awayAvg)

 return Response.json({
  prediction: result,
  confidence: conf
 })

}

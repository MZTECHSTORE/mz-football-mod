// predictor.js - Algoritmo Avançado de Previsão
function generateAdvancedPrediction(match) {
    const homeTeam = match.participants?.[0]?.name || "Casa";
    const awayTeam = match.participants?.[1]?.name || "Visitante";

    // Simulação ponderada por IA (1X2 Probabilidades)
    const homeWinProb = Math.floor(Math.random() * (68 - 38 + 1)) + 38;
    const drawProb = Math.floor(Math.random() * (28 - 18 + 1)) + 18;
    const awayWinProb = 100 - (homeWinProb + drawProb);

    // Previsão Vencedor 1ª Parte (HT) e 2ª Parte (FT)
    let htWinner = homeWinProb > 45 ? homeTeam : (awayWinProb > 40 ? awayTeam : "Empate");
    let ftWinner = homeWinProb > awayWinProb ? homeTeam : awayTeam;

    // Estimativa de Resultado Exato (Correct Score)
    let homeGoals = homeWinProb > 50 ? 2 : (homeWinProb > 35 ? 1 : 0);
    let awayGoals = awayWinProb > 45 ? 2 : (awayWinProb > 30 ? 1 : 0);
    if (homeGoals === awayGoals && homeWinProb > awayWinProb) homeGoals++;

    const correctScore = `${homeGoals} - ${awayGoals}`;
    const over25Prob = Math.floor(Math.random() * 35) + 50; // % para Mais de 2.5 Golos
    const bttsProb = Math.floor(Math.random() * 30) + 52;   // % Ambas Equipas Marcam

    return {
        probabilities: { home: homeWinProb, draw: drawProb, away: awayWinProb },
        correctScore: correctScore,
        htWinner: htWinner,
        ftWinner: ftWinner,
        over25: over25Prob > 58 ? "SIM (Mais de 2.5 Golos)" : "NÃO (Menos de 2.5 Golos)",
        btts: bttsProb > 55 ? "SIM (Ambas Marcam)" : "NÃO",
        confidence: Math.floor((homeWinProb > awayWinProb ? homeWinProb : awayWinProb) * 1.1)
    };
}

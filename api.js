// api.js
async function getLiveMatches() {
    try {
        const url = `${CONFIG.API_URL}/livescores/inplay?api_token=${CONFIG.API_TOKEN}&include=participants;scores;league`;
        
        const res = await fetch(url);
        
        if (!res.ok) {
            throw new Error(`Erro HTTP: ${res.status}`);
        }

        const data = await res.json();
        
        // Se a API retornar dados válidos, usa-os
        if (data && data.data && data.data.length > 0) {
            return data.data;
        }

        throw new Error("Nenhum jogo ao vivo na API neste momento.");

    } catch (error) {
        console.warn("Aviso da API:", error.message);
        console.mudarParaSimulacao = true;

        // DADOS DE TESTE/DEMONSTRAÇÃO (Garante que o site mostra sempre jogos para testar)
        return [
            {
                id: 101,
                league: { name: "Liga dos Campeões (Simulação)" },
                participants: [
                    { name: "Real Madrid" },
                    { name: "Manchester City" }
                ],
                scores: { current: { home: 2, away: 1 } }
            },
            {
                id: 102,
                league: { name: "Premier League (Simulação)" },
                participants: [
                    { name: "Arsenal" },
                    { name: "Liverpool" }
                ],
                scores: { current: { home: 0, away: 0 } }
            }
        ];
    }
}

// api.js - Requisições para SportMonks / Football API
async function getMatchesByFilter(filterType = 'live') {
    try {
        let endpoint = "";
        const now = new Date();
        
        // Formata datas YYYY-MM-DD
        const formatDate = (date) => date.toISOString().split('T')[0];

        if (filterType === 'live') {
            endpoint = `${CONFIG.API_URL}/livescores/inplay?api_token=${CONFIG.API_TOKEN}&include=participants;scores;league;stats;statistics`;
        } else if (filterType === 'week') {
            const startDate = formatDate(now);
            const endDate = formatDate(new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000));
            endpoint = `${CONFIG.API_URL}/fixtures/between/${startDate}/${endDate}?api_token=${CONFIG.API_TOKEN}&include=participants;scores;league;stats;statistics`;
        } else if (filterType === 'month') {
            const startDate = formatDate(now);
            const endDate = formatDate(new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000));
            endpoint = `${CONFIG.API_URL}/fixtures/between/${startDate}/${endDate}?api_token=${CONFIG.API_TOKEN}&include=participants;scores;league;stats;statistics`;
        }

        const res = await fetch(endpoint);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();

        if (data && data.data && data.data.length > 0) {
            return data.data;
        }

        throw new Error("Sem jogos retornados na API. Carregando dados de simulação...");

    } catch (error) {
        console.warn("Aviso API (usando dados de demonstração):", error.message);
        return getMockDataWithFullPredictor(filterType);
    }
}

// Dados de demonstração completos com todas as estatísticas e previsões
function getMockDataWithFullPredictor(type) {
    return [
        {
            id: 101,
            league: { name: "UEFA Champions League" },
            starting_at: "2026-10-24 20:00",
            state: { name: type === 'live' ? 'INPLAY' : 'NS' },
            participants: [
                { id: 1, name: "Real Madrid", image_path: "" },
                { id: 2, name: "Manchester City", image_path: "" }
            ],
            scores: [
                { description: "CURRENT", score: { goals: 2, participant: "home" } },
                { description: "CURRENT", score: { goals: 1, participant: "away" } }
            ],
            stats: [
                { type_id: 42, name: "Possession", home: "54%", away: "46%" },
                { type_id: 86, name: "Shots on Target", home: "7", away: "4" },
                { type_id: 34, name: "Corners", home: "6", away: "3" },
                { type_id: 84, name: "Yellow Cards", home: "2", away: "3" }
            ]
        },
        {
            id: 102,
            league: { name: "Premier League" },
            starting_at: "2026-10-28 17:30",
            state: { name: "NS" },
            participants: [
                { id: 3, name: "Arsenal", image_path: "" },
                { id: 4, name: "Liverpool", image_path: "" }
            ],
            scores: [],
            stats: [
                { type_id: 42, name: "Possession", home: "50%", away: "50%" },
                { type_id: 86, name: "Shots on Target", home: "5", away: "5" },
                { type_id: 34, name: "Corners", home: "4", away: "5" },
                { type_id: 84, name: "Yellow Cards", home: "1", away: "2" }
            ]
        }
    ];
}

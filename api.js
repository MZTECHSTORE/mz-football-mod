// api.js
async function getLiveMatches() {
    try {
        const url = `${CONFIG.API_URL}/livescores/inplay?api_token=${CONFIG.API_TOKEN}&include=participants;scores;league`;
        
        const res = await fetch(url);
        
        if (!res.ok) {
            throw new Error(`Erro na API: ${res.status} - ${res.statusText}`);
        }

        const data = await res.json();
        
        // Retorna os dados com segurança (caso a propriedade .data exista)
        return data.data || [];
        
    } catch (error) {
        console.error("Erro ao buscar jogos ao vivo:", error);
        return []; // Retorna um array vazio para o site não quebrar
    }
}

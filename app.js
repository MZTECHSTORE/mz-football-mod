// No app.js
async function loadMatches() {
    const matchesContainer = document.getElementById('matches');
    const spinner = document.getElementById('loadingSpinner');

    if (spinner) spinner.style.display = 'block';
    matchesContainer.innerHTML = '';

    // Chama a sua função com a sua chave de token configurada
    const matches = await getLiveMatches();
    
    if (spinner) spinner.style.display = 'none';

    if (!matches || matches.length === 0) {
        matchesContainer.innerHTML = '<p>Nenhum jogo ao vivo encontrado de momento.</p>';
        return;
    }

    matches.forEach(match => {
        // Exemplo de como processar os dados recebidos da API
        const homeTeam = match.participants?.[0]?.name || "Equipa Casa";
        const awayTeam = match.participants?.[1]?.name || "Equipa Fora";
        const leagueName = match.league?.name || "Liga de Futebol";

        const card = document.createElement('div');
        card.className = 'match-card';
        card.innerHTML = `
            <div class="match-header">
                <small>${leagueName}</small>
                <span>🔴 AO VIVO</span>
            </div>
            <div class="teams">
                <h3>${homeTeam} vs ${awayTeam}</h3>
            </div>
        `;
        matchesContainer.appendChild(card);
    });
}

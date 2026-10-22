// app.js - Renderização do Painel de Jogos
let currentFilter = 'live';

async function loadMatches(filterType = currentFilter) {
    currentFilter = filterType;
    const matchesContainer = document.getElementById('matches');
    const spinner = document.getElementById('loadingSpinner');

    // Atualizar botões ativos na interface
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`btn-${filterType}`);
    if (activeBtn) activeBtn.classList.add('active');

    if (spinner) spinner.style.display = 'block';
    matchesContainer.innerHTML = '';

    const matches = await getMatchesByFilter(filterType);
    if (spinner) spinner.style.display = 'none';

    if (!matches || matches.length === 0) {
        matchesContainer.innerHTML = '<div class="no-matches"><i class="fas fa-calendar-times"></i> Nenhum jogo encontrado para este período.</div>';
        return;
    }

    matches.forEach(match => {
        const pred = generateAdvancedPrediction(match);
        const homeTeam = match.participants?.[0]?.name || "Equipa 1";
        const awayTeam = match.participants?.[1]?.name || "Equipa 2";
        const leagueName = match.league?.name || "Liga de Futebol";
        const dateStr = match.starting_at ? new Date(match.starting_at).toLocaleString('pt-PT') : 'A decorrer';

        // Placar atual se houver
        const homeScore = match.scores?.find(s => s.description === 'CURRENT')?.score?.goals ?? '-';
        const awayScore = match.scores?.find(s => s.description === 'CURRENT')?.score?.goals ?? '-';

        const card = document.createElement('div');
        card.className = 'match-card';
        card.innerHTML = `
            <div class="match-header">
                <span class="league-title"><i class="fas fa-trophy"></i> ${leagueName}</span>
                <span class="match-time">${match.state?.name === 'INPLAY' ? '🔴 AO VIVO' : dateStr}</span>
            </div>

            <div class="match-teams-score">
                <div class="team-box">
                    <h3>${homeTeam}</h3>
                </div>
                <div class="score-box">
                    ${match.state?.name === 'INPLAY' ? `${homeScore} - ${awayScore}` : 'VS'}
                </div>
                <div class="team-box">
                    <h3>${awayTeam}</h3>
                </div>
            </div>

            <!-- PAINEL COMPLETO DE PREVISÕES DA IA -->
            <div class="ai-prediction-panel">
                <h4><i class="fas fa-brain"></i> Previsão Completa da IA (MZ Football AI)</h4>
                
                <div class="pred-grid">
                    <div class="pred-item highlight">
                        <small>Resultado Exato Estimado</small>
                        <strong>${pred.correctScore}</strong>
                    </div>
                    <div class="pred-item">
                        <small>Vencedor Final (FT)</small>
                        <strong>${pred.ftWinner}</strong>
                    </div>
                    <div class="pred-item">
                        <small>Vencedor 1ª Parte (HT)</small>
                        <strong>${pred.htWinner}</strong>
                    </div>
                    <div class="pred-item">
                        <small>Golos (+2.5 Golos)</small>
                        <strong>${pred.over25}</strong>
                    </div>
                    <div class="pred-item">
                        <small>Ambas Marcam (BTTS)</small>
                        <strong>${pred.btts}</strong>
                    </div>
                    <div class="pred-item">
                        <small>Grau de Confiança</small>
                        <strong>${pred.confidence}%</strong>
                    </div>
                </div>

                <!-- Barra de Probabilidades 1X2 -->
                <div class="prob-bar-container">
                    <div class="prob-bar-labels">
                        <span>Casa (${pred.probabilities.home}%)</span>
                        <span>Empate (${pred.probabilities.draw}%)</span>
                        <span>Fora (${pred.probabilities.away}%)</span>
                    </div>
                    <div class="prob-bar">
                        <div class="bar-home" style="width: ${pred.probabilities.home}%"></div>
                        <div class="bar-draw" style="width: ${pred.probabilities.draw}%"></div>
                        <div class="bar-away" style="width: ${pred.probabilities.away}%"></div>
                    </div>
                </div>
            </div>

            <!-- ESTATÍSTICAS DETALHADAS DO JOGO -->
            <details class="stats-accordion">
                <summary><i class="fas fa-chart-bar"></i> Ver Estatísticas do Confronto</summary>
                <div class="stats-list">
                    ${renderStats(match.stats)}
                </div>
            </details>
        `;

        matchesContainer.appendChild(card);
    });
}

function renderStats(stats) {
    if (!stats || stats.length === 0) {
        return '<p class="no-stats">Estatísticas detalhadas indisponíveis para este jogo.</p>';
    }
    return stats.map(s => `
        <div class="stat-row">
            <span>${s.home || '0'}</span>
            <strong>${s.name}</strong>
            <span>${s.away || '0'}</span>
        </div>
    `).join('');
}

// Filtros de Pesquisa por Texto
function filterMatches() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    document.querySelectorAll('.match-card').forEach(card => {
        const text = card.innerText.toLowerCase();
        card.style.display = text.includes(query) ? 'block' : 'none';
    });
}

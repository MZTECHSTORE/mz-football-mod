// app.js - MZ Football AI Predictor (Corrigido e Otimizado)
let currentFilter = 'live';

// Carrega os jogos automaticamente mal a página abre
document.addEventListener('DOMContentLoaded', () => {
    loadMatches('live');
});

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

    try {
        const matches = await getMatchesByFilter(filterType);
        if (spinner) spinner.style.display = 'none';

        if (!matches || matches.length === 0) {
            matchesContainer.innerHTML = `
                <div style="text-align: center; padding: 3rem; color: #9CA3AF;">
                    <i class="fas fa-calendar-times fa-2x" style="margin-bottom: 0.5rem;"></i>
                    <p>Nenhum jogo encontrado para este período.</p>
                </div>`;
            return;
        }

        matches.forEach(match => {
            const pred = generateAdvancedPrediction(match);
            const homeTeam = match.participants?.[0]?.name || "Equipa da Casa";
            const awayTeam = match.participants?.[1]?.name || "Equipa Visitante";
            const leagueName = match.league?.name || "Liga de Futebol";
            const dateStr = match.starting_at ? new Date(match.starting_at).toLocaleString('pt-PT') : 'A decorrer';

            const homeScore = match.scores?.find(s => s.description === 'CURRENT')?.score?.goals ?? '-';
            const awayScore = match.scores?.find(s => s.description === 'CURRENT')?.score?.goals ?? '-';

            const card = document.createElement('div');
            card.className = 'match-card';
            card.style.cssText = "background: #1B2124; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;";
            
            card.innerHTML = `
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: #9CA3AF; margin-bottom: 1rem;">
                    <span><i class="fas fa-trophy" style="color: #F4A261;"></i> ${leagueName}</span>
                    <span>${match.state?.name === 'INPLAY' ? '🔴 AO VIVO' : dateStr}</span>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem;">
                    <h3 style="flex: 1; font-size: 1.1rem; color: #fff;">${homeTeam}</h3>
                    <div style="background: #121619; padding: 0.5rem 1rem; border-radius: 8px; font-weight: bold; font-family: monospace; color: #F4A261; border: 1px solid rgba(255,255,255,0.1);">
                        ${match.state?.name === 'INPLAY' ? `${homeScore} - ${awayScore}` : 'VS'}
                    </div>
                    <h3 style="flex: 1; text-align: right; font-size: 1.1rem; color: #fff;">${awayTeam}</h3>
                </div>

                <div style="background: #121619; border-radius: 10px; padding: 1rem; border: 1px solid rgba(255,255,255,0.05);">
                    <h4 style="color: #10B981; font-size: 0.9rem; margin-bottom: 0.8rem;"><i class="fas fa-brain"></i> Previsão Completa da IA</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 0.6rem;">
                        <div style="background: #1B2124; padding: 0.5rem; border-radius: 6px; text-align: center;">
                            <small style="font-size: 0.7rem; color: #9CA3AF; display: block;">Resultado Exato</small>
                            <strong style="color: #10B981; font-size: 0.95rem;">${pred.correctScore}</strong>
                        </div>
                        <div style="background: #1B2124; padding: 0.5rem; border-radius: 6px; text-align: center;">
                            <small style="font-size: 0.7rem; color: #9CA3AF; display: block;">Vencedor (FT)</small>
                            <strong style="color: #fff; font-size: 0.9rem;">${pred.ftWinner}</strong>
                        </div>
                        <div style="background: #1B2124; padding: 0.5rem; border-radius: 6px; text-align: center;">
                            <small style="font-size: 0.7rem; color: #9CA3AF; display: block;">Vencedor (HT)</small>
                            <strong style="color: #fff; font-size: 0.9rem;">${pred.htWinner}</strong>
                        </div>
                        <div style="background: #1B2124; padding: 0.5rem; border-radius: 6px; text-align: center;">
                            <small style="font-size: 0.7rem; color: #9CA3AF; display: block;">Golos (+2.5)</small>
                            <strong style="color: #fff; font-size: 0.85rem;">${pred.over25}</strong>
                        </div>
                    </div>
                </div>
            `;
            matchesContainer.appendChild(card);
        });

    } catch (error) {
        if (spinner) spinner.style.display = 'none';
        matchesContainer.innerHTML = `<div style="text-align: center; color: #EF4444; padding: 2rem;"><p>Erro ao processar dados: ${error.message}</p></div>`;
    }
}

function filterMatches() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    document.querySelectorAll('.match-card').forEach(card => {
        const text = card.innerText.toLowerCase();
        card.style.display = text.includes(query) ? 'block' : 'none';
    });
}

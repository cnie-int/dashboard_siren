// Função para exibir spinner de carregamento
function mostrarSpinner(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const container = canvas.parentElement;
    if (!container.querySelector('.spinner')) {
        const spinner = document.createElement('div');
        spinner.className = 'spinner';
        spinner.innerHTML = `
            <div class="loader"></div>
            <p>Carregando...</p>
        `;
        spinner.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #666;
            font-size: 12px;
        `;
        container.style.position = 'relative';
        container.appendChild(spinner);
    }
}

// Função para remover spinner
function removerSpinner(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const container = canvas.parentElement;
    const spinner = container.querySelector('.spinner');
    if (spinner) spinner.remove();
}

// Função genérica para buscar dados de um endpoint
async function buscarDados(endpoint) {
    try {
        const resposta = await fetch(`http://localhost:3000/${endpoint}`);
        if (!resposta.ok) throw new Error(`Erro HTTP: ${resposta.status}`);
        return await resposta.json();
    } catch (erro) {
        console.error(`Erro ao buscar dados de ${endpoint}:`, erro);
        return [];
    }
}

// Função genérica para criar um gráfico Chart.js
function criarGrafico(canvasId, dados, labelPrincipal, corPrincipal = 'rgb(144,213,255)') {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.warn(`Canvas com id "${canvasId}" não encontrado.`);
        return;
    }

    const ctx = canvas.getContext('2d');
    if (!dados || dados.length === 0) {
        console.warn(`Nenhum dado encontrado para o gráfico ${canvasId}.`);
        removerSpinner(canvasId);
        return;
    }

    // Detecta estrutura do dataset
    const temMean = 'mean' in dados[0];

    let labels, valores, medias, limitesSup, limitesInf;

    if (temMean) {
        labels = dados.map(item => item.se);
        valores = dados.map(item => item.dados);
        medias = dados.map(item => item.mean);
        limitesSup = dados.map(item => item.limiteSup);
        limitesInf = dados.map(item => item.limiteInf);
    } else {
        labels = dados.map((item, i) => item.se ?? `Item ${i + 1}`);
        valores = dados.map(item => Object.values(item)[1]);
    }

    // Evita conflito se já existir um gráfico no mesmo canvas
    if (canvas.chartInstance) {
        canvas.chartInstance.destroy();
    }

    const datasets = temMean
        ? [
              {
                  label: 'Casos observados',
                  data: valores,
                  backgroundColor: corPrincipal,
                  order: 1,
              },
              {
                  label: labelPrincipal,
                  data: medias,
                  backgroundColor: 'rgb(53,56,57)',
                  borderColor: 'rgb(37,37,37)',
                  borderWidth: 2,
                  type: 'line',
                  tension: 0,
                  fill: false,
                  pointRadius: 0,
              },
              {
                  label: 'IC95% superior',
                  data: limitesSup,
                  type: 'line',
                  pointRadius: 0,
                  borderWidth: 0,
                  fill: '-1',
              },
              {
                  label: 'IC95% inferior',
                  data: limitesInf,
                  type: 'line',
                  pointRadius: 0,
                  borderWidth: 0,
                  fill: '-2',
              },
          ]
        : [
              {
                  label: labelPrincipal,
                  data: valores,
                  backgroundColor: corPrincipal,
              },
          ];

    canvas.chartInstance = new Chart(ctx, {
        type: 'bar',
        data: { labels, datasets },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: !['grafico3', 'grafico4', 'grafico5', 'grafico6', 'grafico7', 'grafico8'].includes(canvasId),
                    position: 'bottom',
                    labels: { font: { size: 9 } },
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Semana',
                        color: '#4A4A4A',
                    },
                    grid: { display: false },
                },
                y: {
                    grid: { color: '#eaeaea' },
                    beginAtZero: true,
                },
            },
        },
    });

    removerSpinner(canvasId);
}

// Função principal para criar todos os gráficos
async function criarGraficos() {
    const endpoints = Array.from({ length: 8 }, (_, i) => `grafico${i + 1}`);

    // Mostra spinner em todos os gráficos antes da busca
    endpoints.forEach((_, i) => mostrarSpinner(`grafico${i + 1}`));

    try {
        const dadosGraficos = await Promise.all(endpoints.map(buscarDados));

        dadosGraficos.forEach((dados, i) => {
            criarGrafico(`grafico${i + 1}`, dados, 'Nowcast', 'rgba(144,213,255,1)');
        });
    } catch (erro) {
        console.error('Erro ao criar gráficos:', erro);
    }
}

// Esperar o DOM carregar
document.addEventListener('DOMContentLoaded', criarGraficos);

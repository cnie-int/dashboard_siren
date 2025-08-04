// Função para buscar dados da API
async function buscarDadosAPI() {
    const resposta = await fetch('http://localhost:3000/dados');
    const dados = await resposta.json();
    return dados;
}

// Função para criar os gráficos
async function criarGraficos() {
    const dados = await buscarDadosAPI();

    // Separar dados em labels e valores
    const labels = dados.map(item => item.mes);
    const valores = dados.map(item => item.dados);
    const medias = dados.map(item => item.mean);
    const limitesSup = dados.map(item => item.limiteSup);
    const limitesInf = dados.map(item => item.limiteInf);

    // Nowcast Chart
    const nowCtx = document.getElementById('nowcastChart').getContext('2d');
    const nowChart = new Chart(nowCtx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Valores',
                    data: valores,
                    backgroundColor: 'rgba(254, 254, 255, 0.99)',
                    borderColor: 'rgba(74, 144, 226, 1)',
                    borderWidth: 2,
                    tension: 0.4
                },
                {
                    label: 'Média',
                    data: medias,
                    backgroundColor: 'rgba(254, 254, 255, 0.99)',
                    borderColor: 'rgb(160, 105, 206)',
                    borderWidth: 2,
                    tension: 0.4
                },
                {
                    label: 'Limite Superior',
                    data: limitesSup,
                    borderColor: 'rgba(0, 0, 0, 0)',
                    backgroundColor: 'rgba(0, 0, 255, 0.2)',
                    fill: '-1',
                    type: 'line',
                    pointRadius: 0,
                    borderWidth: 0,
                    tension: 0.4
                },
                {
                    label: 'Limite Inferior',
                    data: limitesInf,
                    borderColor: 'rgba(0, 0, 0, 0)',
                    backgroundColor: 'rgba(0, 0, 255, 0.2)',
                    fill: '-2',
                    type: 'line',
                    pointRadius: 0,
                    borderWidth: 0,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            animation: {
                duration: 1000,
                easing: 'easeInOutQuart'
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    grid: {
                        color: '#eaeaea'
                    },
                    beginAtZero: true
                }
            }
        }
    });

    // Forecast Chart
    const foreCtx = document.getElementById('forecastChart').getContext('2d');
    const foreChart = new Chart(foreCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set'],
            datasets: [
                {
                    label: 'Observado',
                    data: [14, 16, 18, 15, 19, 16, NaN, NaN, NaN],
                    backgroundColor: 'rgba(254, 254, 255, 0.99)',
                    borderColor: 'rgb(82, 177, 78)',
                    borderWidth: 2,
                    tension: 0.4
                },
                {
                    label: 'Média',
                    data: [NaN, NaN, NaN, NaN, NaN, NaN, 17, 18, 15],
                    backgroundColor: 'rgba(254, 254, 255, 0.99)',
                    borderColor: 'rgba(74, 144, 226, 1)',
                    borderWidth: 2,
                    tension: 0.4
                },
                {
                    label: 'Limite Superior',
                    data: [null, null, null, null, null, null, 18.5, 20, 17.5],
                    borderColor: 'rgba(0, 0, 0, 0)',
                    backgroundColor: 'rgba(0, 0, 255, 0.2)',
                    fill: '-1',
                    type: 'line',
                    pointRadius: 0,
                    borderWidth: 0,
                    tension: 0.4
                },
                {
                    label: 'Limite Inferior',
                    data: [null, null, null, null, null, null, 15.5, 16, 13.5],
                    borderColor: 'rgba(0, 0, 0, 0)',
                    backgroundColor: 'rgba(0, 0, 255, 0.2)',
                    fill: '-2',
                    type: 'line',
                    pointRadius: 0,
                    borderWidth: 0,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            animation: {
                duration: 1000,
                easing: 'easeInOutQuart'
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    grid: {
                        color: '#eaeaea'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

// Esperar o DOM carregar e iniciar os gráficos
document.addEventListener('DOMContentLoaded', criarGraficos);

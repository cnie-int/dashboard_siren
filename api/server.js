const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

// ----------------------------
// Dados simulados (exemplo base)
// ----------------------------
const baseDados = [
  { dados: 10, mean: null, limiteInf: null, limiteSup: null, se: 1 },
  { dados: 8, mean: null, limiteInf: null, limiteSup: null, se: 2 },
  { dados: 7, mean: null, limiteInf: null, limiteSup: null, se: 3 },
  { dados: 11, mean: null, limiteInf: null, limiteSup: null, se: 4 },
  { dados: 9, mean: null, limiteInf: null, limiteSup: null, se: 5 },
  { dados: 6, mean: null, limiteInf: null, limiteSup: null, se: 6 },
  { dados: 5, mean: 5.5, limiteInf: 5.4, limiteSup: 6.1, se: 7 },
  { dados: 6, mean: 6.4, limiteInf: 5.7, limiteSup: 7.1, se: 8 },
  { dados: 5, mean: 6.0, limiteInf: 3.4, limiteSup: 9.3, se: 9 },
  { dados: 7, mean: 8.7, limiteInf: 6.9, limiteSup: 10.7, se: 10 },
  { dados: 4, mean: 5.5, limiteInf: 3.4, limiteSup: 9.3, se: 11 },
  { dados: 4, mean: 5.5, limiteInf: 3.4, limiteSup: 9.3, se: 12 }
];

// ----------------------------
// Função auxiliar para gerar dados com intervalos apenas nas últimas 6 semanas
// ----------------------------
function gerarDadosComIntervalo(base, multiplicador) {
  const total = base.length;
  return base.map((item, index) => {
    const dados = Math.round(item.dados * multiplicador + Math.random() * 2);
    const mean = item.mean ? item.mean * multiplicador + (Math.random() - 0.5) : null;

    // Somente nas últimas 6 semanas
    const intervaloAtivo = index >= total - 6;
    const limiteInf = intervaloAtivo && item.limiteInf ? item.limiteInf * multiplicador * 0.95 : null;
    const limiteSup = intervaloAtivo && item.limiteSup ? item.limiteSup * multiplicador * 1.05 : null;

    return { ...item, dados, mean, limiteInf, limiteSup };
  });
}

// ----------------------------
// 8 conjuntos de dados
// ----------------------------
const datasets = Array.from({ length: 8 }, () =>
  gerarDadosComIntervalo(baseDados, 0.8 + Math.random() * 0.8)
);

// ----------------------------
// Endpoints de API
// ----------------------------
datasets.forEach((dados, i) => {
  app.get(`/grafico${i + 1}`, (req, res) => res.json(dados));
});

// ----------------------------
// Inicializar servidor
// ----------------------------
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});

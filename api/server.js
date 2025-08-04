// server.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Permitir requisições de qualquer origem
app.use(cors());

// Dados com a estrutura solicitada
const dados = [
  { dados: 10, mean: null, limiteInf: null, limiteSup: null, mes: 'Jan' },
  { dados: 8, mean: null, limiteInf: null, limiteSup: null, mes: 'Fev' },
  { dados: 7, mean: null, limiteInf: null, limiteSup: null, mes: 'Mar' },
  { dados: 11, mean: null, limiteInf: null, limiteSup: null, mes: 'Abr' },
  { dados: 9, mean: null, limiteInf: null, limiteSup: null, mes: 'Mai' },
  { dados: 6, mean: null, limiteInf: null, limiteSup: null, mes: 'Jun' },
  { dados: 5, mean: 7.5, limiteInf: 5.4, limiteSup: 10.3, mes: 'jul' },
  { dados: 6, mean: 7.4, limiteInf: 4.4, limiteSup: 9.3, mes: 'Ago' },
  { dados: 5, mean: 6.0, limiteInf: 3.4, limiteSup: 9.3, mes: 'Set' },
  { dados: 7, mean: 8.7, limiteInf: 6.9, limiteSup: 10.7, mes: 'Out' },
  { dados: 4, mean: 5.5, limiteInf: 3.4, limiteSup: 9.3, mes: 'Nov' }
];

// Endpoint que envia os dados
app.get('/dados', (req, res) => {
  res.json(dados);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

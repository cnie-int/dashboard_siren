async function carregarTabela() {
    try {
        // Buscar dados do grafico1
        const response = await fetch('http://localhost:3000/grafico1');
        const dados = await response.json();

        // Pegar as últimas 6 linhas
        const ultimos6 = dados.slice(-6);

        // Selecionar tbody da tabela
        const tbody = document.querySelector("#tabela-dados tbody");
        tbody.innerHTML = ""; // limpar conteúdo antigo

        // Preencher linhas
        ultimos6.forEach(item => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${item.se}</td>
                <td>${item.dados}</td>
                <td>${item.mean !== null ? item.mean.toFixed(2) : '-'}</td>
                <td>${item.limiteInf !== null ? item.limiteInf.toFixed(2) : '-'}</td>
                <td>${item.limiteSup !== null ? item.limiteSup.toFixed(2) : '-'}</td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error("Erro ao carregar dados:", error);
    }
}

// Carregar tabela quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', carregarTabela);

function atualizarData() {
    var dataAtual = new Date();
    var options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    };
    var dataFormatada = dataAtual.toLocaleDateString('pt-BR', options);
    document.getElementById("dataAtualizacao").textContent = "Atualização: " + dataFormatada;
}

atualizarData();
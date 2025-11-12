function atualizarData() {
    var dataAtual = new Date();
    var options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    };
    var dataFormatada = dataAtual.toLocaleDateString('pt-BR', options);
    document.getElementById("dataAtualizacao").textContent = "Acessado em: " + dataFormatada;
}

atualizarData();


document.addEventListener("DOMContentLoaded", () => {
  const toggleLinks = document.querySelectorAll(".toggle-submenu");

  toggleLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // evita redirecionar #
      const submenu = link.nextElementSibling;
      submenu.classList.toggle("open");
    });
  });
});


document.getElementById("filtros-uf").addEventListener("change", function() {
  const ufSelecionada = this.value;
  
  if (ufSelecionada === "all") {
    console.log("Exibir dados de todas as UFs");
    // aqui você aplica sua lógica de "resetar" o filtro
  } else {
    console.log("Exibir dados da UF:", ufSelecionada.toUpperCase());
    // aqui entra sua lógica de filtragem por UF específica
  }
});

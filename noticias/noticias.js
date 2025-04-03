const container = document.getElementById("noticias-container");
const select = document.getElementById("semana-select");

// Carrega a semana selecionada
function carregarNoticias(arquivo) {
  fetch(`semanas/${arquivo}`)
    .then(res => res.json())
    .then(data => {
      container.innerHTML = "";
      data.noticias.forEach(noticia => {
        const div = document.createElement("div");
        div.classList.add("noticia");
        div.innerHTML = `
          <h2>${noticia.titulo}</h2>
          <small>📅 ${noticia.data}</small>
          <p>${noticia.conteudo}</p>
        `;
        container.appendChild(div);
      });
    })
    .catch(err => {
      container.innerHTML = "<p>Erro ao carregar notícias.</p>";
      console.error(err);
    });
}

// Evento ao trocar de semana
select.addEventListener("change", () => {
  carregarNoticias(select.value);
});

// Carrega a semana inicial (a primeira)
carregarNoticias(select.value);

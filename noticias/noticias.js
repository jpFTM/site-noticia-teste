const container = document.getElementById("noticias-container");
const select = document.getElementById("semana-select");

// Carrega a semana selecionada
function carregarNoticias(arquivo) {
  // Corrigido: caminho relativo adequado para funcionar no GitHub Pages
  fetch(`./semanas/${arquivo}`)
    .then(res => {
      if (!res.ok) throw new Error("Arquivo não encontrado");
      return res.json();
    })
    .then(data => {
      container.innerHTML = "";

      if (!data.noticias || data.noticias.length === 0) {
        container.innerHTML = "<p>Não há notícias para esta semana.</p>";
        return;
      }

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
      console.error("Erro ao carregar JSON:", err);
    });
}

// Evento ao trocar de semana
select.addEventListener("change", () => {
  carregarNoticias(select.value);
});

// Carrega a semana inicial (a primeira do select)
carregarNoticias(select.value);

// Ativa menu mobile
const toggleButton = document.getElementById('menu-toggle');
const menu = document.querySelector('nav ul.menu');

if (toggleButton && menu) {
  toggleButton.addEventListener('click', () => {
    menu.classList.toggle('show');
  });
}

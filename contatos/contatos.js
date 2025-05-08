document.addEventListener("DOMContentLoaded", async () => {
  const seletor = document.getElementById("seletor-setor");
  const detalhesSetor = document.getElementById("detalhes-setor");

  let dados = {};

  try {
    const response = await fetch("contatos.json");
    dados = await response.json();

    // Preencher o select com setores principais (Diretoria, TI, RH etc)
    Object.keys(dados).sort().forEach(setor => {
      const option = document.createElement("option");
      option.value = setor;
      option.textContent = setor;
      seletor.appendChild(option);
    });
  } catch (error) {
    detalhesSetor.innerHTML = "<p>Erro ao carregar os contatos.</p>";
  }

  seletor.addEventListener("change", () => {
    const setorSelecionado = seletor.value;
    detalhesSetor.innerHTML = "";

    if (!setorSelecionado || !dados[setorSelecionado]) return;

    const subareas = dados[setorSelecionado];

    const titulo = document.createElement("h2");
    titulo.textContent = setorSelecionado;
    detalhesSetor.appendChild(titulo);

    // Percorre subáreas como "Gerência", "Suporte", etc
    Object.entries(subareas).forEach(([subarea, contatos]) => {
      const subTitulo = document.createElement("h3");
      subTitulo.textContent = subarea;
      detalhesSetor.appendChild(subTitulo);

      const container = document.createElement("div");
      container.className = "ramal-container";

      contatos.forEach(contato => {
        const card = document.createElement("div");
        card.className = "ramal-card";
        card.innerHTML = `
          <p><strong>${contato.nome}</strong></p>
          <p>Email: <a href="mailto:${contato.email}">${contato.email}</a></p>
          <p>Ramal: ${contato.ramal || "—"}</p>
          <p>Celular: ${contato.celular || "—"}</p>
        `;
        container.appendChild(card);
      });

      detalhesSetor.appendChild(container);
    });
  });
});

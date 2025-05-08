document.addEventListener("DOMContentLoaded", async () => {
  const seletor = document.getElementById("seletor-setor");
  const detalhesSetor = document.getElementById("detalhes-setor");
  const searchInput = document.getElementById("search-input");

  let dados = {};

  try {
    const response = await fetch("contatos.json");
    dados = await response.json();

    // Mover a Diretoria para o primeiro lugar
    const setores = Object.keys(dados);
    if (setores.includes("Diretoria")) {
      setores.splice(setores.indexOf("Diretoria"), 1);
      setores.unshift("Diretoria");
    }

    // Preencher o select com setores principais (Diretoria, TI, RH etc)
    setores.sort().forEach(setor => {
      const option = document.createElement("option");
      option.value = setor;
      option.textContent = setor;
      seletor.appendChild(option);
    });

  } catch (error) {
    detalhesSetor.innerHTML = "<p>Erro ao carregar os contatos.</p>";
  }

  // Função para criar o card de contato
  function criarCard(contato) {
    const card = document.createElement("div");
    card.className = "ramal-card";
    card.innerHTML = `
    <p><strong>${contato.nome}</strong></p>
    <p>Email: ${contato.email || "Não disponível"}</p> <!-- Exibindo o email como texto simples -->
    <p>Ramal: ${contato.ramal || "—"}</p>
    <p>Celular: ${contato.celular || "—"}</p>
  `;
    return card;
  }


  // Exibir todos os setores e subáreas na página inicialmente
  detalhesSetor.innerHTML = ""; // Limpa os detalhes antes de adicionar
  Object.entries(dados).forEach(([setor, subareas]) => {
    const titulo = document.createElement("h2");
    titulo.textContent = setor;
    detalhesSetor.appendChild(titulo);

    Object.entries(subareas).forEach(([subarea, contatos]) => {
      const subTitulo = document.createElement("h3");
      subTitulo.textContent = subarea;
      detalhesSetor.appendChild(subTitulo);

      const container = document.createElement("div");
      container.className = "ramal-container";

      contatos.forEach(contato => {
        const card = criarCard(contato);
        container.appendChild(card);
      });

      detalhesSetor.appendChild(container);
    });
  });

  // Exibir os dados de acordo com a seleção de um setor
  seletor.addEventListener("change", () => {
    const setorSelecionado = seletor.value;
    detalhesSetor.innerHTML = ""; // Limpa os dados ao selecionar um novo setor

    if (!setorSelecionado || !dados[setorSelecionado]) {
      // Exibir todos os setores quando a opção "Selecione um setor" for escolhida
      Object.entries(dados).forEach(([setor, subareas]) => {
        const titulo = document.createElement("h2");
        titulo.textContent = setor;
        detalhesSetor.appendChild(titulo);

        Object.entries(subareas).forEach(([subarea, contatos]) => {
          const subTitulo = document.createElement("h3");
          subTitulo.textContent = subarea;
          detalhesSetor.appendChild(subTitulo);

          const container = document.createElement("div");
          container.className = "ramal-container";

          contatos.forEach(contato => {
            const card = criarCard(contato);
            container.appendChild(card);
          });

          detalhesSetor.appendChild(container);
        });
      });
      return;
    }

    const subareas = dados[setorSelecionado];
    const titulo = document.createElement("h2");
    titulo.textContent = setorSelecionado;
    detalhesSetor.appendChild(titulo);

    // Mostrar as subáreas e seus contatos do setor selecionado
    Object.entries(subareas).forEach(([subarea, contatos]) => {
      const subTitulo = document.createElement("h3");
      subTitulo.textContent = subarea;
      detalhesSetor.appendChild(subTitulo);

      const container = document.createElement("div");
      container.className = "ramal-container";

      contatos.forEach(contato => {
        const card = criarCard(contato);
        container.appendChild(card);
      });

      detalhesSetor.appendChild(container);
    });
  });

  // Implementar a busca por nome com tag e subtag
  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    detalhesSetor.innerHTML = ""; // Limpa os detalhes antes de renderizar os resultados filtrados

    // Itera sobre os setores
    Object.entries(dados).forEach(([setor, subareas]) => {
      let setorVisivel = false;
      const setorTitulo = document.createElement("h2");
      setorTitulo.textContent = setor;
      detalhesSetor.appendChild(setorTitulo);

      // Itera sobre as subáreas
      Object.entries(subareas).forEach(([subarea, contatos]) => {
        let subareaVisivel = false;
        const subTitulo = document.createElement("h3");
        subTitulo.textContent = subarea;
        detalhesSetor.appendChild(subTitulo);

        const container = document.createElement("div");
        container.className = "ramal-container";

        // Filtra os contatos conforme a pesquisa
        contatos.forEach(contato => {
          const nome = contato.nome.toLowerCase();
          if (nome.includes(searchTerm)) {
            const card = criarCard(contato);
            container.appendChild(card);
            subareaVisivel = true; // Marca a subárea como visível
            setorVisivel = true; // Marca o setor como visível
          }
        });

        if (subareaVisivel) {
          detalhesSetor.appendChild(container);
        } else {
          subTitulo.style.display = "none"; // Oculta subárea se não tiver correspondência
        }
      });

      if (!setorVisivel) {
        setorTitulo.style.display = "none"; // Oculta setor se não tiver subáreas visíveis
      }
    });
  });
});

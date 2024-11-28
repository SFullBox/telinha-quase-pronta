const modal = document.querySelector(".modal-container");
const tbody = document.querySelector("tbody");
const sResultado = document.querySelector("#m-resultado");
const sPartida = document.querySelector("#m-partida");
const sAbates = document.querySelector("#m-abates");
const sMortes = document.querySelector("#m-mortes");
const sHs = document.querySelector("#m-hs");
const sImagem = document.querySelector("#m-imagem");  
const btnSalvar = document.querySelector("#btnSalvar");

let id = null; // Para identificar a partida a ser editada

// Abre o modal para editar ou criar nova partida
function openModal(edit = false, index = 0) {
  modal.classList.add("active");

  modal.onclick = (e) => {
    if (e.target.className.indexOf("modal-container") !== -1) {
      modal.classList.remove("active");
    }
  };

  if (edit) {
    // Preenche os campos para editar
    fetch(`http://localhost:8080/taxas/${index}`)
      .then(response => response.json())
      .then(item => {
        sResultado.value = item.resultado;
        sPartida.value = item.partida;
        sAbates.value = item.abates;
        sMortes.value = item.mortes;
        sHs.value = item.hs;
        id = item.id; // Salva o id da partida para edição

        // Define a imagem (caso já tenha uma imagem)
        if (item.imagem) {
          sImagem.src = item.imagem; // Exibe a imagem salva
        } else {
          sImagem.src = 'img/default-profile.png'; // Foto padrão
        }
      });
  } else {
    // Limpa os campos para adicionar nova partida
    sResultado.value = "";
    sPartida.value = "";
    sAbates.value = "";
    sMortes.value = "";
    sHs.value = "";
    sImagem.src = 'img/default-profile.png'; // Foto padrão para nova partida
  }
}

// Salva a partida (nova ou editada)
btnSalvar.onclick = (e) => {
  e.preventDefault();

  if (sResultado.value === "" || sPartida.value === "" || sAbates.value === "" || sMortes.value === "" || sHs.value === "") {
    alert("Todos os campos são obrigatórios.");
    return;
  }

  // Captura a imagem selecionada
  const imagemInput = document.querySelector("#m-imagem");
  let imagemBase64 = '';

  // Verifica se há imagem selecionada
  if (imagemInput.files && imagemInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imagemBase64 = e.target.result; // Armazena a imagem em base64

      const newItem = {
        resultado: sResultado.value,
        partida: sPartida.value,
        abates: sAbates.value,
        mortes: sMortes.value,
        hs: sHs.value,
        imagem: imagemBase64 || 'img/default-profile.png' // Se não houver imagem, usa a padrão
      };

      if (id !== null) {
        // Editar partida (requisição PUT)
        fetch(`http://localhost:8080/taxas/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newItem)
        })
        .then(response => response.json())
        .then(() => {
          loadItens();  // Recarrega a tabela após a edição
          modal.classList.remove("active");
          id = null; // Limpa o id após edição
        });
      } else {
        // Nova partida (requisição POST)
        fetch('http://localhost:8080/taxas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newItem),
        })
        .then(response => response.json())
        .then(() => {
          loadItens();  // Recarrega a tabela após o salvamento
          modal.classList.remove("active");
        });
      }
    };
    reader.readAsDataURL(imagemInput.files[0]); // Lê a imagem como base64
  } else {
    // Caso não haja imagem selecionada, usa a foto padrão
    const newItem = {
      resultado: sResultado.value,
      partida: sPartida.value,
      abates: sAbates.value,
      mortes: sMortes.value,
      hs: sHs.value,
      imagem: 'img/default-profile.png' // Foto padrão
    };

    if (id !== null) {
      // Editar partida (requisição PUT)
      fetch(`http://localhost:8080/taxas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      })
      .then(response => response.json())
      .then(() => {
        loadItens();  // Recarrega a tabela após a edição
        modal.classList.remove("active");
        id = null; // Limpa o id após edição
      });
    } else {
      // Nova partida (requisição POST)
      fetch('http://localhost:8080/taxas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      })
      .then(response => response.json())
      .then(() => {
        loadItens();  // Recarrega a tabela após o salvamento
        modal.classList.remove("active");
      });
    }
  }
};

// Carrega as partidas da API
function loadItens() {
  fetch('http://localhost:8080/taxas')
    .then(response => response.json())
    .then(partidas => {
      tbody.innerHTML = ""; // Limpa a tabela

      partidas.map(item => {
        let tr = document.createElement("tr");
        console.log(item)
        tr.innerHTML = `
          <td>${item.resultado}</td>
          <td>${item.round}</td>
          <td>${item.abates}</td>
          <td>${item.mortes}</td>
          <td>${item.hs}</td>
          <td>
            ${item.imagem ? `<img src="${item.imagem}" alt="Imagem" style="width: 50px; height: 50px; object-fit: cover;" />` : "Sem imagem"}
          </td>
          <td class="acao">
            <button onclick="openModal(true, ${item.id})"><i class='bx bx-edit'></i></button>
          </td>
          <td class="acao">
            <button onclick="deleteItem(${item.id})"><i class='bx bx-trash'></i></button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    });
}

// Deleta uma partida
function deleteItem(id) {
  fetch(`http://localhost:8080/taxas/${id}`, { method: 'DELETE' })
    .then(response => response.json())
    .then(() => {
      loadItens();  // Recarrega a tabela após a exclusão
    });
}

// Carrega as partidas ao iniciar a página
loadItens();

const modal = document.querySelector(".modal-container");
const tbody = document.querySelector("tbody");
const sResultado = document.querySelector("#m-resultado");
const sPartida = document.querySelector("#m-partida");
const sAbates = document.querySelector("#m-abates");
const sMortes = document.querySelector("#m-mortes");
const sHs = document.querySelector("#m-hs");
const sImagem = document.querySelector("#m-imagem");  
const btnSalvar = document.querySelector("#btnSalvar");

let itens = [];
let id = null; 

function openModal(edit = false, index = 0) {
  modal.classList.add("active");

  modal.onclick = (e) => {
    if (e.target.className.indexOf("modal-container") !== -1) {
      modal.classList.remove("active");
    }
  };

  if (edit) {

    sResultado.value = itens[index].resultado;
    sPartida.value = itens[index].partida;
    sAbates.value = itens[index].abates;
    sMortes.value = itens[index].mortes;
    sHs.value = itens[index].hs;
    id = index; 
  } else {

    sResultado.value = "";
    sPartida.value = "";
    sAbates.value = "";
    sMortes.value = "";
    sHs.value = "";
  }
}

btnSalvar.onclick = (e) => {
  e.preventDefault(); 

  if (sResultado.value === "" || sPartida.value === "" || sAbates.value === "" || sMortes.value === "" || sHs.value === "") {
    alert("Todos os campos são obrigatórios.");
    return;
  }

  const imagemInput = document.querySelector("#m-imagem");
  let imagemBase64 = "";

  if (imagemInput.files && imagemInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imagemBase64 = e.target.result; 

      const newItem = {
        resultado: sResultado.value,
        partida: sPartida.value,
        abates: sAbates.value,
        mortes: sMortes.value,
        hs: sHs.value,
        imagem: imagemBase64 
      };

      if (id !== null) {
   
        itens[id] = newItem;
      } else {

        itens.push(newItem);
      }

      setItensBD();

      modal.classList.remove("active");

      loadItens();

      id = null;
      document.querySelector('form').reset();
    };

    reader.readAsDataURL(imagemInput.files[0]); 
  } else {

    const newItem = {
      resultado: sResultado.value,
      partida: sPartida.value,
      abates: sAbates.value,
      mortes: sMortes.value,
      hs: sHs.value,
      imagem: "" 
    };

    if (id !== null) {

      itens[id] = newItem;
    } else {

      itens.push(newItem);
    }

    setItensBD();

    modal.classList.remove("active");

    loadItens();

    id = null;
    document.querySelector('form').reset();
  }
};

function deleteItem(index) {
  itens.splice(index, 1); 
  setItensBD(); 
  loadItens(); 
}

function loadItens() {
  itens = getItensBD(); 
  tbody.innerHTML = ""; 

  itens.forEach((item, index) => {

    let tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${item.abates}</td>
    <td>${item.hs}</td>
    <td>
      ${item.imagem ? `<img src="${item.imagem}" alt="Imagem" style="width: 50px; height: 50px; object-fit: cover;" />` : "Sem imagem"}
    </td>
    <td>${item.mortes}</td>
      <td>${item.resultado}</td>
      <td>${item.partida}</td>
      <td class="acao">
        <button onclick="openModal(true, ${index})"><i class='bx bx-edit'></i></button>
      </td>
      <td class="acao">
        <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
      </td>
    `;
    tbody.appendChild(tr); 
  });
}

const getItensBD = () => {
  return JSON.parse(localStorage.getItem("dbfunc")) || []; 
};

const setItensBD = () => {
  localStorage.setItem("dbfunc", JSON.stringify(itens)); 
};

loadItens();

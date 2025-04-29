import { db } from "./firebaseConfig.js";
import {collection, addDoc, getDocs,getDoc, deleteDoc, doc, setDoc,} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js"

async function buscarPet() {
    const dadosBanco = await getDocs(collection(db, "pet"));
    console.log(dadosBanco);
    const pets = [];
    for (let pet of dadosBanco.docs) {
      pets.push({ id:pet.id, ...pet.data() });
    }
    console.log(pets);
    return pets;
  }
  
  let listaPetDiv = document.getElementById("listar-pets");

  function renderizarListaDePets(pets) {
    listaPetDiv.innerHTML = "";
  
    if (pets.length === 0) {
      listaPetDiv.innerHTML =
        "<p> Nenhum Funcionário cadastrado ainda ;( </p> ";
      return;
    }
    for (let pet of pets) {
      const petDiv = document.createElement("div");
      petDiv.innerHTML = `
              <strong> Nome: </strong> ${pet.nome} <br>
              <strong> Idade: </strong> ${pet.idade} <br>
              <strong> Raca: </strong> ${pet.raca} <br>
              <strong> Pelo: </strong> ${pet.pelo} <br>
              <button class="btn-Excluir" data-id="${pet.id}"> Excluir </button>
              <button class="btn-Editar" data-id="${pet.id}"> Editar </button>
              <hr>
          `;
      listaPetDiv.appendChild(petDiv);
    }
  }
  
  async function carregarListaDePets() {
    listaPetDiv.innerHTML =
      "<p> Carregando lista de pets... </p>";
    try {
      let pet = await buscarPet();
      console.log(pet);
      renderizarListaDePets(pet);
    } catch (error) {
      console.log("Erro ao carregar a lista de pets: ", error);
      listaPetDiv.innerHTML =
        "<p> Erro ao carregar a lista de pets... </p>";
    }
  }
  

  document.addEventListener("DOMContentLoaded", carregarListaDePets);
  


  async function excluirPet(idPet) {
    try {
      const documentoDeletar = doc(db, "pet", idPet);
      await deleteDoc(documentoDeletar);
      console.log("pet com ID" + idPet + "foi excluído.");
      return true;
    } catch (erro) {
      console.log("Erro ao excluir o pet", erro);
      alert("Ocorreu um erro ao excluir o pet. Tente novamente");
      return false;
    }
  }
  
  async function lidarClique(eventoDeClique) {
      const btnExcluir = eventoDeClique.target.closest(".btn-Excluir");
      if (btnExcluir) {
          const certeza = confirm("tem cetza que deseja fazer essa exclusão: ");
          if (certeza) {
              if (btnExcluir){
              const idPet = btnExcluir.dataset.id;
              const exclusaoBemSucedida = await excluirPet(idPet);
  
                  if (exclusaoBemSucedida) {
                  carregarListaDePets();
                  alert("Pet excluído com sucesso!");
                  }
              } 
          } else {
              alert("Exclusão cancelada");
          }
      }
      const btnEditar = eventoDeClique.target.closest(".btn-Editar");
  
      if (btnEditar) {
        const idPet = btnEditar.dataset.id;
        const pet = await buscarFuncionario(idPet);
  
        if (!pet) {
          alert("Funcionario nao encontrado.");
          return;
        }
        const edicao = getValoresEditar();
  
        edicao.editarNome.value = pet.nome;
        edicao.editarIdade.value = pet.idade;
        edicao.editarRaca.value = pet.cargo;
        dicao.editarPelo.value = pet.pelo   ;
        edicao.editarId.value = pet.id;
  
        edicao.formularioEdicao.style.display = "block";
      }
  }
  
  function getValoresEditar() {
    return {
      editarNome: document.getElementById("editar-nome"),
      editarIdade: document.getElementById("editar-idade"),
      editarRaca: document.getElementById("editar-raca"),
      editarPelo: document.getElementById("editar-pelo"),
      editarId: document.getElementById("editar-id"),
      formularioEdicao: document.getElementById("formularioEdicao"),
    };
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    listaPetDiv = document.getElementById("listar-pets");
    listaPetDiv.addEventListener("click", lidarClique);
    carregarListaDePets();
  });
  
  async function buscarFuncionario(id) {
    try {
      const petDoc = doc(db, "pet", id);
      const dadosBanco = await getDoc(petDoc);
  
      if (dadosBanco.exists()) {
        return { id: dadosBanco.id, ...dadosBanco.data() };
      } else {
        console.log("Pet não enxontrado com Id: " + id);
        return null;
      }
    } catch (erro) {
      console.log("Erro ao buscar funcionario ID: ", erro);
      alert("Erro ao buscar o funcionario para a edição");
      return null;
    }
  }

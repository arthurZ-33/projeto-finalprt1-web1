import { db } from "./firebaseConfig.js";
import {collection, addDoc, getDocs,getDoc, deleteDoc, doc, setDoc,} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js"

//salvar dados no banco

function getInputs(){
 return{
  nome: document.getElementById("nome"),
  idade: document.getElementById("idade"),
  raca: document.getElementById("raca"),
  pelo: document.getElementById("pelo"),
 }
}

function getValores({nome,idade,raca,pelo}){
return{
    nome: nome.value.trim(),
    idade: parseInt(idade.value),
    raca: raca.value.trim(),
    pelo: pelo.value.trim()
}
}


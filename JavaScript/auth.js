import{db, app, auth} from './firebaseConfig.js';
import{getAuth, createUserWithEmailAndPassword, 
    signInWhithEmailAndPassword, signOut, sendPasswordResetEmail, onAuthStateChagend}
from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";


const emailCadastroInput = document.getElementById("emailCadastro");
const senhaCadastroInput = document.getElementById("senhaCadastro");
const btnCadastro = document.getElementById("btnCadastro");
const mensagemCadastro = document.getElementById("mensagemCadastro");

async function cadastrarUsuario(email, senha){
    try {
        const userCredential = await  createUserWithEmailAndPassword(auth, email, senha)
        return userCredential.user;
    } catch (error){
        console.error("Erro ao cadastrar:", error.code, error.message);
        let mensagemErro = "Ocorreu um erro ao cadastrar. Tente novamente:"
        switch(error.code){
            case 'auth/email-alredy-in-use':
            mensagemErro = "Este email ja esta em uso."
            break;
            
            case 'auth/invalid-email':
            mensagemErro = "formato de email inválido."
            break;

            case 'auth/invalid-password':
                mensagemErro = "A senha deve ter pelo menos 6 caracteres"
        }
        throw{message: mensagemErro};
    }
  }

  if(btnCadastro){
    btnCadastro.addEventListener('click', async function() {
        const email = emailCadastroInput.value;
        const senha = senhaCadastroInput.value;
        mensagemCadastro.textContent = '';

        if(!email || !senha){
            mensagemCadastro.textContent = 'Por favor, preencha todos os campos'
            return;
        }

        try {
            const user = await cadastrarUsuario(email, senha);
            console.log('Usuário cadastro:', user);
            mensagemCadastro.textContent = 'Cadastro realizada com sucesso!:';
            setTimeout(function(){
                window.location.href = '../index.html';
            }, 3000);
        }catch (error) {
            mensagemCadastro.textContent = "Erro no cadastro:  ${error.mensage}";
        }
    });
  }

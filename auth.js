import{db, app, auth} from './firebaseConfig.js';
import{getAuth, createUserWithEmailAndPassword, 
    signInWithEmailAndPassword}
    from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";


//cadastro
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
            case 'auth/email-already-in-use':
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
            window.location.href ='./index.html';
            }, 3000);
        }catch (error) {
            mensagemCadastro.textContent = "Erro no cadastro:  ${error.mensage}";
        }
    });
  }


  //login
const emailLoginInput = document.getElementById("emailLogin");
const senhaLoginInput = document.getElementById("senhaLogin");
const mensagemLogin = document.getElementById("mensagemLogin");
const btnEntrar = document.getElementById("btnEntrar");

async function loginUsuario(emailLogin,senhaLogin){
    try{
        const userCredential = await signInWithEmailAndPassword(auth, emailLogin, senhaLogin);
        return userCredential.user;
    }catch (error) {
        console.log("Ocorreu erro ao logar:", error.code, error.mensage)
        }
    }

    if(btnEntrar){
    btnEntrar.addEventListener("click", async function () {
        const emailLogin = emailLoginInput.value;
        const senhaLogin = senhaLoginInput.value;
        mensagemLogin.textContent = "";

        if(!emailLogin || !senhaLogin){
            mensagemLogin.textContent= "Por favor preencher ambos";
            return;
        }
    
    try {
        const user = await loginUsuario(emailLogin,senhaLogin)
       console.log("Usuario logado:", user);
       mensagemLogin.textContent="Logado com sucesso"
       setTimeout(function(){
        window.location.href = "./../index.html";
       },3000);
    } catch (error) {
        mensagemLogin.textContent = "Erro ao insirir email ou senha."
    }
    })
    }

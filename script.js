/* 
Opção 1:

var consultaCep = fetch('https://viacep.com.br/ws/01001000/json/')
.then(resposta => resposta.json())
.then(r => {
    if (r.erro){
        throw Error('Esse Cep não existe!')
    }else
    console.log(r)})

.catch(erro => console.log(erro))
.finally(mensagem => console.log("Processamento concluído!"))

console.log(consultaCep)
*/

/*
Opção 2 com apenas um cep possivel.

async function buscaCep(){
    try{
    var consultaCep = await fetch('https://viacep.com.br/ws/01001000/json/')
    var consultaCepJSON = await consultaCep.json()
    if(consultaCepJSON){
        throw Error('CEP não Existente!')
    }
    console.log(consultaCepJSON)
}catch(erro){
    console.log(erro)
}
}

buscaCep()
*/

/*
async function buscaEndereco(cep) {
    try {
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var consultaCEPConvertida = await consultaCEP.json();
        if (consultaCEPConvertida.erro) {
            throw Error('CEP não existente!');
        }
        console.log(consultaCEPConvertida);
        return consultaCEPConvertida;
    } catch (erro) {
        console.log(erro);
    }
}

/* --- Lidando com várias requisições ao mesmo tempo com Promise.all

let ceps = ['01001000', '01001001'];
let conjuntoCeps = ceps.map(valores => buscaEndereco(valores));
console.log(conjuntoCeps);
Promise.all(conjuntoCeps).then(respostas => console.log(respostas));
*/

async function buscaEndereco(cep) {
    var mensagemErro = document.getElementById('erro')
    mensagemErro.innerHTML="";
    try {
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var consultaCEPConvertida = await consultaCEP.json();
        if (consultaCEPConvertida.erro) {
            throw Error('CEP não existente!');
        }

        var cidade = document.getElementById('cidade');
        var logradouro = document.getElementById('endereco');
        var estado = document.getElementById('estado');
        var bairro = document.getElementById('bairro');

        cidade.value = consultaCEPConvertida.localidade;
        logradouro.value = consultaCEPConvertida.logradouro;
        estado.value = consultaCEPConvertida.uf;
        bairro.value = consultaCEPConvertida.bairro;

        console.log(consultaCEPConvertida);
        return consultaCEPConvertida;
    } catch (erro) {
        mensagemErro.innerHTML=`<p>CEP Inválido. Tente Novamente!</p>`
        console.log(erro);
    }
}

var cep =document.getElementById('cep');
cep.addEventListener('focusout', () => buscaEndereco(cep.value));

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

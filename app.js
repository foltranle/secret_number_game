let listaDeNumerosSorteados = [];
let numeroMaximo = 10
let numeroSecreto = escolherNumeroAleatorio();
let tentativas = 1

function exibirTexto(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial(){
    exibirTexto('h1', 'Jogo do numero secreto');
    exibirTexto('p', `Escolha um numero de 1 a ${numeroMaximo}:`);
}

exibirMensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        exibirTexto('h1', 'Acertou!');

        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagem = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;

        exibirTexto('p', mensagem);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if (chute > numeroSecreto){
            exibirTexto('p', 'O número secreto é menor.');
        }else {
            exibirTexto('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function escolherNumeroAleatorio() {
   let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
   let quantidadesDeElementosDaLista = listaDeNumerosSorteados.length;

   if (quantidadesDeElementosDaLista == numeroMaximo) {
    listaDeNumerosSorteados = [];
   }

   if (listaDeNumerosSorteados.includes(numeroEscolhido)){
    return escolherNumeroAleatorio();
   } else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
   }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = escolherNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
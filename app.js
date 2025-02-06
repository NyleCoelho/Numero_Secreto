let listaNUmeros = [];
let numeroLimite = 3;

let numeroSecreto = gerarNumero(); //gera numero secreto
let tentativas = 1 //armazena a quantidade de tentativas do usuario

mensagemInicial()

function gerarNumero() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeLista =  listaNUmeros.length;

    if (quantidadeLista == numeroLimite) {
        listaNUmeros = [];
    }

    if (listaNUmeros.includes(numeroEscolhido)) {
        return gerarNumero();
    }
    else {
        listaNUmeros.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function exibirTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 0.7; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function mensagemInicial() {
    exibirTexto('h1', 'Jogo do Numero Secreto');
    exibirTexto('p', 'Escolha um numero entre 1 e 100');
}

function verificarChute() {
    let chute = document.querySelector('input').value; //define o chute como o resultado do input que esta no html
    
    if (chute == numeroSecreto) {
        exibirTexto('h1', 'Parabens!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let tentativaMsg = `Voce descobriu o numero secreto com ${tentativas} ${palavraTentativa}`;
        exibirTexto('p', tentativaMsg);

        document.getElementById('reiniciar').removeAttribute('disabled');
    } 
    
    else {
        if (chute > numeroSecreto){
            exibirTexto('p', 'O numero secreto e menor');
            limparCampo();

        }
        
        else {
            exibirTexto('p','O numero secreto e maior');
            limparCampo();
        }
        
        tentativas++;
    }
}

function limparCampo (){
    chute = document.querySelector('input');
    chute.value = " ";
}

function reiniciarJogo() {
    numeroSecreto = gerarNumero();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);

}

let numeros = [1, 5, 9]
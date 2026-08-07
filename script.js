const imagens = [

"foto1.jpeg",
"foto2.jpeg",
"foto3.jpeg",
"foto4.jpeg",
"foto5.jpeg",
"foto6.jpeg",
"foto7.jpeg",
"foto8.jpeg"

];


let cartas = [];

let primeiraCarta = null;

let segundaCarta = null;

let bloqueado = false;

let pares = 0;



function criarJogo(){


    const tabuleiro = document.getElementById("tabuleiro");

    tabuleiro.innerHTML="";


    cartas = [...imagens, ...imagens];


    cartas.sort(()=>Math.random()-0.5);



    cartas.forEach((imagem)=>{


        let carta=document.createElement("div");

        carta.classList.add("carta");


        carta.dataset.imagem=imagem;



        carta.innerHTML=`

        <div class="conteudo">


            <div class="frente">

                <img src="${imagem}">

            </div>


            <div class="verso">

                <img src="verso.jpg">

            </div>


        </div>

        `;


        carta.addEventListener("click", virarCarta);



        tabuleiro.appendChild(carta);



    });


}



function virarCarta(){


    if(bloqueado) return;


    if(this.classList.contains("virada")) return;


    this.classList.add("virada");



    if(!primeiraCarta){


        primeiraCarta=this;


    }

    else{


        segundaCarta=this;


        verificarPar();



    }



}



function verificarPar(){


    let acertou = 
    primeiraCarta.dataset.imagem === segundaCarta.dataset.imagem;



    if(acertou){


        primeiraCarta.removeEventListener("click",virarCarta);

        segundaCarta.removeEventListener("click",virarCarta);


        pares++;


        limparCartas();



        if(pares===8){

            document.getElementById("mensagem")
            .innerHTML=
            "🎉 Parabéns! Você encontrou todas as fotos!";

        }



    }

    else{


        bloqueado=true;


        setTimeout(()=>{


            primeiraCarta.classList.remove("virada");

            segundaCarta.classList.remove("virada");


            limparCartas();



        },1000);


    }



}



function limparCartas(){

    primeiraCarta=null;

    segundaCarta=null;

    bloqueado=false;

}



function reiniciar(){

    pares=0;

    limparCartas();


    document.getElementById("mensagem")
    .innerHTML="";


    criarJogo();

}



criarJogo();

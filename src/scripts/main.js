document.getElementById("help").addEventListener("click",()=>{playAudio("./src/click.mp3");Swal.fire('Instrucciones','Empiezas el juego con 25 giros para la ruleta, en esos 25 giros deberas juntar 80 o mas puntos para ganar la partida, hay 11 casillas sobre calculos, estas son: calculos combinados, division, multiplicacion, potenciacion, radicacion, resta, suma, numeros primos, multiplos, ecuaciones y simela, si respondes correctamente una pregunta se te sumara un carpincho dorado, si consigues sumar 5 carpinchos dorados podes hacer que alguien mas siga jugando (Max. 5 jugadores), si tenes 1 o mas carpinchos dorados y perdes una pregunta, se restablecera a 0. cada pregunta te suma 5 puntos y si fallas te restara 5, y le toca a la siguiente persona (las personas las elige el profesor). hay una probabilidad de que no toque ninguna casilla, perdiendo 1 giro.','question');});

document.getElementById("play",()=>playAudio("./src/click.mp3"));

localStorage.clear();
localStorage.setItem("points","0");
localStorage.setItem("goldenCapybara","0");
localStorage.setItem("spinsLeft","25");
localStorage.setItem("time","25");
document.getElementById("numero").addEventListener("change", () => {
  localStorage.setItem("time",document.getElementById("numero").value);
})

document.getElementById("giros").addEventListener("change", () => {
  localStorage.setItem("spinsLeft",document.getElementById("giros").value);
})

function playAudio(src){let audio=new Audio();audio.src=src;audio.play();}

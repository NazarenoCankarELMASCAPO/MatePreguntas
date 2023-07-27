if(parseInt(localStorage.getItem("spinsLeft")) <= 0) window.location.href = "final.html"

document.getElementById("spinsLeft").innerText = `Giros restantes: ${parseInt(localStorage.getItem("spinsLeft"))}`
document.getElementById("points").innerText = `Puntaje: ${parseInt(localStorage.getItem("points"))}`

let canvas = document.getElementById("canvas");
canvas.width = window.innerWidth
canvasWidth = window.innerWidth + 900;
let ctx = canvas.getContext("2d");

let clicked = false
let roulette = ["Potenciacion", "Radicacion", "Suma", "Resta", "Multiplicacion", "Division", "Calculos combinados", "Simela", "Multiplos", "Primos", "Ecuaciones"];
let roulettePositions = [];
let rouletteSegmentSeparation = canvasWidth / roulette.length;
let rouletteSegmentSize = canvasWidth / roulette.length;
let rouletteOpt = ["division", "multiplicacion", "potenciacion", "radicacion", "resta", "suma", "calculos-combinados", "simela", "multiplos", "primos", "ecuaciones"];
let rouletteImages = [];
let stick = {
  x: canvas.width / 2 - 5,
  y: -5,
  w: 5,
  h: 75,
};
canvas.height = rouletteSegmentSize;
let stickImage = new Image();
stickImage.src = window.location.href + "/../../img/arrow.png";

rouletteOpt.forEach((x, i) => {
  let img = new Image();
  img.src = window.location.href + "/../../img/" + x + ".jpg";
  rouletteImages.push(img);
});

roulette.forEach((x, i) => {
  roulettePositions.push({
    x: rouletteSegmentSeparation * i,
    y: 0,
    w: rouletteSegmentSize,
    h: rouletteSegmentSize,
    n: rouletteOpt[i],
  });
});

let velocityX = 0;

let tickSound = new Audio("../tick.wav");
let tickInterval = null

function update() {
  ctx.clearRect(0, 0, canvasWidth, canvas.height);
  
  roulette.forEach((x, i) => {
    let rouletteSegment = roulettePositions[i];
    ctx.drawImage(rouletteImages[i], rouletteSegment.x, rouletteSegment.y, rouletteSegment.w, rouletteSegment.h);
    rouletteSegment.x += velocityX
    if (rouletteSegment.x > canvasWidth) rouletteSegment.x = -rouletteSegment.w /2;
  });

  if(velocityX == 0) clearInterval(tickInterval)

  ctx.drawImage(stickImage, stick.x - 30, stick.y, 70, stick.h);
}

function spin() {  
  velocityX = 25;

  setTimeout(() => {
    let closestSegment = null;
    let closestDistance = Infinity;

    roulettePositions.forEach((x, i) => {
      const distance = Math.abs((stick.x + stick.w / 2) - (x.x + x.w / 2));
      if (distance < closestDistance && isColliding(x, stick)) {
        closestSegment = x;
        closestDistance = distance;
      } else if (i == roulettePositions.length - 1){
        velocityX = 0;
        Swal.fire({
          title: "Te toco...",
          text: "NADA. Vuelve a girar :)"
        })
        clicked = false
        velocityX = 0;
        if(parseInt(localStorage.getItem("spinsLeft")) <= 0) window.location.href = "final.html"
        return
      }
    });

    velocityX = 0;
    localStorage.setItem("spinsLeft", localStorage.getItem("spinsLeft") - 1)
    document.getElementById("spinsLeft").innerText = `Giros restantes: ${parseInt(localStorage.getItem("spinsLeft"))}`

    Swal.fire({
      title: "Te tocó...",
      text: closestSegment.n.replace("-", " "),
      position: "top"
    }).then(x => {
      if(x){
        window.location.href = `${window.location}/../preguntas/${closestSegment.n}.html`;
      }
    })
  }, 1000 * ((Math.random() * 8) + 2));
}

document.getElementById("spinsLeft").innerText = `Giros restantes: ${parseInt(localStorage.getItem("spinsLeft"))}`
document.getElementById("points").innerText = `Puntaje: ${parseInt(localStorage.getItem("points"))}`
document.getElementById("goldenCapybara").innerText = `${localStorage.getItem("goldenCapybara")} / 5`

document.getElementById("spin").addEventListener("click", () => {
  if(clicked) return
  clicked = true
  tickInterval = setInterval(() => playAudio("../tick.wav"), 1000/7)
  spin()
});

setInterval(update, 1000/60)

function playAudio(src) {
  let audio = new Audio()
  audio.src = src
  audio.play()
}

function isColliding(a, b) {
  if ((b.x > a.x && b.x + b.w < a.x + a.w) || (b.x < a.x + a.w && b.x > a.x && b.x + b.w > a.x + a.w) || (b.x < a.x && b.x + b.w > a.x && a.x + a.w > b.x + b.w)) return true;
  return false;
}

let mCanvas = document.getElementById("maradonaCanvas");
let mCtx = mCanvas.getContext("2d");
let maradonaImage = new Image();
maradonaImage.src = "../img/maradona.jpg";

mCanvas.width = window.innerWidth;
mCanvas.height = window.innerHeight;
mCanvas.style.zIndex = "-3";
mCanvas.style.position = "absolute";
mCanvas.style.left = "0";
mCanvas.style.top = "0";

let maradonasOnScreen = [];
const maxMaradonasOnScreen = 10;

function spawnMaradona() {
  if (maradonasOnScreen.length < maxMaradonasOnScreen) {
    maradonasOnScreen.push({
      x: Math.random() * mCanvas.width,
      y: mCanvas.height,
      w: 120,
      h: 120,
      vy: -((Math.random() * (30 - 15)) + 15),
      weight: 1,
      angle: 0,
      visible: true, // Añadir el atributo "visible"
    });
  }
}

function update() {
  mCtx.clearRect(0, 0, mCanvas.width, mCanvas.height);

  maradonasOnScreen.forEach((m, i) => {
    m.y += m.vy;
    m.vy += m.weight;

    mCtx.save();
    mCtx.translate(m.x, m.y);
    mCtx.rotate((m.angle * Math.PI) / 180);
    if (m.visible) {
      mCtx.drawImage(maradonaImage, 0, 0, m.w, m.h);
    }
    m.angle++
    mCtx.restore();

    if (m.y > mCanvas.height) {
      m.visible = false; // Marcar como no visible
    }

  });

  // Actualizar el arreglo maradonasOnScreen eliminando las instancias no visibles
  maradonasOnScreen = maradonasOnScreen.filter((m) => m.visible);

  requestAnimationFrame(update);
}

spawnMaradona();

setInterval(spawnMaradona, 1000 / 3);
requestAnimationFrame(update);

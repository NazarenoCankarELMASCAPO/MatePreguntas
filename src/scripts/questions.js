let correctAnswer = "";

function getRandomQuestion(e) {
  let t = questions[e][Math.floor(Math.random() * questions[e].length)];
  return t;
}

function setQuestionToText(e) {
  let t = getRandomQuestion(e);
  document.getElementById("question").innerText = t.question;
  for (let e = 1; e <= 3; e++) {
    document.getElementById(`option-${e}`).innerText = t[`option-${e}`];
  }
  correctAnswer = t.correct;

  const speech = window.speechSynthesis
  const utterThis = new SpeechSynthesisUtterance(t)
  speech.speak(utterThis)
}

let option1 = document.getElementById("option-1");
let option2 = document.getElementById("option-2");
let option3 = document.getElementById("option-3");
let options = [option1, option2, option3];

option1.style.width = "400px";
option2.style.width = "400px";
option3.style.width = "400px";

let clicked = false;

document.getElementById("timer").style.width = "300px";

let time = parseInt(localStorage.getItem("time"));
let timer = setInterval(() => {
  time--;
  playAudio("../../tick.wav");
}, 1000);

options.forEach((e) => {
  e.addEventListener("click", () => {
    if (clicked) return;
    if (e.innerText == correctAnswer) {
      e.classList = "btn btn-success d-block ms-auto me-auto mt-4";
      localStorage.setItem("points", parseInt(localStorage.getItem("points")) + 5);
      localStorage.setItem("goldenCapybara", parseInt(localStorage.getItem("goldenCapybara")) + 1);
      clearInterval(timer);
      playAudio("../../correct.mp3");
      setTimeout(() => playAudio("../../acertaste.mp3"), 500);
      setTimeout(() => {
        if (parseInt(localStorage.getItem("goldenCapybara")) >= 5)
          return (window.location.href = "../carpincho-dorado.html");
        if (parseInt(localStorage.getItem("spinsLeft")) <= 0)
          return (window.location.href = "../final.html");
        window.location.href = window.location + "/../../ruleta.html";
      }, 4700);
    } else {
      e.classList = "btn btn-danger d-block ms-auto me-auto mt-4";
      options.forEach((t) => {
        if (t.innerText == correctAnswer) {
          t.classList = "btn btn-success d-block ms-auto me-auto mt-4";
        }
      });
      clearInterval(timer);
      localStorage.setItem("points", parseInt(localStorage.getItem("points")) - 5);
      localStorage.setItem("goldenCapybara", 0);
      playAudio("../../wrong.mp3");
      setTimeout(() => playAudio("../../fallaste.mp3"), 600);
      setTimeout(() => {
        if (parseInt(localStorage.getItem("goldenCapybara")) >= 5)
          return (window.location.href = "../carpincho-dorado.html");
        if (parseInt(localStorage.getItem("spinsLeft")) <= 0)
          return (window.location.href = "../final.html");
        window.location.href = window.location + "/../../ruleta.html";
      }, 5200);
    }
    clicked = true;
  });
});

let itsOver = false;

function update() {
  if (time <= 0 && !itsOver) {
    itsOver = true;
    localStorage.setItem("points", parseInt(localStorage.getItem("points")) - 5);
    localStorage.setItem("goldenCapybara", 0);
    if (parseInt(localStorage.getItem("spinsLeft")) <= 0) {
      window.location.href = "../final.html";
    } else if (parseInt(localStorage.getItem("goldenCapybara")) >= 5) {
      window.location.href = "../carpincho-dorado.html";
    } else {
      window.location.href = window.location + "/../../ruleta.html";
    }
  }
  document.getElementById("timer").innerText = `Tiempo restante: ${time}s`;
  requestAnimationFrame(update);
}



update();

function playAudio(e) {
  let t = new Audio();
  t.src = e;
  t.play();
}

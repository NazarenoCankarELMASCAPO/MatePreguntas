let question = ""
let answer = ""
let time = 30
let score = 0
localStorage.setItem("score", score)

let questionObj = document.getElementById("question")
let timeObj = document.getElementById("time")
let answerInput = document.getElementById("respuesta")
let submitBtn = document.getElementById("submit")
let scoreObj = document.getElementById("score")

start()

// EVENTOS

  submitBtn.addEventListener("click", () => {
    if (answerInput.value == answer) {
        score += 5
    } else {
        score -= 5
    }

    localStorage.setItem("score", score)

    answerInput.value = ""
    
    start()
  })

// ^^^^^^^

let interval = setInterval(() => {
    time--
    timeObj.innerText = time + "s"
    playAudio("../../tick.wav");

    if(time === 0) {
        window.location.href = window.location + "/../final.html";

        clearInterval(interval)
    }
}, 1000)
setInterval(() => scoreObj.innerText = `Puntos: ${score}`)

function createQuestion() {
    const terminos = parseInt(3 + Math.random() * 2);
    
    const op = ["+", "*"]

    let q = ""
    for(i = 1; i <= terminos; i++) {
        q += parseInt(3 + Math.random() * 6) + " "
        if(i != terminos) q += op[parseInt(Math.random() * op.length)] + " "
        
    }

    return q
}

function start() {
    question = createQuestion()
    answer = eval(question)
    time = 30

    questionObj.innerText = question
}

function playAudio(e) {
  console.log("Playing audio:", e);
  let t = new Audio();
  t.src = e;
  t.play();
}

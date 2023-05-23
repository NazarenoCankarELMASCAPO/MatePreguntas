let correctAnswer = ""
function getRandomQuestion(type){
    let wholeQuestion = questions[type][Math.floor(Math.random() * questions[type].length)]
    return wholeQuestion
}

function setQuestionToText(type){
    let wholeQuestion = getRandomQuestion(type)
    document.getElementById("question").innerText = wholeQuestion.question
    for(let i = 1; i <= 3; i++){
        document.getElementById(`option-${i}`).innerText = wholeQuestion[`option-${i}`]
    }
    correctAnswer = wholeQuestion.correct
}

let option1 = document.getElementById("option-1")
let option2 = document.getElementById("option-2")
let option3 = document.getElementById("option-3")
let options = [option1, option2, option3]

option1.style.width = "400px"
option2.style.width = "400px"
option3.style.width = "400px"

let clicked = false

document.getElementById("timer").style.width = "300px"
let time = 25
let timer = setInterval(() => {
    time--
    playAudio("../../tick.wav")
}, 1000)

options.forEach(x => {
    x.addEventListener("click", () => {
        if(clicked) return
        if(x.innerText == correctAnswer) {
            x.classList = "btn btn-success d-block ms-auto me-auto mt-4"
            localStorage.setItem("points", parseInt(localStorage.getItem("points")) + 5)
            localStorage.setItem("goldenCapybara", parseInt(localStorage.getItem("goldenCapybara")) + 1)

            clearInterval(timer)
            
            playAudio("../../correct.mp3")
            setTimeout(() => playAudio("../../acertaste.mp3"), 500);
            setTimeout(() => {
                if(parseInt(localStorage.getItem("goldenCapybara")) >= 5) return window.location.href = "../carpincho-dorado.html"
                if(parseInt(localStorage.getItem("spinsLeft")) <= 0) return window.location.href = "../final.html"
                window.location.href = window.location + "/../../ruleta.html"
            }, 4700);
        }
        
        else {
            x.classList = "btn btn-danger d-block ms-auto me-auto mt-4"
            options.forEach(y => {
                if(y.innerText == correctAnswer) y.classList = "btn btn-success d-block ms-auto me-auto mt-4"
            })
            clearInterval(timer)
            localStorage.setItem("points", parseInt(localStorage.getItem("points")) - 5)
            localStorage.setItem("goldenCapybara", 0)
            
            playAudio("../../wrong.mp3")
            setTimeout(() => playAudio("../../fallaste.mp3"), 600);
            setTimeout(() => {
                if(parseInt(localStorage.getItem("goldenCapybara")) >= 5) return window.location.href = "../carpincho-dorado.html"
                if(parseInt(localStorage.getItem("spinsLeft")) <= 0) return window.location.href = "../final.html"
                window.location.href = window.location + "/../../ruleta.html"
            }, 5200);
        }
        
        clicked = true
    })
})

let itsOver = false
function update() {
    if(time <= 0 && !itsOver) {
        itsOver = true
        localStorage.setItem("points", parseInt(localStorage.getItem("points")) - 5)
        localStorage.setItem("goldenCapybara", 0)
        if(parseInt(localStorage.getItem("spinsLeft")) <= 0) return window.location.href = "../final.html"
        if(parseInt(localStorage.getItem("goldenCapybara")) >= 5) return window.location.href = "../carpincho-dorado.html"
        window.location.href = window.location + "/../../ruleta.html"
    }

    document.getElementById("timer").innerText = `Tiempo restante: ${time}s`

    requestAnimationFrame(update)
}

update()

function playAudio(src) {
    let audio = new Audio()
    audio.src = src
    audio.play()
}


// OPCION 1: ELEGIR SIGUIENTE PERSONA
// OPCION 2: +10 puntos
// OPCION 3: +3 giros

Swal.fire({
    title: "RAYOS Y CENTELLAS",
    text: "HAS CONSEGUIDO AL CARPINCHO DORADO!"
}).then(x => {
    if(x) playAudio("../soy.mp3")
})

let option1 = document.getElementById("option-1")
let option2 = document.getElementById("option-2")
let option3 = document.getElementById("option-3")
let clicked = false

option1.addEventListener("click", () => {
    if(clicked) return
    clicked = true
    playAudio("../correct.mp3")

    
    option1.classList.replace("btn-secondary", "btn-success")
    setTimeout(() => {
        if(parseInt(localStorage.getItem("spinsLeft")) <= 0) return window.location.href = "./final.html"
        window.location.href = window.location + "/../ruleta.html"
    }, 1000)
})

option2.addEventListener("click", () => {
    if(clicked) return
    clicked = true
    playAudio("../correct.mp3")


    option2.classList.replace("btn-secondary", "btn-success")
    localStorage.setItem("points", parseInt(localStorage.getItem("points")) + 10)
    setTimeout(() => {
        if(parseInt(localStorage.getItem("spinsLeft")) <= 0) return window.location.href = "./final.html"
        window.location.href = window.location + "/../ruleta.html"
    }, 1000)
})

option3.addEventListener("click", () => {
    if(clicked) return
    clicked = true
    playAudio("../correct.mp3")

    
    option3.classList.replace("btn-secondary", "btn-success")
    localStorage.setItem("spinsLeft", parseInt(localStorage.getItem("spinsLeft")) + 3)
    setTimeout(() => {
        if(parseInt(localStorage.getItem("spinsLeft")) <= 0) return window.location.href = "./final.html"
        window.location.href = window.location + "/../ruleta.html"
    }, 1000)
})

localStorage.setItem("goldenCapybara", "0")

function playAudio(src) {
    let audio = new Audio()
    audio.src = src
    audio.play()
}
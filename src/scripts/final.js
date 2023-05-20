if(parseInt(localStorage.getItem("points")) >= 80) {
    // GANA

    document.querySelector("img").src = "../img/imagen_ganaste.jpg";
    document.getElementById("message").innerText = "Aprobaste!"
    document.getElementById("message").classList += " bg-success"

    Swal.fire({
        title: "Ganaste!",
        text: "Acabaste la partida con: " + localStorage.getItem("points") + " puntos"
    }).then(x => {
        if(x) {
            playAudio("../genio.mp3")

            setTimeout(() => {
                document.querySelector("img").classList += " image-animation"

                let audio = new Audio()
                audio.src = "../win.mp3"
                audio.loop = true
                audio.play()
            }, 3800)
        }
    })
} else if(parseInt(localStorage.getItem("points")) < 110) {
    // PIERDE
    
    document.getElementById("message").innerText = "¡¡¡FELICIDADES!!! ¡reprobaste!"
    document.getElementById("message").classList += " bg-danger"
    document.querySelector("img").src = "../img/imagen_perdiste.jpg";
    Swal.fire({
        title: "Perdiste...",
        text: "Acabaste la partida con: " + localStorage.getItem("points") + " puntos"
    }).then(x => {
        if(x) {
            playAudio("../malo.mp3")

            setTimeout(() => {
                document.querySelector("img").classList += " image"

                let audio = new Audio()
                audio.src = "../circus.mp3"
                audio.loop = true
                audio.play()
            }, 4700)
        }
    })
}

function playAudio(src) {
    let audio = new Audio()
    audio.src = src
    audio.play()
}

// 13

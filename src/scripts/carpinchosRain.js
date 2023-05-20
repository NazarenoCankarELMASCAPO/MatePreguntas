let canvas = document.getElementById("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight - 100
canvas.style.position = "absolute"
canvas.style.zIndex = -1

let ctx = canvas.getContext("2d")

function loadImage(src) {
    let img = new Image()
    img.src = src
    return img
}

let imgSrc = []
function saveSrc() {
    for (let i = 1; i <= 7; i++) {
        imgSrc.push(`./src/img/carpincho-${i}.jpg`)
    }
}

function getRandomImage() {
    return loadImage(imgSrc[Math.floor(Math.random() * imgSrc.length)])
}

let imagesOnScreen = []

saveSrc()
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    imagesOnScreen.forEach((img, i) => {
        ctx.save()
        ctx.translate(img.x, img.y)
        ctx.rotate((img.angle % 360) * Math.PI / 180)
        if (canvas.height - img.y < 200) {
            const alpha = (canvas.height - img.y) / 200;
            ctx.globalAlpha = Math.max(alpha, 0);
        }
        ctx.drawImage(img.src, 0, 0, img.w, img.h)
        img.y += img.vy
        img.x += img.dir * 0.3
        img.angle += img.dir
        ctx.restore()

        if(img.y + img.h > canvas.height + 350) imagesOnScreen.splice(i, 1)
    })
    

    requestAnimationFrame(update)

}

function spawnCarpincho() {
    let size = (Math.random() * (90 - 40)) + 40
    imagesOnScreen.push({
        src: getRandomImage(),
        w: size,
        h: size,
        x: Math.random() * (canvas.width - size),
        y: -450,
        vy: 2,
        angle: Math.random() * 90,
        dir: Math.random() > 0.5 ? -0.2 : 0.2
    })
}
spawnCarpincho()
setInterval(() => spawnCarpincho(), 800)

update()
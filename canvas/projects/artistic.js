const canvas = document.getElementById("canvas");
const Board = {
    context: canvas.getContext("2d"),
    width: 1600,
    height: 900
}

console.log(Board);

function pyramid(ctx, n, x) {
    let h = 900-625*n
    ctx.beginPath()
    ctx.lineWidth = 2
    ctx.strokeStyle = '#386da7'
    ctx.fillStyle = '#2b94da'
    ctx.moveTo(x+100, 1000)
    ctx.lineTo(x+800*n, h)
    ctx.lineTo(x+1050*n, 1000)
    ctx.stroke()
    ctx.fill()
    ctx.beginPath()
    ctx.stokeStyle = '#386da7'
    ctx.fillStyle = '#386da7'
    ctx.moveTo(x+800*n, h)
    ctx.lineTo(x+1500*n, 1000)
    ctx.lineTo(x+1050*n, 1000)
    ctx.stroke()
    ctx.fill()
}

function cloud(ctx, x, y, n) {
    let r = 30
    ctx.beginPath()
    ctx.fillStyle = 'white'
    ctx.moveTo(x, y)
    ctx.lineTo(x+n, y)
    ctx.arc(x+n, y+r, r, 1.5*Math.PI, 0.5*Math.PI)
    ctx.lineTo(x, y+r*2)
    ctx.arc(x, y+r, r, 2.5*Math.PI, 1.5*Math.PI)
    ctx.fill()
}

function connect(ctx, x, y) {
    let r = 7.5
    let l = 75
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.arc(x, y+r, r, 1.5*Math.PI, 0.5*Math.PI)
    ctx.lineTo(x+l, y+r*2)
    ctx.arc(x+l, y+r, r, 0.5*Math.PI, 1.5*Math.PI)
    ctx.fill()
}

function tower(ctx) {
    //roof
    ctx.fillStyle = '#e5545d'
    ctx.beginPath()
    ctx.moveTo(917.5, 355)
    ctx.lineTo(940, 260)
    ctx.lineTo(940, 355)
    ctx.fill()
    ctx.fillStyle = '#c5303c'
    ctx.beginPath()
    ctx.moveTo(940, 260)
    ctx.lineTo(962.5, 355)
    ctx.lineTo(940, 355)
    ctx.fill()

    //borders
    ctx.fillStyle = 'white'
    ctx.fillRect(935, 265, 10, 3)
    ctx.fillRect(937.5, 225, 5, 40)
    ctx.fillStyle = '#ffe3d6'
    ctx.fillRect(915, 355, 50, 5)

    //flag
    ctx.fillStyle = '#e5545d'
    ctx.fillRect(942, 225, 70, 12)
    ctx.fillStyle = '#c5303c'
    ctx.beginPath()
    ctx.moveTo(977, 237)
    ctx.lineTo(977+70, 237)
    ctx.lineTo(977+70-10, 237+6)
    ctx.lineTo(977+70, 237+12)
    ctx.lineTo(977, 237+12)
    ctx.fill()

    //tower
    ctx.fillStyle = '#c6b199'
    ctx.fillRect(920, 360, 20, 80)
    ctx.fillStyle = '#988172'
    ctx.fillRect(940, 360, 20, 80)

    ctx.fillStyle = '#606060'
    window(ctx, 940, 390, 7, 22)

    //red thingy
    ctx.fillStyle = '#c5303c'
    ctx.fillRect(810, 440, 120, 40)
    ctx.beginPath()
    ctx.moveTo(810, 440)
    ctx.lineTo(760, 480)
    ctx.lineTo(810, 480)
    ctx.fill()

    ctx.fillStyle = '#e19a7c'
    ctx.fillRect(790, 480, 150, 50)
    ctx.fillStyle = '#de7452'
    ctx.fillRect(790, 530, 150, 60)

    ctx.fillStyle = '#606060'
    ctx.fillRect(790, 480, 150, 10)
    ctx.fillRect(820, 495, 22.5, 25)
    ctx.fillRect(865, 495, 22.5, 25)

    ctx.fillStyle = '#ab5743'
    ctx.fillRect(785, 530, 150, 10)
    ctx.fillStyle = '#7e523f'
    ctx.fillRect(815, 540, 10, 60)
    ctx.fillRect(850, 540, 10, 60)
    ctx.fillRect(885, 540, 10, 60)

    //tower
    ctx.fillStyle = '#d7cab6'
    ctx.beginPath()
    ctx.moveTo(900, 440)
    ctx.lineTo(940, 440)
    ctx.lineTo(940, 480)
    ctx.lineTo(915, 480)
    ctx.fill()
    ctx.fillRect(915, 480, 25, 110)
    ctx.fillStyle = '#c5b198'
    ctx.beginPath()
    ctx.moveTo(940, 440)
    ctx.lineTo(980, 440)
    ctx.lineTo(965, 480)
    ctx.lineTo(940, 480)
    ctx.fill()
    ctx.fillRect(940, 480, 25, 110)

    ctx.fillStyle = '#787979'
    window(ctx, 940, 490, 8.5, 27)
    window(ctx, 940, 545, 8.5, 27)

    //big
    ctx.fillStyle = '#d7cab6'
    ctx.fillRect(700, 590, 400, 400)
}

function window(ctx, x, y, r, l) {
    ctx.beginPath()
    ctx.moveTo(x-r, y)
    ctx.arc(x, y, r, Math.PI, 0)
    ctx.fill()
    ctx.fillRect(x-r, y, r*2, l)
}

function draw() {
    const canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');

        ctx.fillRect(0, 0, 1600, 900)
  
        //pyramid
        pyramid(ctx, 1, 0)
        pyramid(ctx, 0.7, 520)
        
        //cloud
        cloud(ctx, 465, 360, 155)
        cloud(ctx, 520, 435, 155)
        connect(ctx, 545, 420)
        cloud(ctx, 125, 495, 155)
        cloud(ctx, 1180, 185, 155)
        cloud(ctx, 1125, 260, 155)
        connect(ctx, 1185, 245)
        cloud(ctx, 1400, 585, 77.5)

        //tower
        tower(ctx)
    }
  }  

draw()

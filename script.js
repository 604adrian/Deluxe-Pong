const n = window.innerWidth / 145;
const num = `${n<6 ? 6 : n }`;

const ball = {
  x: 100,
  y: 100,
  vx: num/1.3,
  vy: (num/2)/1.3,
  count: 1,
  radius: 10,
  color: "aliceblue",
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.fillStyle = this.color;
    ctx.fill();
  },
}

function createStrip(why) {
  return {
    x: 0,
    y: why,
    width: window.innerWidth,
    height: 45,
    colour: 'black',
    draw() {
      ctx.beginPath();
      ctx.fillStyle = this.colour;
      ctx.fillRect(this.x, this.y, this.width, this.height)
      ctx.fill();
      ctx.fillStyle = 'white';
    }
  }
}

function createPaddle(ex) {
  return {
    x: ex,
    y: canvas.width/5,
    height: 100,
    width: 20,
    vx: 5,
    vy: 0,
    count: 1,
    colour: "azure",
    highScore: 0,
    draw() {
      ctx.beginPath();
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = this.colour;
      ctx.fill();
    },
  }
}

const paddle1 = createPaddle(30);
const paddle2 = createPaddle(canvas.width-55);

function createScore(p,ex,why) {
  return {
    player: p,
    count: 0,
    x: ex,
    y: why,
    draw() {
      ctx.beginPath();
      ctx.font = "20px Silkscreen";
      ctx.fillStyle = 'white';
      ctx.fillText(`${this.player}: ${this.count}`, this.x, this.y);
    }
  }
}

const score = createScore('PLAYER ONE', 20, 30);
const p2 = 'PLAYER TWO';
const score2 = createScore(p2, canvas.width-(p2.length*20), 30);

const start = {
  count: 0,
  message: `${startCount<1 ? 'start again' : 'start'}`,
  draw() {
    paddle1.y = canvas.height / 3;
    score.count = 0;
    ctx.beginPath();
    ctx.font = "25px Silkscreen";
    ctx.fillStyle = 'white'
    ctx.fillText(`start`, 100, 100);
  }
}

function clear(perc="50%") {
  ctx.fillStyle = `rgb(11 25 59 / ${perc})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}


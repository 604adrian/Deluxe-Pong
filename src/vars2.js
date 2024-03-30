const ball = {
  x: (canvas.width + 10) / 2,
  y: canvas.height/2,
  vx: 10/1.3,
  vy: 5/1.3,
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

function createPaddle(ex) {
  return {
    x: ex,
    y: window.innerWidth/5,
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
    reset() {
      this.y = window.innerWidth/5;
    }
  }
}

const paddle1 = createPaddle(30);
const paddle2 = createPaddle(window.innerWidth-55);

function createScore(p,ex,why) {
  return {
    player: p,
    count: 0,
    x: ex,
    y: why,
    fontSize: 20,
    draw() {
      ctx.beginPath();
      ctx.font = `${this.fontSize}px Silkscreen`;
      ctx.fillStyle = 'white';
      ctx.fillText(`${this.player}: ${this.count}`, this.x, this.y);
    }
  }
}

const score = createScore('PLAYER ONE', 20, 30);
const p2 = 'PLAYER TWO';
const score2 = createScore(p2, window.innerWidth-(p2.length*20), 30);

const start = {
  count: 0,
  draw() {
    paddle1.y = window.innerHeight / 3;
    score.count = 0;
    ctx.beginPath();
    ctx.font = "25px Silkscreen";
    ctx.fillStyle = 'white'
    ctx.fillText(`start`, 100, 100);
  }
}

function clear(perc="50%") {
  ctx.fillStyle = `rgb(11 25 59 / ${perc})`;
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
}


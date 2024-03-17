const ball = {
  x: 100,
  y: 100,
  vx: 5/1.3,
  vy: 1/1.3,
  count: 1,
  radius: 10,
  color: "aliceblue",
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    //ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  },
};

const paddle1 = {
  x: 30,
  y: 10,
  height: 100,
  width: 20,
  vx: 5,
  vy: 0,
  count: 1,
  color: "azure",
  draw() {
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, this.width, this.height);
    //ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  },
};

const score = {
  count: 0,
  draw() {
    ctx.beginPath();
    ctx.font = "25px Silkscreen";
    ctx.fillStyle = 'white';
    ctx.fillText(`${this.count}`, 564, 36);
  }
}

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

const overMg = (() => {
  if (!running) {
    backgroud.stop()
    ctx.beginPath();
    ctx.font = "60px Silkscreen";
    setTimeout(() => {
      if (!running) {
        whoops.play();
        ctx.fillStyle = "rgb(153 0 0 / 30%)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
      }
    }, 1000);
    setTimeout(() => {
      if (!running) {
        ctx.fillText('GAME ', canvas.width/3, canvas.height/4)
      }
    }, 2000);
    setTimeout(() => {
      if (!running) {
        ctx.fillText('OVER', canvas.width/3, canvas.height/2)
      }
    }, 3000);
    setTimeout(() => {
      if (!running) {
        ctx.font = "15px Silkscreen";
        ctx.fillText(
          'click anywhere ', canvas.width/2.8, (canvas.height/3)*2.3
        );
        ctx.fillText(
          'to restart', canvas.width/2.8, (canvas.height/3)*2.5
        );
     }
    }, 4000);
  }
})

function clear() {
  ctx.fillStyle = "rgb(0 0 0 / 30%)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

let lastTs = Date.now();
function draw() {
  clear();
  const delta = Date.now() - lastTs;
  lastTs = Date.now();

  ball.draw();
  paddle1.draw();
  score.draw()

  if (ball.count<3) {
    ball.x += ball.vx*ball.count;
    ball.y += ball.vy*ball.count;
  } else {
    ball.x += ball.vx+3;
    ball.y += ball.vy+3;
  }

  paddle1.y += (paddle1.vy * delta / 10) * (paddle1.count*1.5);
  if (paddle1.y + paddle1.vy > canvas.height) { 
    paddle1.y = 0 - paddle1.height;
  } else if (paddle1.y + paddle1.vy < 0 - paddle1.height) {
    paddle1.y = canvas.height - paddle1.vy;
  }

  if (
    ball.y + ball.vy > canvas.height - ball.radius ||
    ball.y + ball.vy < ball.radius
  ) {
    ball.vy = -ball.vy;
  }
  if (
    ball.x + ball.vx > canvas.width - ball.radius ||
    ball.x + ball.vx < ball.radius
  ) {
    ball.vx = -ball.vx;
  }
  if (
    ball.x + ball.vx < paddle1.x + paddle1.width &&
    ball.y + ball.vy < paddle1.y + paddle1.height &&
    ball.y + ball.vy > paddle1.y
  ) {
    score.count += 1;
    hit.play();
    ball.vx = -ball.vx;
  }

  if (
    ball.x + ball.vx < paddle1.x
  ) {
    setTimeout(() => {      
      bump.play();
      backgroud.stop();
      window.cancelAnimationFrame(raf);
      running = false;
      overMg();
    }, 170)
  }

  const inc = 0.00001;
  setInterval(() => (ball.count+=inc, paddle1.count+=inc), 5000);

  raf = window.requestAnimationFrame(draw);

}


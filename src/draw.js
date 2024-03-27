twoPlayer = true;
let lastTs = Date.now();

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

const strip1 = createStrip(0);
const strip2 = createStrip(window.innerHeight - strip1.height);

function draw() {
  clear();
  const delta = Date.now() - lastTs;
  lastTs = Date.now();

  ball.draw();

  function paddleUpdate(paddle, scoreCount, hitSound) {
    paddle.y += (paddle.vy * delta / 10) * (paddle.count*1.5);
    if (paddle.y + paddle.vy > canvas.height) { 
      paddle.y = 0 - paddle.height;
    } else if (paddle.y + paddle.vy < 0 - paddle.height) {
      paddle.y = canvas.height - paddle.vy;
    }

    if (
      ((
        ball.x + ball.vx < paddle.x + paddle.width &&
        ball.y + ball.vy < paddle.y + paddle.height &&
        ball.y + ball.vy > paddle.y &&
        paddle === paddle1
      ) || (
        ball.x + ball.vx > paddle.x + (paddle.width/3) &&
        ball.y + ball.vy < paddle.y + paddle.height &&
        ball.y + ball.vy > paddle.y &&
        paddle === paddle2
      )) && (
        running
      )
    ) {
      scoreCount.count += 1;
      hitSound.play();
      ball.vx = -ball.vx;
    }
  }

  if (twoPlayer) {
   paddle2.draw();
   score2.draw();
   paddleUpdate(paddle2, score2, hit2);
  }

  paddle1.draw();
  strip1.draw();
  score.draw();
  score2.draw();

  if (ball.count<3) {
    ball.x += ball.vx*ball.count;
    ball.y += ball.vy*ball.count;
  } else {
    ball.x += ball.vx+3;
    ball.y += ball.vy+3;
  }

  paddleUpdate(paddle1, score, hit1);

  if (
    ball.y + ball.vy > canvas.height - ball.radius ||
    ball.y + ball.vy < ball.radius ||
    ball.y + ball.vy < strip1.height + ball.radius
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
    ball.x + ball.vx < paddle1.x ||
    (
      ball.x + ball.vx > paddle2.x + paddle1.width &&
      twoPlayer
    )
  ) {
    running = false;
    msg = true;
    bump.play();
    backgroud.stop();
    setTimeout(() => {      
      window.cancelAnimationFrame(raf);
      overMg();
    }, 100)

  }

  const inc = 0.00001;
  setInterval(() => (ball.count+=inc, paddle1.count+=inc, paddle2.count+=inc), 5000);

  raf = window.requestAnimationFrame(draw);
}




twoPlayer = true;
let lastTs = Date.now();

function draw() {
  clear();
  const delta = Date.now() - lastTs;
  lastTs = Date.now();

  ball.draw();
  paddle1.draw();
  score.draw();

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
    ball.x + ball.vx < paddle1.x ||
    (
      ball.x + ball.vx > paddle2.x + paddle1.width &&
      twoPlayer
    )
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




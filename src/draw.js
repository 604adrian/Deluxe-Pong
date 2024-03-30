twoPlayer = true;
let lastTs = Date.now();
const winScore = 11;
const stripHeight = 45;
const paralyzed = false;

function createBoundry(h) {
  return {
    width: 10,
    height: h,
    colour: 'white',
    draw() {
      ctx.beginPath();
      ctx.fillStyle = this.colour;
      ctx.fillRect(
        (window.innerWidth + this.width*2) / 2,
        0,
        this.width,
        this.height
      );
      ctx.fill();
    }
  }
}

const stripBoundry = createBoundry(stripHeight)
function createStrip(why) {
  return {
    x: 0,
    y: why,
    width: window.innerWidth,
    height: stripHeight,
    colour: 'black',
    draw() {
      ctx.beginPath();
      ctx.fillStyle = this.colour;
      ctx.fillRect(this.x, this.y, this.width, this.height)
      ctx.fill();
      stripBoundry.draw();
    }
  }
}

const mainBoundry = createBoundry(window.innerHeight);
const strip1 = createStrip(0);
const strip2 = createStrip(window.innerHeight - strip1.height);
let j = 0;

function draw() {
  clear();
  canvas.style.cursor = 'not-allowed';
  const delta = Date.now() - lastTs;
  lastTs = Date.now();


  let width = ball.radius;
  ctx.beginPath();
  ctx.fillStyle = 'white';
  ctx.fillRect(
    (window.innerWidth + width*2) / 2,
    0,
    width,
    window.innerHeight
  );
  ctx.fill();
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
      hitSound.play();
      ball.vx = -ball.vx;
      j++;
      console.log(j)
      if (j % 3) {
        let i = 0;

        switch (Math.floor(Math.random()*(0,2))) {
          case 2:
            const changeCourse = setInterval(() => {
              if (i > 3) { clearInterval(changeCourse1)};
              ball.vy = (ball.vy + 0.15);
              i++
            }, 200)
            break;
          case 1:
            const changeCourse2 = setInterval(() => {
              if (i > 3) { clearInterval(changeCourse2)};
              ball.vy = (ball.vy + 0.25);
              i++
            }, 200)
            break;
          case 0:
            if (ball.vx > 5) {
              ball.vx = (ball.vx + 1);
              ball.vy = (ball.vy + 1);
            }
            break;
         }
      }
    }
  }

  if (ball.vy > 1)
    ball.vy = ball.vy - 0.0001;

  if (ball.vy < -1)
    ball.vy = ball.vy + 0.0001;

  if (twoPlayer) {
   paddle2.draw();
   score2.draw()
   paddleUpdate(paddle2, score2, hit2);
  }

  paddle1.draw();
  strip1.draw();
  score.draw();
  score2.draw();

  if (ball.count<3) {
    ball.x += (ball.vx * (delta / 20)) * ball.count;
    ball.y += (ball.vy * (delta / 20)) / ball.count;
  } else {
    ball.x += ball.vx+3;
    ball.y += ball.vy+3;
  }

  paddleUpdate(paddle1, score, hit1);

  function resetDrawingBoard(scoreBoard) {
    if (scoreBoard.count < winScore - 1) {
      scoreBoard.count++;
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
      ball.vx = -ball.vx;
      ball.vy = - ball.vy;
      if (Math.floor(Math.random() * (0, 1))) {
        if (ball.x > canvas.width/2) {
          ball.vx = (ball.vx -1)
        } else {
          ball.vx = (ball.vx + 1);
        }
      } else {
        ball.vy = (ball.vy + 0.7);
      }
      paralized = false;
   } else if (scoreBoard.count <= winScore-1 && !paralized) {
     scoreBoard.count++;
     scoreBoard.draw();
     ball.vx = -ball.vx;
     setTimeout(() => {
        running = false;
        msg = true;
        bump.play();
        backgroud.stop();
        window.cancelAnimationFrame(raf);
        canvas.style.cursor = 'pointer';
        overMg();
     }, 200);
    }
  }

  if (
    ball.y + ball.vy > canvas.height - ball.radius ||
    ball.y + ball.vy < ball.radius ||
    ball.y + ball.vy < strip1.height + ball.radius
  ) {
    ball.vy = -ball.vy;
  }

  if (ball.x + ball.vx < paddle1.x + paddle1.widht) {
    paddle1.vy = 0;
    paralized = true;
  }

  if (ball.x + ball.vx > paddle2.x + paddle2.width) {
    paddle2.vy = 0;
    paralized = true;
  }

  if (ball.x + ball.vx > canvas.width - ball.radius) {
      ctx.beginPath();
      ctx.fillStyle = `rgb(235 1 1 / 100%)`;
      ctx.fillRect(
        canvas.width/2 + ball.radius*2,
        0,
        canvas.width/2 + canvas.width, 
        canvas.height
      );
      resetDrawingBoard(score);
  } else if (ball.x + ball.vx < ball.radius) {
      ctx.beginPath();
      ctx.fillStyle = `rgb(235 1 1 / 100%)`;
      ctx.fillRect(
        0,
        0,
        canvas.width - canvas.width / 2 + (ball.radius), 
        canvas.height
    );
    resetDrawingBoard(score2);
    paralized = false;
  }

  if (score.count >= winScore || score2.count >= winScore){
    console.log('won!');
  }

  raf = window.requestAnimationFrame(draw);
}




twoPlayer = true;
let lastTs = Date.now();
const winScore = 11;
const stripHeight = 45;
const paralyzed = false;
let winner = false;

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
let mark;
let j = 0;

function draw() {
  clear();
  canvas.style.cursor = 'not-allowed';
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
    paddle.y += (paddle.vy) * (paddle.count*1.5);
    // down to up
    if (
      paddle.y > canvas.height
      && paddle.vy > 0
    ) { 
      paddle.y = strip1.height - paddle.height + 1;
    // up to down
    } else if (
      paddle.y < strip1.height - paddle.height
      && paddle.vy < 0
    ) {
      paddle.y = canvas.height + paddle.height;
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

      if (j < 3) {
        if (ball.vx > 0) {
          ball.vx = (ball.vx + 2);
          ball.vy = (ball.vy + 1);
        } else {
          ball.vx = (ball.vx - 2);
          ball.vy = (ball.vy - 1);
        }
      } else if (j > 3 && j > 4) {
        if (ball.vx > 0) {
          ball.vx = (ball.vx + 1);
          ball.vy = (ball.vy + 0.5);
        } else {
          ball.vx = (ball.vx - 0.5);
          ball.vy = (ball.vy - 0.5);
        }
      }

      if (j % 3 && j < 20) {
        let i = 0;
        
        switch (Math.floor(Math.random()*(0,2))) {
          case 2:
            if (j > 15) break;
            const changeCourse = setInterval(() => {
              if (i > 3) { clearInterval(changeCourse1)};
              ball.vy = (ball.vy + 0.15);
              i++
            }, 200)
            break;
          case 1:
            if (j > 20) break;
            const changeCourse2 = setInterval(() => {
              if (i > 3) { clearInterval(changeCourse2)};
              ball.vy = (ball.vy + 0.25);
              i++
            }, 200)
            break;
          case 0:
            if (j > 15) {
              ball.vx = ball.vx - 1.5;
              ball.vy = ball.vy - 1.5;
              break;
            }
            if (ball.vx > 5) {
              ball.vx = (ball.vx + 1);
              ball.vy = (ball.vy + 1);
            }
            break;
         }

      } 

      if (j%5) {
        if (j%2) { ball.vy = ball.vy + 1 }
        else { (ball.vy = ball.vy - 1) }
      }
      
    }
  }

  if (ball.vy > 1)
    ball.vy = ball.vy - 0.0001;

  if (ball.vy < -1)
    ball.vy = ball.vy + 0.0001;

  paddle2.draw();
  score2.draw()
  paddleUpdate(paddle2, score2, hit2);


  paddle1.draw();
  strip1.draw();
  score.draw();
  score2.draw();

  if (ball.count<3) {
    ball.x += (ball.vx * ball.count);
    ball.y += (ball.vy / ball.count);
  } else {
    ball.x += ball.vx+3;
    ball.y += ball.vy+3;
  }

  paddleUpdate(paddle1, score, hit1);
  function endGame() {

     setTimeout(() => {
        ball.vx = -ball.vx;
        running = false;
        msg = true;
        bump.play();
        backgroud.stop();
        window.cancelAnimationFrame(raf);
        canvas.style.cursor = 'pointer';
        overMg();
     }, 200);
  }

  function resetDrawingBoard(scoreBoard) {
    if (!winner) {
      scoreBoard.count++;
      scoreBoard.draw();
    }

    if (scoreBoard.count < winScore - 1) {
      ball.x = canvas.width / 2;
      ball.vx = -ball.vx;
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
     endGame();
    }
  }
  
  if (!twoPlayer && running ) {
    paddle1.y = ball.y - paddle1.height/2;
  };

  if (
    ball.y + ball.vy > canvas.height - ball.radius ||
    ball.y + ball.vy < ball.radius ||
    ball.y + ball.vy < strip1.height + ball.radius
  ) {
    ball.vy = -ball.vy;
  }

  if (ball.x + ball.vx < paddle1.x + paddle1.width) {
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

  if (score.count >= 11 || score2.count >= 11) {
    endGame();
    winner = true;
  }

  raf = window.requestAnimationFrame(draw);
}




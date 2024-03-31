function backgroundColour() {
  ctx.fillStyle = '#050528';
  ctx.fillRect(0,0,canvas.width,canvas.height);
};
backgroundColour();

function twoBtns() {
  start.draw();
  start.draw();
  home.draw();
  home.draw();
};

let text = '';
let subtexts = [];
let screen = 0;
startingScreen = true;

let lastTs = Date.now();
function draw() {
  clear();
  const delta = Date.now() - lastTs;
  lastTs = Date.now();

  function paddleUpdate(paddle) {
    paddle.draw();
    paddle.draw();
    paddle.y += (paddle.vy * delta / 10) * (paddle.count*1.5);
    if (paddle.y + paddle.vy > window.innerHeight) { 
      paddle.y = 0 - paddle.height;
    } else if (paddle.y + paddle.vy < 0 - paddle.height) {
      paddle.y = window.innerHeight - paddle.vy;
    }
  }

  function renderScreen(side) {
    ctx.font = "48px Silkscreen";
    ctx.strokeStyle = "white";
    ctx.strokeText(
      `${text}`, 
      ((canvas.width/2)-((text.length*48)/side)), 
      100
    );
    ctx.font = "20px Monospace";
    ctx.fillStyle = "white";
    ctx.textAlign = 'start';
    subtexts.map((v,i) => {
      ctx.fillText(
        `${v}`, 
        ((canvas.width/2)-((v.length*20)/side)), 
        200 + (i * 30)
      );
    });
  };

  if (screen>2) { canvas.style.cursor = 'pointer' }
  else { canvas.style.cursor = 'not-allowed' }

  function clickTransition() {
    const transitionMsg = [
      '',
      '-----------------',
      '',
      "click anywhere",
      'to continue',
    ];
    transitionMsg.forEach(v => subtexts.push(v));
  }

  console.log(screen)
  switch (screen) {
    case 0:
      subtexts = [
        "PRESS THE 'W' KEY",
        'TO MOVE UPWARDS',
        '',
        '-----------------',
        '',
        "press 'w' to continue"
      ];
      canvas.style.cursor = 'not-allowed';
      break;
   case 1:
      subtexts = [
        "PRESS THE 'S' KEY",
        'TO MOVE DOWNWARDS',
        '',
        '-----------------',
        '',
        "press 's' to continue"
      ];
      canvas.style.cursor = 'not-allowed';
      break;
    case 2:
      subtexts = [
        'PRESS UP ARROW KEY',
        'TO MOVE UPWARDS',
        '',
        '-----------------',
        '',
        "press the up arrow",
        'to continue'
      ];
      canvas.style.cursor = 'not-allowed';
      break;
    case 3:
      subtexts = [
        'PRESS THE DOWN ARROW KEY',
        'TO MOVE DOWNWARDS',
        '',
        '-----------------',
        '',
        "press the down arrow",
        'to continue'
      ];
      canvas.style.cursor = 'not-allowed';
      break;
    case 4:
      text = 'RULES ';
      subtexts = [
        'PROTECT THE BALL',
        'WITH YOUR PADDLE',
      ];
      clickTransition();
      break;
    case 5:
      subtexts = [
        'IF YOU MISS',
        'THE OTHER PLAYER GETS A POINT'
      ];
      clickTransition();
      break;
    case 6:
      subtexts = [
        'THE BALL WILL GRADUALLY',
        'PICK UP SPEED',
      ];
      clickTransition();
      break;
    case 7: 
      subtexts = [
        '1st PLAYER TO 11',
        'WIN THE GAME'
      ]
      clickTransition();
      break;
    case 8:
      backgroundColour();
      text = 'GOOD LUCK ';
      subtexts = [];
      clickTransition();
      screen++;
      break;
  }

  if (screen===0||screen===1) {
    text = 'player one';
    renderScreen(3);
    paddleUpdate(paddle1);
  } else if (screen===2||screen===3) {
    text = 'player two';
    renderScreen(3);
    paddleUpdate(paddle2);
  } else {
    renderScreen(3);
  }

  const inc = 0.00001;
  setInterval(() => (ball.count+=inc, paddle1.count+=inc, paddle2.count+=inc), 5000);

  raf = window.requestAnimationFrame(draw);
}

raf = window.requestAnimationFrame(draw);

window.addEventListener("keyup", (event) => {
  if (
    event.code == 'KeyW' && screen === 0 ||
    event.code == 'KeyS' && screen === 1 || 
    event.code == 'ArrowUp' && screen === 2 ||
    event.code == 'ArrowDown' && screen === 3
  )  {
    screen++;
    ohYeah.currentTime = 0;
    ohYeah.play();
  }
});

window.addEventListener("click", (event) => {
  if (screen>=4 && screen<10) {
    screen++;
    ohYeah.currentTime = 0;
    ohYeah.play();
  }

  if (screen>=9) {
    raf = window.cancelAnimationFrame(draw);
    window.location.href = 'index.html';
  }
});

canvas.addEventListener('mousedown', (e) => {

  let start = isClicked(e, startBtn);
  let home = isClicked(e, homeBtn);
  
  if (start || home) {
    ohYeah.currentTime = 0;
    ohYeah.play();
  }

  if (start) {
    mouseDownAni(startBtn, homeBtn, 'white', 3.5);
  } else if (home) {
    mouseDownAni(homeBtn, startBtn, 'white', 3.5);
  }

})
startingScreen = false;

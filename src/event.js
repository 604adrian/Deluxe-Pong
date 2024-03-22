window.addEventListener("keydown", (event) => {
  event.code === "ArrowUp"
    ? (paddle2.vy = -5)
    : event.code === 'ArrowDown'
      && (paddle2.vy = 5)
});

window.addEventListener("keyup", (event) => {
  event.code === "ArrowUp"
    ? (paddle2.vy = 0)
    : event.code === 'ArrowDown'
      && (paddle2.vy = 0)
});

window.addEventListener("keydown", (event) => {
  event.code === "KeyW"
    ? (paddle1.vy = -5)
    : event.code === 'KeyS'
      && (paddle1.vy = 5)
});

window.addEventListener("keyup", (event) => {
  event.code === "KeyS"
    ? (paddle1.vy = 0)
    : event.code === 'KeyW'
      && (paddle1.vy = 0)
});

let startOver = false;
function isClicked(evt, btn) {
  const mousePos = {
    x: evt.clientX - canvas.offsetLeft,
    y: evt.clientY - canvas.offsetTop
  };
  const pixel = ctx.getImageData(mousePos.x, mousePos.y, 1, 1).data;
  const RBGToHex = (r,g,b) => {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);

    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;

    return "#" + r + g + b;
  }
  const colour = RBGToHex(pixel[0],pixel[1],pixel[2]);
  if (
    (colour.toLowerCase() === btn.colour.toLowerCase()) ||
    (colour.toLowerCase() === btn.textColour.toLowerCase())
  ) {
    return true;
  };
  return false
}

canvas.addEventListener("click", (e) => {

  function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min),
          maxFloored = Math.floor(max);
    return Math
      .floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  }

  function numOfPlayersScreen() {
    ctx.fillStyle = '#050528';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    onePlayerBtn.draw();
    twoPlayerBtn.draw();
    startingScreen = false;
  }

  let un = isClicked(e, onePlayerBtn),
      deux = isClicked(e, twoPlayerBtn);

  function transitionCheck() {
    if (
      !running && 
      !un && 
      !deux && 
      !startingScreen &&
      !msgOver
    ) {
      numOfPlayersScreen()
    }


    else if (
      (un || deux) && 
      !running
    ) {
      clear();
      ohYeah.play();
      ball.x = getRandomInt(251, 504);
      ball.y = getRandomInt(100, 209);
      running = true;
      paddle1.y = 200;
      paddle2.y = 200;
      whoops.pause();
      whoops.currentTime = 0;
      setTimeout(() => backgroud.play(), 250)
      score.count = 0;
      score2.count = 0;
      startOver = true;
      if (un) {
        twoPlayer = false;
      } else if (deux) {
        twoPlayer = true;
      }
      raf = window.requestAnimationFrame(draw);
    }

    else if (startingScreen) {
      let uno = isClicked(e, tutorialBtn),
          duo = isClicked(e, startBtn);

      if (duo) {
        ohYeah.play();
        numOfPlayersScreen();
        startingScreen = false;
      }

      if (uno) {
        window.alert('This feature is under construction -- come back later');
      }
    }
  }
  transitionCheck();

  if (msgOver) {
    msg = false;
    ohYeah.play();
    transitionCheck();

    for (const sound in endSounds) {
      if (sound.duration>0) {
        sound.pause();
        sound.currentTime = 0;
      }
    }

    msgOver = false;

  }

});

const upColour1 = onePlayerBtn.colour,
      upColour2 = twoPlayerBtn.colour;

function mouseDownAni(btn, btn2, newColour, offset) {
  const c = btn.colour;
  btn.colour = newColour;

  ctx.beginPath();
  btn.draw();
  
  btn.x += offset;
  btn.y += offset;
  btn.colour = c;
  ctx.beginPath();
  btn.draw();
  btn.x -= offset;
  btn.y -= offset;

  setTimeout(() => {
    if (startingScreen) {
      ctx.fillStyle = 'black';
      ctx.fillRect(0,0,canvas.width,canvas.height);
      btn.draw();
      btn2.draw();
    }
  }, 1000);
}

canvas.addEventListener('mousedown', (e) => {
  let un = isClicked(e, onePlayerBtn),
      deux = isClicked(e, twoPlayerBtn),
      uno = isClicked(e, tutorialBtn),
      duo = isClicked(e, startBtn);

  if (un) {
    mouseDownAni(onePlayerBtn, twoPlayerBtn, 'white', 3.5);
  }

  else if (deux) {
    mouseDownAni(twoPlayerBtn, onePlayerBtn, 'white', 3.5);
  }

  else if (uno) {
    mouseDownAni(tutorialBtn, startBtn, 'hotpink', 7)
  }

  else if (duo) {
    mouseDownAni(startBtn, tutorialBtn, 'hotpink', 7);
  }
})


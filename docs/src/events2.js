let startOver = false;

canvas.addEventListener("click", (e) => {

  function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min),
          maxFloored = Math.floor(max);
    return Math
      .floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  }
  let un = isClicked(e, onePlayerBtn),
      deux = isClicked(e, twoPlayerBtn);

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

  if (!running) {
    location.reload(location.href);
  }
});
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
      ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
      btn.draw();
      btn2.draw();
    }
  }, 1000);
}

canvas.addEventListener('mousedown', (e) => {
  let un = isClicked(e, onePlayerBtn),
      deux = isClicked(e, twoPlayerBtn);
      
  if (un) {
    mouseDownAni(onePlayerBtn, twoPlayerBtn, onePlayerBtn.textColour, 3.5);
  }

  else if (deux) {
    mouseDownAni(twoPlayerBtn, onePlayerBtn, twoPlayerBtn.textColour, 3.5);
  }
})


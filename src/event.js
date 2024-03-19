window.addEventListener("keydown", (event) => {
  console.log(event.code);
  event.code === "ArrowUp"
    ? (paddle2.vy = -5)
    : event.code === 'ArrowDown'
      && (paddle2.vy = 5)
});

window.addEventListener("keyup", (event) => {
  console.log(event.code)
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
function reset() {
  backgroud.pause();
  ctx.fillStyle = '#FF0000';
  ctx.fillRect(20, 20, 150, 100);
  clear();
  startOver = false;
  canvas.addEventListener('click', (event) => {
    let x = event.pageX - canvas.offsetLeft,
        y = event.pageY - canvas.offsetLeft;
    if (y > 20 && y > 120 && x > 20 && x < 170) {
      console.log('button clicked');
    }
  })
}

canvas.addEventListener("click", (e) => {
  function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math
      .floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  }
  if (!running) {
    ball.x = getRandomInt(251, 504);
    ball.y = getRandomInt(100, 209);
    running = true;
    raf = window.requestAnimationFrame(draw);
    whoops.pause();
    whoops.currentTime = 0;
    backgroud.play();
    score.count = 0;
    score2.count = 0;
    startOver = true;
    //reset();
  }
});

pause.addEventListener("click", (e) => {
  window.cancelAnimationFrame(raf);
  running = false;
  backgroud.pause();
});

fullScreen.addEventListener('click', function(e) {
  canvas.requestFullscreen();
})

canvas.addEventListener("mouseover", (e) => {

});

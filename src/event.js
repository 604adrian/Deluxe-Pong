window.addEventListener("keydown", (event) => {
  event.code === "ArrowUp"
    ? (paddle1.vy = -5)
    : event.code === 'ArrowDown'
      && (paddle1.vy = 5)
});
window.addEventListener("keyup", (event) => {
  event.code === "ArrowUp"
    ? (paddle1.vy = 0)
    : event.code === 'ArrowDown'
      && (paddle1.vy = 0)
});

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
    raf = window.requestAnimationFrame(draw);
    running = true;
    whoops.pause();
    whoops.currentTime = 0;
    backgroud.play();
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

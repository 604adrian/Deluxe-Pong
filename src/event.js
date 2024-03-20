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

function getBtn(ex, why, w, h, c, bol) {
  return {
    x: ex,
    y: why,
    width: w,
    height: h,
    colour: c,
    draw() {
      ctx.beginPath();
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = this.colour;
      ctx.fill();
    },
    isClicked(evt) {
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
      console.log(this.colour, colour);
      if (colour === this.colour) {
        twoPlayer = bol;
        raf = window.requestAnimationFrame(draw);
      }
    }
  };
}



const onePlayerBtn = getBtn(canvas.height/2, canvas.height/3, 200, 50, '#ff0000', true);
const twoPlayerBtn = getBtn(canvas.height/5, canvas.width/3, 50, 40, '#ff0001', false)
canvas.addEventListener("click", (e) => {
  onePlayerBtn.draw();
  twoPlayerBtn.draw();
  onePlayerBtn.isClicked(e);
  twoPlayerBtn.isClicked(e);

  function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math
      .floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  }

  function getMousePos(evt) {
  }

  getMousePos(e);
  if (!running) {
    ball.x = getRandomInt(251, 504);
    ball.y = getRandomInt(100, 209);
    running = true;
    paddle1.y = getRandomInt(30, 167);
    paddle2.y = getRandomInt(30, 167);
    whoops.pause();
    whoops.currentTime = 0;
    backgroud.play();
    score.count = 0;
    score2.count = 0;
    startOver = true;

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

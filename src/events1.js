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

function isClicked(evt, btn) {
  const mousePos = {
    x: evt.clientX - canvas.offsetLeft,
    y: evt.clientY - canvas.offsetTop
  };
  const pixel = ctx.getImageData(mousePos.x, mousePos.y, 1, 1).data;
  const pixel2 = ctx.getImageData(mousePos.x+4, mousePos.y+4, 1, 1).data;
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
  const colour2 = RBGToHex(pixel2[0],pixel2[1],pixel2[2]);
  if (
    (colour.toLowerCase() === btn.colour.toLowerCase()) ||
    (colour.toLowerCase() === btn.textColour.toLowerCase()) ||
    (colour2.toLowerCase() === btn.colour.toLowerCase())
  ) {
    return true;
  };
  return false
}

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



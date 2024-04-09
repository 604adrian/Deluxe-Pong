const canvas = document.getElementById('canvas');
canvas.style.cursor = 'pointer';

const ctx = canvas.getContext("2d");
ctx.font = "25px Silkscreen";
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let raf;
let running = false;
let disply = 0;
let twoPlayer = false;
let startingScreen = true;
let msg = false;
let msgOver = false;
let tutorial = false;

function getBtn(why, c, tC, t, oX, oY) {
  return {
    x: (window.innerWidth/2)-100,
    y: why,
    colour: c,
    textColour: tC,
    text: t,
    offsetX: oX,
    offsetY: oY,
    width: 200,
    height: 50,
    draw() {
      ctx.beginPath();
      ctx.fillStyle = this.colour;
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.fill();

      ctx.beginPath();
      ctx.font = '25px Silkscreen';
      ctx.fillStyle = this.textColour;
      ctx.fillText(`${this.text}`, this.x+this.offsetX, this.y+this.offsetY);
      ctx.fill();
    },
  }
};

const onePlayerBtn = getBtn(
        window.innerHeight/5, 
        '#2F4F4F', 
        '#F8F8FE',
        '1 PLAYER',
        30,
        33,
      ),
      twoPlayerBtn = getBtn(
        (window.innerHeight/5)+70, 
        '#2F4F4E', 
        '#F8F8FF',
        '2 PLAYERS',
        20,
        33,
      ),
      startBtn = getBtn(
        (window.innerHeight/5)+70, 
        '#2F4F4D', 
        '#F8F8FC',
        'START',
        20,
        33,
      ),
      homeBtn = getBtn(
        (window.innerHeight/5)+70+twoPlayerBtn.height+70, 
        '#2F4F4A', 
        '#F8F8FA',
        'HOME',
        20,
        33,
      );
       

function numOfPlayersScreen() {
  ctx.fillStyle = '#050528';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  onePlayerBtn.draw();
  twoPlayerBtn.draw();
  startingScreen = false;
}


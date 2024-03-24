const canvas = document.getElementById('canvas');

const ctx = canvas.getContext("2d");
ctx.font = "25px Silkscreen";
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let raf,
    running = false,
    disply = 0,
    startCount = 0,
    twoPlayer = false,
    startingScreen = true,
    msg = false,
    msgOver = false,
    tutorial = false;

function getBtn(ex, why, c, tC, t, oX, oY, fS, f, w, h) {
  return {
    x: ex,
    y: why,
    colour: c,
    textColour: tC,
    text: t,
    offsetX: oX,
    offsetY: oY,
    fontSize: fS,
    font: f,
    width: w,
    height: h,
    draw() {
      ctx.beginPath();
      ctx.fillStyle = this.colour;
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.fill();

      ctx.beginPath();
      ctx.font = `${this.fontSize}px ${this.font}`;
      ctx.fillStyle = this.textColour;
      ctx.fillText(`${this.text}`, this.x+this.offsetX, this.y+this.offsetY);
      ctx.fill();
    },
  }
};

const onePlayerBtn = getBtn(
        (canvas.width/2)-100, 
        canvas.height/5, 
        '#2F4F4F', 
        '#F8F8FE',
        '1 PLAYER',
        30,
        33,
        25,
        'Silkscreen',
        200,
        50,
      ),
      twoPlayerBtn = getBtn(
        (canvas.width/2)-100, 
        (canvas.height/5)+70, 
        '#2F4F4E', 
        '#F8F8FF',
        '2 PLAYERS',
        20,
        33,
        25,
        'Silkscreen',
        200,
        50
      ),
      startBtn =  getBtn(
        (canvas.width/2)-200, 
        (canvas.height/5)+130, 
        '#F8F8FD', // text
        '#070F00',
        'START PLAYING',
        27,
        65,
        45,
        'monospace',
        400,
        100
      ),
      tutorialBtn =  getBtn(
        (canvas.width/2)-200, 
        canvas.height/5, 
        '#F8F8FC', // text
        '#070F01',
        'VIEW TUTORIAL',
        27,
        65,
        45,
        'monospace',
        400,
        100
      );




ctx.beginPath();
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.font = "25px Silkscreen";
tutorialBtn.draw();
startBtn.draw();

const whoops = new Audio('./audio/smb_mariodie.wav'),
      bump = new Audio('./audio/smb_bump.wav');

const backgroud = new Howl({ 
  src: [
    './audio/background.mp3', 
  ],
  html5: true,
  loop: true,
});

const hit1 = new Audio('./audio/smb_jump-small.wav'),
      hit2 = new Audio('./audio/smb_jump-super.wav');

const whoWon = new Audio('./audio/smb_powerup.wav'),
      thisGuy = new Audio('./audio/smb_1-up.wav'),
      ohYeah = new Audio('./audio/smb_kick.wav');

const endSounds = [whoops,whoWon,thisGuy,ohYeah,bump];

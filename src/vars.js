const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const fullScreen = document.getElementById("full-screen");
const pause = document.getElementById('pause')

let raf;
let running = false;
let disply = 0;
let startCount = 0;
let twoPlayer = false;

window.onload = (() => {
  const silkscreen = new FontFace(
    "Silkscreen",
    "url(https://fonts.google.com/share?selection.family=Silkscreen:wght@400;700)"
  );

  silkscreen.load().then((font) => {
    document.fonts.add(font);
    console.log("font loaded");
  })
  ctx.beginPath();
  ctx.fillStyle = "rgb(0 0 0 / 30%)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "25px Silkscreen";
  ctx.fillStyle = 'white'
  ctx.fillText('start', 100, 100);
});

const whoops = new Audio('./audio/smb_mariodie.wav');
const bump = new Audio('./audio/smb_bump.wav');

const backgroud = new Howl({ 
  src: [
    './audio/background.mp3', 
  ],
  html5: true,
  loop: true,
});
const hit1 = new Audio('./audio/smb_jump-small.wav');
const hit2 = new Audio('./audio/smb_jump-super.wav');

const whoWon = new Audio('./audio/smb_powerup.wav');
const thisGuy = new Audio('./audio/smb_1-up.wav');
const ohYeah = new Audio('./audio/smb_kick.wav');


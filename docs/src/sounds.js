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

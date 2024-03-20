const ball = {
  x: 100,
  y: 100,
  vx: 5/1.3,
  vy: 1/1.3,
  count: 1,
  radius: 10,
  color: "aliceblue",
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    //ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  },
};

function createPaddle(ex) {
  return {
    x: ex,
    y: canvas.width/5,
    height: 100,
    width: 20,
    vx: 5,
    vy: 0,
    count: 1,
    color: "azure",
    highScore: 0,
    draw() {
      ctx.beginPath();
      ctx.fillRect(this.x, this.y, this.width, this.height);
      //ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill();
    },
  }
}

const paddle1 = createPaddle(30);
const paddle2 = createPaddle(canvas.width-55);

function createScore(ex,why) {
  return {
    count: 0,
    x: ex,
    y: why,
    draw() {
      ctx.beginPath();
      ctx.font = "25px Silkscreen";
      ctx.fillStyle = 'white';
      ctx.fillText(`${this.count}`, this.x, this.y);
    }
  }
}

const score = createScore(10, 30);
const score2 = createScore(canvas.width-30, 30);



const start = {
  count: 0,
  message: `${startCount<1 ? 'start again' : 'start'}`,
  draw() {
    paddle1.y = canvas.height / 3;
    score.count = 0;
    ctx.beginPath();
    ctx.font = "25px Silkscreen";
    ctx.fillStyle = 'white'
    ctx.fillText(`start`, 100, 100);
  }
}

const overMg = (() => {
  if (!running) {
    backgroud.stop()
    ctx.beginPath();

    if (!twoPlayer) {
      ctx.font = "60px Silkscreen";

      setTimeout(() => {
        if (!running) {
          whoops.play();
          ctx.fillStyle = "rgb(153 0 0 / 30%)";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = 'white';
        }
      }, 1000);

      setTimeout(() => {
        if (!running) {
          ctx.fillText('GAME ', canvas.width/3, canvas.height/4)
        }
      }, 2000);

      setTimeout(() => {
        if (!running) {
          ctx.fillText('OVER', canvas.width/3, (canvas.height/4)+40)
        }
      }, 3000);
   } 

   else {

     setTimeout(() => {
        if (!running) {
          ctx.font = "25px Silkscreen";
          ctx.fillText(`WINNER: `, canvas.width/3, canvas.height/4)
          ohYeah.play();
        }
      }, 2000);

      setTimeout(() => {
        if (!running) {
          whoWon.play();

          const colours = ['#3F3FBF','#7FBF3F',
            '#BF3F3F','#BFBF3F','#3FBF7F','#0C2619','#5E2299'];
          let fontSize = 25;
          let width = 30;
          let winner = `${(score.count > score2.count) 
              ? 'Player 1' 
              : (score.count===score2.count)
                ? 'Tie'
                : 'Player 2'}`;

          const celebrateWinner = setInterval(() => {
            fontSize *= 1.05;
            width += 1;
            ctx.font = `${fontSize}px Silkscreen`;
            ctx.fillStyle = colours[Math.floor(Math.random() * colours.length)];
            ctx.fillText(`${winner}`, canvas.width/3, (canvas.height/4)+width)
            if (score.count > score2.count) paddle1.draw();
            if (score.count < score2.count) paddle2.draw();
          }, 50);

          setTimeout(() => {
            clear();
            clearInterval(celebrateWinner);
            ctx.fillStyle = 'white';
          }, 600);

          setTimeout(() => {
            thisGuy.play();
            ctx.font = `${fontSize}px Silkscreen`;
            ctx.fillText(`${winner}`, canvas.width/3, (canvas.height/4)+width)
            let count = 0;
            const visualizeWinner = setInterval(() => {
              if (count===0) {
                if (score.count > score2.count) paddle1.draw();
                if (score.count < score2.count) paddle2.draw();
              } 
              if (
                count===1 &&
                score.count < score2.count
              ) {
                ctx.fillStyle = 'grey';
                paddle1.draw();
              }
              if (
                count===1 &&
                score.count > score2.count
              ) {
                ctx.fillStyle = 'grey';
                paddle2.draw();
              }
              if (
                count===3 &&
                score.count === score2.count
              ) {
                ctx.fillStyle = 'gray';
                paddle1.draw();
              }
              if (
                count===4 &&
                score.count === score2.count
              ) {
                ctx.fillStyle = 'gray';
                paddle2.draw();
              }
              count++;
              if (count>4) clearInterval(visualizeWinner);
            }, 1)
          }, 1600)
 
        }
      }, 3000);
    }

    setTimeout(() => {
        if (!running) {
          ctx.font = "15px Silkscreen";
          ctx.fillText(
            'click anywhere ', canvas.width/2.8, (canvas.height/3)*2.3
          );
          ctx.fillText(
            'to restart', canvas.width/2.8, (canvas.height/3)*2.5
          );
       }
      }, 4000);
  }
})

function clear() {
  ctx.fillStyle = "rgb(11 25 59 / 30%)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}


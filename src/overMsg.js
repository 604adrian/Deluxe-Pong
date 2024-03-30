const timeouts = [];
const intervals = [];

function checkIfInArr(timeout) {
  if (!timeouts.includes(timeout)) {
    timeouts.push(timeout);
  };
};

function overMg () {

  function clickToRestart() {
    const fontSize = 20;
    const restart1 = 'click anywhere';
    const restart2 = 'to restart';
    ctx.font = `${fontSize}px Silkscreen`;
    ctx.fillText(
      `${restart1}`,
      (canvas.width/2) - ((restart1.length*fontSize)/2), 
      (canvas.height/3)*2.3
    );
    ctx.fillText(
      `${restart2}`,
      (canvas.width/2) - ((restart2.length*fontSize)/2), 
      ((canvas.height/3)*2.3) + 25
    );
    msgOver = true;
    strip1.colour = `${!twoPerson && 'transparent'}`;
    score.draw();
    score2.draw();
    stripBoundry.colour = 'black';
    strip1.colour = 'black';

  };
    
  if (!running) {
    msgOver = true;
    backgroud.stop()
    ctx.beginPath();

    if (!twoPlayer) {
      ctx.font = "60px Silkscreen";

      const a1 = setTimeout(() => {
        if (!running) {
          whoops.play();
          ctx.fillStyle = "rgb(153 0 0 / 30%)";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = 'white';
          checkIfInArr(a1);
        }
      }, 1000);

      const game = 'GAME';
      const over = 'OVER';
      const a2 = setTimeout(() => {
        if (!running) {
          ctx.fillText(
            `${game}`, 
            (canvas.width/2) - ((game.length*60)/2),
            canvas.height/4
          )
          checkIfInArr(a2);
        }
      }, 2000);

      const a3 = setTimeout(() => {
        if (!running) {
          ctx.fillText(
            `${over}`, 
            (canvas.width/2) - ((over.length*60)/2),
            (canvas.height/4)+50
          )
          checkIfInArr(a3);
        }
      }, 3000);

      const a4 = setTimeout(() => {
        if (!running) {
          clickToRestart();
          checkIfInArr(a4);
        }
      }, 3300)
   } 

   else {

     const b1 = setTimeout(() => {
        if (!running) {
          ctx.font = "25px Silkscreen";
          ctx.fillText(`WINNER: `, canvas.width/3, canvas.height/4)
          checkIfInArr(b1);
        }
      }, 2000);

      const b2 = setTimeout(() => {
        if (!running) {
          checkIfInArr(b2);
          whoWon.play();

          const colours = ['#3F3FBF','#7FBF3F',
            '#BF3F3F','#BFBF3F','#3FBF7F','#0C2619','#5E2299'];
          let fontSize = 25;
          let width = 30;
          let winner = `${(score.count < score2.count) 
              ? 'Player 1' 
              : 'Player 2'}`;

          const celebrateWinner = setInterval(() => {
            fontSize *= 1.02;
            width += 1;
            ctx.font = `${fontSize}px Silkscreen`;
            ctx.fillStyle = colours[Math.floor(Math.random() * colours.length)];
            ctx.fillText(
              `${winner}`, 
              (canvas.width/2) - ((winner.length*fontSize)/2),
              (canvas.height/4)+width
            );
            if (score.count > score2.count) paddle1.draw();
            if (score.count < score2.count) paddle2.draw();
          }, 10);

          const b3 = setTimeout(() => {
            if (!running) {
              clear();
              clearInterval(celebrateWinner);
              ctx.fillStyle = 'white';
              checkIfInArr(b3);
            };
          }, 600);

          const b4 = setTimeout(() => {
            if (!running) {
              checkIfInArr(b4);
              thisGuy.play();
              ctx.font = `${fontSize}px Silkscreen`;
              ctx.fillText(
                `${winner}`, 
                (canvas.width/2) - ((winner.length*fontSize)/2),
                (canvas.height/4)+width
              )
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

                if (count===5) {
                  const b5 = setTimeout(() => clickToRestart(), 10)
                  checkIfInArr(b5);
                }

                count++;

                if (count>5) 
                  clearInterval(visualizeWinner);

              }, 1)
            };
          }, 1600)
 
        }
      }, 3000);
    }
  }
}


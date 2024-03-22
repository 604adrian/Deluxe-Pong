const overMg = (() => {

  const clickToRestart = () => {
    ctx.font = "15px Silkscreen";
    ctx.fillStyle = 'rgba(245,255,255,80%)';
    const restart1 = 'click anywhere';
    const restart2 = 'to restart';
    ctx.fillText(
      `${restart1}`,
      (canvas.width/2) - ((restart1.length*15)/2), 
      (canvas.height/3)*2.3
    );
    ctx.fillText(
      `${restart2}`,
      (canvas.width/2) - ((restart2.length*15)/2), 
      ((canvas.height/3)*2.3) + 20
    );
    msgOver = true;
  };

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

      const game = 'GAME';
      const over = 'OVER';
      setTimeout(() => {
        if (!running) {
          ctx.fillText(
            `${game}`, 
            (canvas.width/2) - ((game.length*60)/2),
            canvas.height/4
          )
        }
      }, 2000);

      setTimeout(() => {
        if (!running) {
          ctx.fillText(
            `${over}`, 
            (canvas.width/2) - ((over.length*60)/2),
            (canvas.height/4)+50)
        }
      }, 3000);

      setTimeout(() => {
        if (!running) {
          clickToRestart();
        }
      }, 3300)
   } 

   else {

     setTimeout(() => {
        if (!running) {
          ctx.font = "25px Silkscreen";
          ctx.fillText(`WINNER: `, canvas.width/3, canvas.height/4)
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

          setTimeout(() => {
            clear();
            clearInterval(celebrateWinner);
            ctx.fillStyle = 'white';
          }, 600);

          setTimeout(() => {
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
                setTimeout(() => clickToRestart(), 10)
              }

              count++;

              if (count>5) 
                clearInterval(visualizeWinner);

            }, 1)
          }, 1600)
 
        }
      }, 3000);
    }


  }
})



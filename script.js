//game variables
let gameBoard = document.querySelector('.game-board');
let snakeBody = [ { x:2, y:2} ];
let foodPosition = { x:24, y:24 };
let inputDir = { x:0, y:0 };
let snakeSpeed = 5;
let lastRender = 0;
let scoreEl = document.querySelector('#score')
let score = 0
let hasCollided = false;
let body = document.querySelector('body')
let currentDir = null


//game loop
function main(ctime){
  if(hasCollided) return;
  window.requestAnimationFrame(main);
  if((ctime - lastRender)/1000 < 1/snakeSpeed) return;
  lastRender = ctime;
  game()
}

//game function
function game(){
   //display snake and food
   gameBoard.innerHTML = "";
   snakeBody.forEach((e,index) => {
     let snakeEl = document.createElement('div');
     snakeEl.classList.add('snake');
     snakeEl.style.gridRowStart = e.y;
     snakeEl.style.gridColumnStart = e.x;
     gameBoard.appendChild(snakeEl);
   })

   let foodEl = document.createElement('div');
   foodEl.classList.add('food');
   foodEl.style.gridRowStart = foodPosition.y;
   foodEl.style.gridColumnStart = foodPosition.x;
   gameBoard.appendChild(foodEl);

   snakeBody[0].x+=inputDir.x
   snakeBody[0].y+=inputDir.y

   if(snakeBody[0].x >25 || snakeBody[0].x<-25){
     snakeBody[0].x = 1;
   }
   if(snakeBody[0].y >25 || snakeBody[0].y<-25){
     snakeBody[0].y = 1;
   }
   if(snakeBody[0].x<0){
     snakeBody[0].x+=27
   }
   if(snakeBody[0].y<0){
     snakeBody[0].y+=27
   }
   //when food eaten
   if(foodPosition.x == snakeBody[0].x && foodPosition.y == snakeBody[0].y ){
     foodPosition.x= Math.floor(Math.random()*20+1);
     foodPosition.y= Math.floor(Math.random()*20+1);
     snakeBody.push({x: snakeBody[0].x, y: snakeBody[0].y})
     score++
     let currentScore = 0
     for(let i=1; i<score; i++){
       if(score == 5+currentScore ){
         snakeSpeed += 0.5
         console.log("hi", snakeSpeed)
       }
       currentScore +=5
     }

     scoreEl.textContent = "Score: "+ score
     console.log(snakeSpeed)

   }
   for(let i = snakeBody.length-1; i>0; i--){
     snakeBody[i].x = snakeBody[i-1].x;
     snakeBody[i].y = snakeBody[i-1].y;
   }
   //if collides with self
  for(let i =2; i<snakeBody.length; i++){
    if(snakeBody[0].x == snakeBody[i].x && snakeBody[0].y == snakeBody[i].y){
      gameBoard.textContent=""
      hasCollided = true;
      let gameOverPanel = document.createElement('div')
      gameOverPanel.innerHTML = `
        <p style='margin:10'>GAME OVER!</p>
        <p style='margin:0'>FINAL SCORE: ${score}</p>
      `
      gameOverPanel.classList.add('game-over')
      gameBoard.appendChild(gameOverPanel)
      scoreEl.textContent =""
    }
  }
}


//to play again
/*let restartBtn = document.querySelector("#restart-btn")
restartBtn.addEventListener("click", function(){
  console.log("hi")

})*/
window.requestAnimationFrame(main);

//moving the snake
window.addEventListener("keydown", function(event) {
  event.preventDefault();
  const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
  switch (key) { // change to event.key to key to use the above variable
    case "ArrowLeft":
      if(currentDir == 'right') return;
      currentDir = 'left'
      inputDir.x=-1;
      inputDir.y=0;
      break;

    case "ArrowRight":
      if(currentDir == 'left') return;
      currentDir = 'right'
      inputDir.x=1;
      inputDir.y=0;
      break;

    case "ArrowUp":
      if(currentDir == 'down') return;
      currentDir = 'up'
      inputDir.x=0;
      inputDir.y=-1;
      break;

    case "ArrowDown":
      if(currentDir == 'up') return;
      currentDir = 'down'
      inputDir.x=0;
      inputDir.y=1;
      break;
  }
});

// TODO:
// play again function
// add bonus food
// ERRORS:
//body not adding on first foodEl ,
//snake moving diagonal for some reason??,

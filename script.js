const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newgameBtn = document.querySelector(".new-game");

let currentPlayer;
let gameGrid;

const winningPos = [
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6]
]

function gameInit() {
    currentPlayer = 'X';
    gameGrid = ["","","","","","","","",""];

    boxes.forEach((box, index) => {
        box.textContent = "";
        box.style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    });
    newgameBtn.classList.remove("active");

    gameInfo.innerText = `Current Player - ${currentPlayer}`;

}


gameInit();



function handleClick(index) {
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn();

        checkGameOver(); 
    }
}

function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }

  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let answer = '';
    winningPos.forEach((position) => {
        //all 3 boxes should be non-empty and have same values 
        if((gameGrid[position[0]] !== '' && gameGrid[position[1]]!=='' && gameGrid[position[2]]!=='')
        && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
        
            if(gameGrid[position[0]] === 'X')
                answer = 'X'
            else
                answer = '0'

            boxes.forEach((box) => {
                box.style.pointerEvents = 'none';
            });

            boxes[position[0]].classList.add('win');
            boxes[position[1]].classList.add('win');
            boxes[position[2]].classList.add('win');

            
        }
    });

    if(answer !== ''){
        newgameBtn.classList.add("active")
        gameInfo.innerText = `Winner Player - ${answer}`;
        return;
    }

    let fillCount = 0;
    gameGrid.forEach((position) =>{
        if(position !== '')
            fillCount++;
    });

    if(fillCount === 9){
        gameInfo.innerText = 'Tied!'
        newgameBtn.classList.add("active");
    }
}

boxes.forEach((boxx, index)=> {
    boxx.addEventListener("click",()=>{
        handleClick(index);
    } )
})

newgameBtn.addEventListener("click", () => {
    gameInit()
});
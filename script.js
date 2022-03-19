const playerFactory = (name, number) => {
    let tiles = 0;
    let hasWon = false;
    const getNumber = () => number;
    const setTiles = () => {tiles++; console.log(tiles);}
    const getTiles = () => tiles;
    const resetTiles = (number) => tiles = number; 
    const setName = (newName) => name = newName;
    const getName = () => name;
    const win = () => hasWon = true;
    const getWinStatus = () => hasWon;
    const lose = () => hasWon = false;
    return {
        tiles,
        name,
        number,
        hasWon,
        getNumber,
        setTiles,
        getTiles,
        resetTiles,
        setName,
        getName,
        win,
        getWinStatus,
        lose
    };

};

const gameBoard = function (playerOne, playerTwo) {
    let boardArray = [];

    //cache DOM
    const domBoard = document.getElementById("game-board");
    const playerOneHeader = domBoard.querySelector("#player-one"); 
    const playerTwoHeader = domBoard.querySelector("#player-two");
    const fields = domBoard.getElementsByClassName("field");
    const restart = domBoard.querySelector("#restart");
    const names = domBoard.getElementsByClassName("inputs");


    //render
    function render(query){
        boardArray = [];
        
        if(query === "restart"){
            for(let node of fields){
                node.innerHTML = "";
            }
        }
        //populate array
        for(let node of fields){
            boardArray.push(node);
        }
        //Check if names have been input, if so change
        if(names[0].value){
            playerOne.setName(names[0].value);
            names[0].value = "";
        }
        if(names[1].value){
            playerTwo.setName(names[1].value);
            names[1].value = "";

        }
        playerOneHeader.innerHTML = playerOne.getName() + "'s turns: " + playerOne.getTiles(); 
        playerTwoHeader.innerHTML = playerTwo.getName() + "'s turns: " + playerTwo.getTiles(); 



    }

    //initialize game board
    render();

    //bind events
    for(let item of boardArray){
        item.addEventListener("click", play);
    }
    for(let name of names){
        name.addEventListener("change", render);
    }
    restart.addEventListener("click", restartGame);

    //Functionality functions
    //Should probably be part of render instead of its own function but,, it's ok
    function mark(event, string) {
        event.target.innerHTML = string;
    }

    function play(event){
        if(playerOne.getWinStatus() || playerTwo.getWinStatus()){
            alert("This game is already over!");
            return;
        }
        if(event.target.innerHTML != ""){
            alert("This tile has already been played!");
            return;
        }
        //Get all grids that have been filled in
        countGrids = boardArray.filter(item => item.innerHTML != "");
        
        //Determine whether it's player 1 or 2s turn
        if(countGrids.length % 2 === 0){
            mark(event, "X");
            playerOne.setTiles();
            resolveGame("XXX", playerOne.getName());
        }
        else if(countGrids.length % 2 === 1){
            mark(event, "O");
            playerTwo.setTiles();
            resolveGame("OOO", playerTwo.getName());
        }
        
        render();
        //At this point it's a draw
        if(countGrids.length >= 8 && playerOne.getWinStatus() == false
        && playerTwo.getWinStatus() == false){
            alert("It's a draw!");
        }
        
    }

    function resolveGame(condition, name){
        const one = boardArray[0];
        const two = boardArray[1];
        const three = boardArray[2];
        const four = boardArray[3];
        const five = boardArray[4];
        const six = boardArray[5];
        const seven = boardArray[6];
        const eight = boardArray[7];
        const nine = boardArray[8];

        if(one.innerText + two.innerText + three.innerText === condition){
            alert(name + " WON!");
        }else if(four.innerText + five.innerText + six.innerText === condition){
            alert(name + " WON!");
        }else if(seven.innerText + eight.innerText + nine.innerText === condition){
            alert(name + " WON!");
        }else if(three.innerText + five.innerText + seven.innerText === condition){
            alert(name + " WON!");
        }else if(one.innerText + five.innerText + nine.innerText === condition){
            alert(name + " WON!");
        }else if(three.innerText + six.innerText + nine.innerText === condition){
            alert(name + " WON!");
        }else if(two.innerText + five.innerText + eight.innerText === condition){
            alert(name + " WON!");
        }
        else if(one.innerText + four.innerText + seven.innerText === condition){
            alert(name + " WON!");
        }else{
            return;
        }

        if(playerOne.getName() === name){
            playerOne.win();
        }else if(playerTwo.getName() === name){
            playerTwo.win();
        }

    }

    function restartGame(){
        playerOne.resetTiles(0);
        playerTwo.resetTiles(0);
        playerOne.lose();
        playerTwo.lose();

        render("restart");
    }

};

const game = (function () {

    //Instantiate player objects
    const playerOne = playerFactory("Player 1", 1);
    const playerTwo = playerFactory("Player 2", 2);
    
    //Instantiate game board
    const ticTac = gameBoard(playerOne, playerTwo);

})();


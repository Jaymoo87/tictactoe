
// Selects html document based on parameters ('.row > div') //
let cells = document.querySelectorAll('.row > div');
let winningMessage = document.getElementsByClassName('winningMessage')[0]
let finished = false;
let restartClick = document.querySelectorAll('h1.winningMessage');
let cellClicks = 0;




const playerX = 'X'
const playerO = 'O'
const winningCombo = [
    [cells[0], cells[1], cells[2]],
    [cells[3], cells[4], cells[5]],
    [cells[6], cells[7], cells[8]],
    [cells[0], cells[3], cells[6]],
    [cells[1], cells[4], cells[7]],
    [cells[2], cells[5], cells[8]],
    [cells[0], cells[4], cells[8]],
    [cells[2], cells[4], cells[6]],
];



for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', cellClicked);

};
// added click event to the winningMessage to reset the game
for (let i = 0; i < restartClick.length; i++) {
    winningMessage.addEventListener('click', resetGame)
};

/// --------Functions--------- ///

// sends 'the its a draw' message and finishes the game. //
function draw() {
    winningMessage.innerText = "It's a draw! Click Here to Reset.";
    finished = true;
    cellClicks++;
    resetGame()
}


// Checks the status of the cells for a winner. //
function winCheck() {

    // Sets the variables for a X or O win by referencing the winning combo array. //
    for (let i = 0; i < winningCombo.length; i++) {
        // checks the textContent for each cell and and checks for a winner from the winningCombo array. //
        let xCombo = 0
        let oCombo = 0
        for (let j = 0; j < winningCombo[i].length; j++) {
            if (winningCombo[i][j].textContent === playerX) {
                xCombo++;

            }
            else if (winningCombo[i][j].textContent === playerO) {
                oCombo++;
            }
            // Defines the winningCombo parameters and the message to display if they are met. //
            if (xCombo === 3) {
                winningMessage.innerText = "X is the Winner! Click Here to Reset!";
                finished = true;
            } else if (oCombo === 3) {
                winningMessage.innerText = "O is the Winner! Click Here to Reset!";
                finished = true;
            }


            // Sets the parameters to define a draw and calls the draw() function.  //
            else if (cellClicks > 8 && xCombo == !3 || cellClicks > 8 && oCombo == !3) {
                finished = true;
                draw();
                // resetGame();
            }
        };
    };
};


// checks the results after he cellClicked event. Checks for winner after cellClicks is 3 or higher. resets if there is it is a draw. //
function cellClicked(e) {
    // anti cheat
    if (e.target.textContent !== '') {
        return;
    }
    // add return to stop clicks after a winner is found
    if (finished) {
        return;
        // resetGame();
    }
    if (cellClicks > 2) {
        winCheck();

    } else if (cellClicks === 9) {
        draw();
    }
    switchPlayer(e)
}

// Changes 'X' and 'O"  player's turn based on cellClicks' even or odd status. Adds +1 to cellClick count for if and else statement.//
function switchPlayer(e) {
    if (cellClicks % 2 == true) {
        e.target.textContent = playerO;
        winCheck()


    } else {
        e.target.textContent = playerX;
        winCheck()

    }
    cellClicks++;
    console.log(cellClicks);
}


// Starts the game back over. clears the winningMessage status and resets cellClicks. //
function resetGame() {

    for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = "";
        cellClicks = 0;
        winningMessage.innerText = "";
        finished = false;
    }


}






const plays = ["rock", "paper", "scissors"];
const playTranslation = {"rock":0, "paper":1, "scissors":2};
const whoWins = ["The computer beats you!",
                "Tied game!",
                "You beat the computer!"];
const whatHappens = ["Rock vs rock, no one wins", // 0
                    "Paper vs paper, no one wins", // 1
                    "Scissors vs scissors, no one wins", // 2
                    "Rock blunts scissors", // 3
                    "Paper wraps rock", // 4
                    "Scissors cut paper"]; // 5
const eventMapperMatrix = [
    [0, 4, 3],
    [4, 1, 5],
    [3, 5, 2]
];
const incrementMatrix = [ // 0 tie, 1 player wins, -1 pc wins
    [ 0, -1,  1], // Outcomes when player selects Rock
    [ 1,  0, -1], // Outcomes when player selects Paper
    [-1,  1,  0] // Outcomes when player selects Scissors
];
let playerCounter;
let pcCounter;
let keyPressed = {"rock":false, "paper":false, "scissors":false};
const maxScore = 5;


const buttons = Array.from(document.querySelectorAll('button'));
const playerScore = document.querySelector('#player-score');
const pcScore = document.querySelector('#pc-score');
const playerChoice = document.querySelector('#player-choice');
const pcChoice = document.querySelector('#pc-choice');
const whatHappensBox = document.querySelector('#what-happens');
const outcomeBox = document.querySelector('#outcome');
const playerMoveImg = document.querySelector("#player-choice-img");
const pcMoveImg = document.querySelector("#pc-choice-img");


initialize();


function initialize() {
    keyPressed = {"rock":false, "paper":false, "scissors":false};
    resetCounter();
    updateDisplay();
    eraseMessages();
    enablePlayRound();
}

function resetCounter() {
    playerCounter = 0;
    pcCounter = 0;
    playerScore.classList.remove("winner");
    playerScore.classList.remove("replay");
    playerScore.removeEventListener("click", initialize);
    pcScore.classList.remove("winner");
    pcScore.classList.remove("replay");
    pcScore.removeEventListener("click", initialize);
    outcomeBox.classList.remove("winner");
}

function eraseMessages() {
    playerChoice.textContent = "";
    pcChoice.textContent = "";
    whatHappensBox.textContent = "";
    outcomeBox.textContent = "";
    playerMoveImg.src="./img/empty-transparent-box.png";
    pcMoveImg.src="./img/empty-transparent-box.png";
}

function enablePlayRound() {
    buttons.forEach(element => {
        element.addEventListener('mousedown', selectFromFromMouse);
        element.addEventListener('mouseup', releasePress);
    });
    
    window.addEventListener('keydown', selectFromFromKey);
    window.addEventListener('keyup', releasePressKey);
}

function disablePlayRound() {
    buttons.forEach(element => {
        element.removeEventListener('mousedown', selectFromFromMouse);
        element.removeEventListener('mouseup', releasePress);
    });
    
    window.removeEventListener('keydown', selectFromFromKey);
    window.removeEventListener('keyup', releasePressKey);
}

function releasePress(){
    this.classList.remove("pressed");
}

function selectFromFromMouse(e) {
    this.classList.add("pressed");
    playRound(this.id);
}

function selectFromFromKey(e) {
    const btn = document.querySelector(`button[data-key="${e.keyCode}"]`);
    if (!btn) return;
    if (keyPressed[btn.id]) return;
    keyPressed[btn.id] = true;
    btn.classList.add("pressed");
    return btn && playRound(btn.id);
}

function releasePressKey(e) {
    const btn = document.querySelector(`button[data-key="${e.keyCode}"]`);
    if (!btn) return;
    keyPressed[btn.id] = false;
    btn.classList.remove("pressed");
}

function playRound(playerSelection) {
    const idPC = pcSelect();
    const idPlayer = playTranslation[playerSelection];
    const pcSelection = plays[idPC];
    const outcome = incrementMatrix[idPlayer][idPC];
    const event = eventMapperMatrix[idPlayer][idPC];
    const imgPath = "./img/";
    const playerImgEnd = "_player.png";
    const pcImgEnd = "_pc.png";
    const playerImg = imgPath + playerSelection + playerImgEnd;
    const pcImg = imgPath + pcSelection + pcImgEnd;
    playerChoice.textContent = `You play ${playerSelection}`;
    playerMoveImg.src = playerImg;
    pcMoveImg.src = pcImg;
    pcChoice.textContent = `PC plays ${pcSelection}`;
    whatHappensBox.textContent = whatHappens[event];
    outcomeBox.textContent = whoWins[outcome+1];
    updateScore(outcome);
    checkEnd();
}

function updateScore(inc) {
    if (inc >=0 ) {
        playerCounter += inc;
    } else {
        pcCounter++;
    }
    updateDisplay();
}

function updateDisplay() {
    playerScore.textContent = playerCounter;
    pcScore.textContent = pcCounter;
}

function pcSelect() {
    const zeroToThree = Math.floor(Math.random()*3);
    /* In case the number is exactly 3, we replay */
    /* This gives the same probability to all outcomes */
    if (zeroToThree == 3) pcSelect();
    return zeroToThree; 
}

function checkEnd() {
    if (pcCounter == 5) {
        outcomeBox.textContent = "Computer wins!";
        playerScore.textContent = "One more?";
        playerScore.classList.add("replay");
        playerScore.addEventListener('click', initialize)
        outcomeBox.classList.add("winner");
        pcScore.classList.add("winner");
        disablePlayRound();
    }
    if (playerCounter == 5) {
        outcomeBox.textContent = "You win!";
        pcScore.textContent = "One more?";
        pcScore.classList.add("replay");
        pcScore.addEventListener('click', initialize)
        outcomeBox.classList.add("winner");
        playerScore.classList.add("winner");
        disablePlayRound();
    }
}
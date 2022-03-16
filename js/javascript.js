const plays = ['Rock', 'Paper', 'Scissors'];

let playerCounter;
let computerCounter;

function game() {
    let playerSelection;
    let computerSelection;
    playerCounter = 0;
    computerCounter = 0;
    for (let i = 0; i < 5; i++) {
        console.log(`Play ${i + 1} out of 5.`)
        playerSelection = window.prompt("Rock, paper or scissors?",
        "Scissors");
        console.log(`You play ${playerSelection.toLowerCase()}.`);
        computerSelection = computerPlay();
        console.log(`Computer plays ${computerSelection.toLowerCase()}.`);
        console.log(playRound(playerSelection, computerSelection));
        console.log(`The score is: computer = ${computerCounter}, ` 
        + `you = ${playerCounter}.`);
     }
    if (playerCounter == computerCounter) {
        console.log(`Play again to untight!`);
    }
    if (playerCounter > computerCounter) {
        console.log(`You lucky bastard managed to beat the powerful computer!`);
    }
    if (playerCounter < computerCounter) {
        console.log(`You are too dumb to beat this powerful machine!`);
    }
}


function computerPlay() {
    const zeroToThree = Math.floor(Math.random()*3);
    return plays[zeroToThree] || computerPlay(); 
    /* In case the number is exactly 3, we replay */
    /* This gives the same probability to all outcomes */
}

function playRound(playerSelection, computerSelection) {
    const player = playerSelection.toLowerCase();
    const computer = computerSelection.toLowerCase();
    switch (player) {
        case 'rock':
            switch (computer) {
                case 'rock':
                    return 'Tight: rock against rock.';
                case 'paper':
                    computerCounter++;
                    return 'You lose! Paper wraps your rock.';
                case 'scissors':
                    playerCounter++;
                    return 'You win! Your rock destroys the scissors.';
            }
        case 'paper':
            switch (computer) {
                case 'rock':
                    playerCounter++;
                    return 'You win! Your paper wraps the rock.';
                case 'paper':
                    return 'Tight: paper versus paper.';
                case 'scissors':
                    computerCounter++;
                    return 'You lose! The scissors cut your paper.';
            }
        case 'scissors':
            switch (computer) {
                case 'rock':
                    computerCounter++;
                    return 'You lose! Your scissors get smashed by the rock.';
                case 'paper':
                    playerCounter++;
                    return 'You win! Your scissors cut the paper.';
                case 'scissors':
                    return 'Tight: scissors versus scissors.';
            }
        default:
            return `You can't play ${playerSelection}. `
                + `Try ${plays[0]}, ${plays[1]} or ${plays[2]}`;
    }
}
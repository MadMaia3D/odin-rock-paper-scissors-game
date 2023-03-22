/* 
This matrix encodes the possible result of and a rock-paper-scissors game.
0 means a tie, 1 player's victory, and 2 the computer's victory
the first level of the array (rows) represents the player's choice of rock, paper or scissors
the second level of the array (columns) represents the computer's choice of rock, paper or scissors
if both chooses rock for example, the result is stored in the index [0][0], which is 0, that represents a tie
if the player chooses paper and the computer chooses scissors, the result will be [1][2], which is 2, a computer victory
*/

const resultMatrix = [
    ["tie", "computer", "player"],
    ["player", "tie", "computer"],
    ["computer", "player", "tie"],
];

const choiceDictionary = { rock: 0, paper: 1, scissors: 2 };

const resultMessages = {
    tie: "Its a tie",
    player: "The player wins",
    computer: "The computer wins",
};

function getRoundWinner(playerSelection, computerSelection) {
    const playerSelectionIndex = choiceDictionary[playerSelection];
    const computerSelectionIndex = choiceDictionary[computerSelection];
    const roundWinner =
        resultMatrix[playerSelectionIndex][computerSelectionIndex];

    return roundWinner;
}

function getResultMessage(resultIndex) {
    return resultMessages[resultIndex];
}

function getComputerChoice() {
    const possibleChoices = ["rock", "paper", "scissors"];
    const randomChoice = Math.floor(Math.random() * 3);

    return possibleChoices[randomChoice];
}

function playRound(playerSelection, computerSelection) {
    const roundWinner = getRoundWinner(playerSelection, computerSelection);
    const resultMessage = getResultMessage(roundWinner);

    // console.log(`The player chooses ${playerSelection}.`);
    // console.log(`The computer chooses ${computerSelection}.`);

    // if (roundWinner === 1) {
    //     const choice1 = capitalizeString(playerSelection);
    //     const choice2 = computerSelection;
    //     console.log(`${choice1} beats ${choice2}.`);
    // } else if (roundWinner === 2) {
    //     const choice1 = capitalizeString(computerSelection);
    //     const choice2 = playerSelection;
    //     console.log(`${choice1} beats ${choice2}.`);
    // }
    console.log(resultMessage);

    gameScore[roundWinner]++;
}

function capitalizeString(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

let gameScore = { player: 0, computer: 0, tie: 0 };

// ########## USER INTERFACE ##########

const choiceButtons = document.querySelectorAll(".choice-container");

choiceButtons.forEach(addClickFunction);

function addClickFunction(item) {
    item.addEventListener("click", onPlayerClick);
}
function onPlayerClick(event) {
    const playerChoice = event.currentTarget.dataset.choice;
    playRound(playerChoice, getComputerChoice());
    updateScoreboard();
}

const playerScore = document.querySelector(".player-score");
const computerScore = document.querySelector(".computer-score");

function updateScoreboard() {
    playerScore.textContent = gameScore.player;
    computerScore.textContent = gameScore.computer;
}

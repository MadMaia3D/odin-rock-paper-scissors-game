// ########## GAME LOGIC ##########

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
const resultMessages = {
    tie: "Its a tie",
    player: "You win",
    computer: "The computer wins",
};
const choiceDictionary = { rock: 0, paper: 1, scissors: 2 };

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

    gameScore[roundWinner]++;
}

function getRoundMessages(playerSelection, computerSelection) {
    const roundWinner = getRoundWinner(playerSelection, computerSelection);
    const resultMessage = getResultMessage(roundWinner);

    const playerChoice = `You chose ${playerSelection}`;
    const computerChoice = `The computer chose ${computerSelection}`;
    let beatMessage = "";

    if (roundWinner === "player") {
        const choice1 = capitalizeString(playerSelection);
        const choice2 = computerSelection;
        beatMessage = `${choice1} beats ${choice2}`;
    } else if (roundWinner === "computer") {
        const choice1 = capitalizeString(computerSelection);
        const choice2 = playerSelection;
        beatMessage = `${choice1} beats ${choice2}`;
    }

    return {
        resultMessage: resultMessage,
        playersChoice: playerChoice,
        computersChoice: computerChoice,
        beatMessage: beatMessage,
    };
}

function capitalizeString(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

let gameScore = { player: 0, computer: 0, tie: 0 };

// ########## USER INTERFACE ##########

// ---------- MODAL ----------
document.addEventListener("DOMContentLoaded", showModal);

const modal = document.querySelector(".modal");
const modalWindow = document.querySelector(".modal-window");
const modalWelcomeText = document.querySelector(".welcome-text");
const modalWelcomeButton = modalWelcomeText.querySelector("button");
const modalResultText = document.querySelector(".result-text");
const modalResultButton = modalResultText.querySelector("button");
modalWelcomeButton.addEventListener("click", hideModal);
modalResultButton.addEventListener("click", hideModal);

function showModal() {
    modal.classList.add("show");
    modalWindow.classList.add("show");
}

function hideModal() {
    modal.classList.remove("show");
    modalWindow.classList.remove("show");
}

function updateModalResultText(resultMessages) {
    modalWelcomeText.classList.remove("active");
    modalResultText.classList.add("active");

    const whoWon = modalResultText.children[0];
    whoWon.textContent = resultMessages.resultMessage;

    const choices = modalResultText.children[1];
    choices.children[0].textContent = resultMessages.playersChoice;
    choices.children[1].textContent = resultMessages.computersChoice;

    const whatBeatsWhat = modalResultText.children[2];
    whatBeatsWhat.textContent = resultMessages.beatMessage;
}

// ---------- GAME UI ----------
const choiceButtons = document.querySelectorAll(".choice-container");
const playerScore = document.querySelector(".player-score");
const computerScore = document.querySelector(".computer-score");

choiceButtons.forEach(addClickFunction);

function addClickFunction(item) {
    item.addEventListener("click", onPlayerClick);
}

function onPlayerClick(event) {
    const playerChoice = event.currentTarget.dataset.choice;
    const computerChoice = getComputerChoice();
    playRound(playerChoice, computerChoice);
    const resultMessages = getRoundMessages(playerChoice, computerChoice);
    updateModalResultText(resultMessages);
    showModal();
    updateScoreboard();
}

function updateScoreboard() {
    playerScore.textContent = gameScore.player;
    computerScore.textContent = gameScore.computer;
}

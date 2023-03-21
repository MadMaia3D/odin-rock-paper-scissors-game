/* 
This matrix encodes the possible result of and a rock-paper-scissors game.
0 means a tie, 1 player's victory, and 2 the computer's victory
the first level of the array (rows) represents the player's choice of rock, paper or scissors
the second level of the array (columns) represents the computer's choice of rock, paper or scissors
if both chooses rock for example, the result is stored in the index [0][0], which is 0, that represents a tie
if the player chooses paper and the computer chooses scissors, the result will be [1][2], which is 2, a computer victory
*/

const resultMatrix = [
    [0, 2, 1],
    [1, 0, 2],
    [2, 1, 0],
];

const choiceDictionary = { rock: 0, paper: 1, scissors: 2 };

const resultMessages = {
    0: "Its a tie",
    1: "The player wins",
    2: "The computer wins",
};

function getResultIndex(playerSelection, computerSelection) {
    const playerSelectionIndex = choiceDictionary[playerSelection];
    const computerSelectionIndex = choiceDictionary[computerSelection];
    const resultIndex =
        resultMatrix[playerSelectionIndex][computerSelectionIndex];

    return resultIndex;
}

function getResultMessage(resultIndex) {
    return resultMessages[resultIndex];
}

function getComputerChoice() {
    const possibleChoices = ["rock", "paper", "scissors"];
    const randomChoice = Math.floor(Math.random() * 3);

    return possibleChoices[randomChoice];
}

function playMatch(playerSelection, computerSelection) {
    const resultIndex = getResultIndex(playerSelection, computerSelection);
    const resultMessage = getResultMessage(resultIndex);

    console.log(`The player chooses ${playerSelection}.`);
    console.log(`The computer chooses ${computerSelection}.`);

    if (resultIndex === 1) {
        const choice1 = capitalizeString(playerSelection);
        const choice2 = computerSelection;
        console.log(`${choice1} beats ${choice2}.`);
    } else if (resultIndex === 2) {
        const choice1 = capitalizeString(computerSelection);
        const choice2 = playerSelection;
        console.log(`${choice1} beats ${choice2}.`);
    }
    console.log(resultMessage);
}

function capitalizeString(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getComputerChoice() {
    const possibleChoices = ["rock", "paper", "scissors"];
    const randomChoice = Math.floor(Math.random() * 3);

    return possibleChoices[randomChoice];
}

// Implementation list
  // Rock paper scissors game to first player to reach x wins
  // prompt the user to enter a selection
    //error check if it is 'rock' 'paper' or 'scissors'
  // create function to randomally select computers selection
  // compare the two entries for a winning entry
    // rock beats scissors
    // scissors beats paper
    // paper beats rock

const gameChoices = ["rock", "paper", "scissors"]

const winningConditions = {
  paper: "rock",
  rock: "scissors",
  scissors: "paper"
}

const getUserSelection = () => {
  let  userChoice = prompt("Please choose rock, paper or scissors").toLowerCase();
  while (!gameChoices.includes(userChoice)) {
    userChoice = prompt("Invaid entry.  Please choose rock, paper or scissors").toLowerCase();
  }
  return userChoice;
}

const getComputerSelection = () => {
  return gameChoices[Math.floor(Math.random() * gameChoices.length)];
}

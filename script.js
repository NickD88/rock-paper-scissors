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

const score = {
  player: 0,
  computer: 0
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

const determineWinner = (player, computer) => {
  if (player === computer) {
    console.log(`You chose ${player}, the computer chose ${computer}. It's a tie.`);
  } else if (winningConditions[player] === computer) {
    console.log(`You chose ${player}, the computer chose ${computer}. You win!`);
    incrementScore("player")
  } else {
    console.log(`You chose ${player}, the computer chose ${computer}. The computer wins.`)
    incrementScore("computer")
  }
}

const playRound = () => {
  const playerChoice = getUserSelection();
  const computerChoice = getComputerSelection();
  determineWinner(playerChoice, computerChoice);
}

const incrementScore = (winningPlayer) => score[winningPlayer] += 1;

playRound();
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

const getUserName = () => {
  username = prompt("Please enter your name");
  return username.trim();
}

const getNumberGames = () => {
let games = prompt(`How many wins would you like to play to?`);
while (isNaN(Number.parseInt(games, 10))) {
  games = prompt(`How many wins would you like to play to?`);
}
  return Number.parseInt(games, 10)
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

const winningConditionMet = (numberOfWins) => {
  return score.player === numberOfWins || score.computer === numberOfWins;
}

const winningMessage = (winner, playerName) => {
  return `${winner} is the winner. 
    The final score is: 
    ${playerName}: ${score.player}
    Computer: ${score.computer}
    `
}

const playGame = () => {
  const userName = getUserName();
  const winningNumber = getNumberGames()
  while (!winningConditionMet(winningNumber)) {
    playRound();
  console.log(score);
  }
  const winningPlayer = score.player === winningNumber ? userName : "computer";
  console.log(winningMessage(winningPlayer, userName));
}

playGame();
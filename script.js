// Implementation list
// Rock paper scissors game to first player to reach x wins
// prompt the user to enter a selection
//error check if it is 'rock' 'paper' or 'scissors'
// create function to randomally select computers selection
// compare the two entries for a winning entry
// rock beats scissors
// scissors beats paper
// paper beats rock

const winningConditions = {
  paper: ['rock', 'covers'],
  rock: ['scissors', 'smashes'],
  scissors: ['paper', 'cuts'],
};

const getGameChoices = () => Object.keys(winningConditions);

const score = {
  player: 0,
  computer: 0,
};

const getUserName = () => {
  userName = prompt('Please enter your name');
  while (userName.length === 0) {
    userName = prompt('Invalid entry.  Please enter your name');
  }
  return userName.trim();
};

const getNumberGames = () => {
  let games = prompt(`How many wins would you like to play to?`);
  while (isNaN(Number.parseInt(games, 10))) {
    games = prompt(`How many wins would you like to play to?`);
  }
  return Number.parseInt(games, 10);
};

const getUserSelection = (validChoice) => {
  let userChoice = prompt(
    'Please choose rock, paper or scissors'
  ).toLowerCase();
  while (!validChoice.includes(userChoice)) {
    userChoice = prompt(
      'Invaid entry.  Please choose rock, paper or scissors'
    ).toLowerCase();
  }
  return userChoice;
};

const getComputerSelection = (availableChoice) => {
  return availableChoice[Math.floor(Math.random() * availableChoice.length)];
};

const determineWinner = (player, computer) => {
  if (player === computer) {
    console.log(
      `You chose ${player}, the computer chose ${computer}. It's a tie.`
    );
  } else if (winningConditions[player].includes(computer)) {
    console.log(`You chose ${player}, the computer chose ${computer}.
${player} ${winningConditions[player][1]} ${computer}`);
    incrementScore('player');
  } else {
    console.log(`You chose ${player}, the computer chose ${computer}. The computer wins.
${computer} ${winningConditions[computer][1]} ${player}`);
    incrementScore('computer');
  }
};

const playRound = (availableChoices) => {
  const playerChoice = getUserSelection(availableChoices);
  const computerChoice = getComputerSelection(availableChoices);
  determineWinner(playerChoice, computerChoice);
};

const incrementScore = (winningPlayer) => (score[winningPlayer] += 1);

const winningConditionMet = (numberOfWins) => {
  return score.player === numberOfWins || score.computer === numberOfWins;
};

const winningMessage = (winner, playerName) => {
  return `${winner} is the winner. 
    The final score is: 
    ${playerName}: ${score.player}
    Computer: ${score.computer}
    `;
};

const playGame = () => {
  const userName = getUserName();
  const winningNumber = getNumberGames();
  const gameChoices = getGameChoices();
  while (!winningConditionMet(winningNumber)) {
    playRound(gameChoices);
    console.log(score);
  }
  const winningPlayer = score.player === winningNumber ? userName : 'computer';
  console.log(winningMessage(winningPlayer, userName));
};

playGame();

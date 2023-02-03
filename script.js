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

const allGameChoices = {
  rps: {
    rock: '👊',
    paper: '✋',
    scissors: '✌️',
  },
  rpsls: {
    rock: '👊',
    paper: '✋',
    scissors: '✌️',
    lizard: '🦎',
    spock: '🖖',
  },
};

const scores = {
  player: [],
  computer: [],
};

const gameStartForm = document.querySelector('.game-setup');
const scoreboardSection = document.querySelector('.scoreboard');
const playingField = document.querySelector('.playing-field');
const userChoicePlayingField = document.querySelector('.user-selection');

gameStartForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const gameType = document.querySelector(
    `input[name="game-selection"]:checked`
  );
  const bestOf = document.querySelector(`input[name="best-out-of"]:checked`);
  playGame(gameType.value, bestOf.value);
});

// const getGameChoices = () => Object.keys(winningConditions);

const renderGameChoices = (gameChoices) => {
  const container = document.querySelector('.btn-container');
  container.innerHTML = '';
  for (const property in gameChoices) {
    let btn = document.createElement('button');
    btn.classList.toggle('game-choice');
    btn.setAttribute('data-choice', property);
    btn.textContent = `${property} ${gameChoices[property]}`;
    container.appendChild(btn);
  }
};
const generateBlankScoreboard = (numGames) => {
  Object.keys(scores).forEach((user) => {
    scores[user].length = numGames;
    scores[user].fill('');
  });
};
const renderPlayingField = () => {
  playingField.classList.remove('playing-field-hidden');
  playingField.classList.add('playing-field-active');
};

const renderScoreBoard = (numGames) => {
  generateBlankScoreboard(numGames);
  scoreboardSection.classList.remove('scoreboard-initial');
  scoreboardSection.classList.add('scoreboard-active');
  Object.keys(scores).forEach((user) => {
    let scoreboard = document.querySelector(`.scores-${user}`);
    console.log(scoreboard);
    scores[user].forEach((score) => {
      let entry = document.createElement('div');
      entry.classList.add('score-entry');
      scoreboard.appendChild(entry);
    });
  });
};

const getUserSelection = (gameType) => {
  document.querySelectorAll('.game-choice').forEach((choice) => {
    console.log(choice);
    choice.addEventListener(
      'click',
      (e) => (userChoicePlayingField.textContent = e.target.dataset.choice)
    );
  });
};

// const getUserName = () => {
//   userName = prompt('Please enter your name');
//   while (userName.length === 0) {
//     userName = prompt('Invalid entry.  Please enter your name');
//   }
//   return userName.trim();s
// };

// const getNumberGames = () => {
//   let games = prompt(`How many wins would you like to play to?`);
//   while (isNaN(Number.parseInt(games, 10))) {
//     games = prompt(`How many wins would you like to play to?`);
//   }
//   s;
//   return Number.parseInt(games, 10);
// };

// const getUserSelection = (validChoice) => {
//   let userChoice = prompt(
//     'Please choose rock, paper or scissors'
//   ).toLowerCase();
//   while (!validChoice.includes(userChoice)) {
//     userChoice = prompt(
//       'Invaid entry.  Please choose rock, paper or scissors'
//     ).toLowerCase();
//   }
//   return userChoice;
// };

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

// const playGame = () => {
//   // const userName = getUserName();
//   const winningNumber = getNumberGames();
//   const gameChoices = getGameChoices();
//   while (!winningConditionMet(winningNumber)) {
//     playRound(gameChoices);
//     console.log(score);
//   }
//   const winningPlayer = score.player === winningNumber ? userName : 'computer';
//   console.log(winningMessage(winningPlayer, userName));
// };

const playGame = (gameType, bestOf) => {
  const gameChoices = allGameChoices[gameType];
  console.log(gameChoices);
  gameStartForm.style.display = 'none';
  renderScoreBoard(bestOf);
  renderPlayingField();
  renderGameChoices(gameChoices);
  getUserSelection(gameType);
};

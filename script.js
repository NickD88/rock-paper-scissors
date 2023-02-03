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
  player: 0,
  computer: 0,
};

const userSelections = {
  player: [],
  computer: [],
};

let currentRound = 0;

const gameStartForm = document.querySelector('.game-setup');
const scoreboardSection = document.querySelector('.scoreboard');
const playingField = document.querySelector('.playing-field');
const userChoicePlayingField = document.querySelector('.user-selection');
const computerChoicePlayingField = document.querySelector(
  '.computer-selection'
);
const playerScore = document.querySelector('.player-score');
const computerScore = document.querySelector('.computer-score');

gameStartForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const gameType = document.querySelector(
    `input[name="game-selection"]:checked`
  );
  const bestOf = document.querySelector(`input[name="best-out-of"]:checked`);
  setupGame(gameType.value, bestOf.value);
});

const createGameButton = (name, symbol, location) => {
  let btn = document.createElement('button');
  btn.classList.toggle('game-choice');
  btn.setAttribute('data-choice', name);
  btn.textContent = `${name} ${symbol}`;
  location.appendChild(btn);
};

const renderGameChoices = (gameChoices) => {
  const container = document.querySelector('.btn-container');
  container.innerHTML = '';
  for (const property in gameChoices) {
    createGameButton(property, gameChoices[property], container);
  }
};
const generateBlankScoreboard = (numGames) => {
  Object.keys(userSelections).forEach((user) => {
    userSelections[user].length = numGames;
    userSelections[user].fill('');
  });
};
const renderPlayingField = () => {
  playingField.classList.remove('playing-field-hidden');
  playingField.classList.add('playing-field-active');
};

const initialScoreBoardRender = (numGames) => {
  generateBlankScoreboard(numGames);
  scoreboardSection.classList.remove('scoreboard-initial');
  scoreboardSection.classList.add('scoreboard-active');
  renderScoreBoard();
};

const clearScoreBoard = () => {
  document.querySelector('.scores-player').innerHTML = '';
  document.querySelector('.scores-computer').innerHTML = '';
};

const renderScoreBoard = () => {
  Object.keys(userSelections).forEach((user) => {
    let scoreboard = document.querySelector(`.scores-${user}`);
    userSelections[user].forEach((score, idx) => {
      let entry = document.createElement('div');
      let renderChoice = document.createElement('p');
      renderChoice.textContent = score;
      console.log(renderChoice);
      entry.appendChild(renderChoice);
      entry.setAttribute('data-round', `${user}-${idx}`, 'data-user', user);
      entry.classList.add('score-entry');
      scoreboard.appendChild(entry);
    });
  });
};

const getUserSelection = (gameChoices) => {
  document.querySelectorAll('.game-choice').forEach((choice) => {
    choice.addEventListener('click', (e) => {
      let userSelection = e.target.dataset.choice;
      userChoicePlayingField.textContent = gameChoices[userSelection];
      playRound(userSelection, gameChoices);
    });
  });
};

const getComputerSelection = (availableChoices) => {
  const choices = Object.keys(availableChoices);
  let computerSelection = choices[Math.floor(Math.random() * choices.length)];
  computerChoicePlayingField.textContent = availableChoices[computerSelection];
  return computerSelection;
};

const determineWinner = (player, computer, availableChoices) => {
  if (player === computer) {
    console.log(
      `You chose ${player}, the computer chose ${computer}. It's a tie.`
    );
  } else if (winningConditions[player].includes(computer)) {
    console.log(`You chose ${player}, the computer chose ${computer}.
${player} ${winningConditions[player][1]} ${computer}`);
    incrementScore(
      ['player', availableChoices[player]],
      ['computer', availableChoices[computer]],
      currentRound
    );
    currentRound += 1;
  } else {
    console.log(`You chose ${player}, the computer chose ${computer}. The computer wins.
${computer} ${winningConditions[computer][1]} ${player}`);
    incrementScore(
      ['computer', availableChoices[computer]],
      ['player', availableChoices[player]],
      currentRound
    );
    currentRound += 1;
  }
};

const playRound = (userChoice, availableChoices) => {
  const computerChoice = getComputerSelection(availableChoices);
  determineWinner(userChoice, computerChoice, availableChoices);
};

const incrementScore = (winner, loser, round) => {
  document.querySelector(`[data-round=${winner[0]}-${round}]`).textContent =
    winner[1];
  scores[winner[0]] += 1;
  document.querySelector(`.${winner[0]}-score`).textContent = scores[winner[0]];
  document.querySelector(`[data-round=${loser[0]}-${round}]`).textContent =
    loser[1];
};
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

const setupGame = async (gameType, bestOf) => {
  const gameChoices = allGameChoices[gameType];
  gameStartForm.style.display = 'none';
  initialScoreBoardRender(bestOf);
  renderPlayingField();
  renderGameChoices(gameChoices);
  getUserSelection(gameChoices);
};

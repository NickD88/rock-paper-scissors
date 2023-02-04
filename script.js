const allWinningConditions = {
  rps: {
    paper: {
      rock: 'covers',
    },
    rock: {
      scissors: 'smashes',
    },
    scissors: {
      paper: 'cuts',
    },
  },
  rpsls: {
    paper: {
      rock: 'covers',
      spock: 'disproves',
    },
    rock: {
      scissors: 'smashes',
      lizard: 'crushes',
    },
    scissors: {
      paper: 'cuts',
      lizard: 'decapitates',
    },
    lizard: {
      spock: 'poisons',
      paper: 'eats',
    },
    spock: {
      scissors: 'smashes',
      rock: 'vaporizes',
    },
  },
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

const roundSelections = {
  player: [],
  computer: [],
};

let currentRound = 0;
let gameType = '';

const gameStartForm = document.querySelector('.game-setup');
const scoreboardSection = document.querySelector('.scoreboard');
const userChoiceContainer = document.querySelector('.btn-container');
const playingField = document.querySelector('.playing-field');
const userChoicePlayingField = document.querySelector('.user-selection');
const computerChoicePlayingField = document.querySelector(
  '.computer-selection'
);
const playerScore = document.querySelector('.player-score');
const computerScore = document.querySelector('.computer-score');
const gameContainer = document.querySelector('.game-container');
const result = document.querySelector('.result');

const clearCurrentGameStats = () => {
  scores.player = 0;
  scores.computer = 0;
  roundSelections.player = [];
  roundSelections.computer = [];
  document.querySelector('.computer-score').textContent = 0;
  document.querySelector('.player-score').textContent = 0;
  result.textContent = '';
};

const capitalize = (word) => {
  return word[0].toUpperCase() + word.substring(1);
};

const renderGameOptionForm = () => {
  gameStartForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const gameVersion = document.querySelector(
      `input[name="game-selection"]:checked`
    );
    const bestOf = document.querySelector(`input[name="best-out-of"]:checked`);
    gameType = gameVersion.value;
    setupGame(gameVersion.value, bestOf.value);
  });
};

const createGameButton = (name, symbol = '', location) => {
  let btn = document.createElement('button');
  btn.classList.toggle('game-choice');
  btn.setAttribute('data-choice', name);
  btn.textContent = `${name} ${symbol}`;
  location.appendChild(btn);
};

const renderGameChoices = (gameChoices) => {
  removeGameButtons();
  for (const property in gameChoices) {
    createGameButton(property, gameChoices[property], userChoiceContainer);
  }
};

const generateBlankScoreboard = (numGames) => {
  Object.keys(roundSelections).forEach((user) => {
    roundSelections[user].length = numGames;
    roundSelections[user].fill('');
  });
};
const renderPlayingField = () => {
  playingField.classList.remove('playing-field-hidden');
  playingField.classList.add('playing-field-active');
  userChoicePlayingField.textContent = '';
  computerChoicePlayingField.textContent = '';
};

const initialScoreBoardRender = (numGames) => {
  generateBlankScoreboard(numGames);
  scoreboardSection.classList.remove('scoreboard-initial');
  scoreboardSection.classList.add('scoreboard-active');
  renderScoreBoard();
};

const renderScoreBoard = () => {
  Object.keys(roundSelections).forEach((user) => {
    let scoreboard = document.querySelector(`.scores-${user}`);
    scoreboard.innerHTML = '';
    roundSelections[user].forEach((score, idx) => {
      let entry = document.createElement('div');
      let renderChoice = document.createElement('p');
      renderChoice.textContent = score;
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

const renderRoundResults = (winner, playerChoice, computerChoice, verb) => {
  let message;
  switch (winner) {
    case 'tie':
      message = `It's a tie.`;
      break;
    case `player`:
      message = `${capitalize(
        playerChoice
      )} ${verb} ${computerChoice}.  You Win!`;
      break;
    case 'computer':
      message = `${capitalize(
        computerChoice
      )} ${verb} ${playerChoice}. The Computer Wins.`;
  }
  result.textContent = message;
};

const determineWinner = (player, computer, availableChoices) => {
  if (player === computer) {
    renderRoundResults('tie', player, computer);
    return;
  }
  let winningVerb;
  if (computer in allWinningConditions[gameType][player]) {
    incrementScore(
      ['player', availableChoices[player]],
      ['computer', availableChoices[computer]],
      currentRound
    );
    currentRound += 1;
    winningVerb = allWinningConditions[gameType][player][computer];
    renderRoundResults('player', player, computer, winningVerb);
    return;
  }

  incrementScore(
    ['computer', availableChoices[computer]],
    ['player', availableChoices[player]],
    currentRound
  );
  winningVerb = allWinningConditions[gameType][computer][player];
  renderRoundResults('computer', player, computer, winningVerb);
  currentRound += 1;
};

const playRound = (userChoice, availableChoices) => {
  const computerChoice = getComputerSelection(availableChoices);
  determineWinner(userChoice, computerChoice, availableChoices);
};

const incrementScore = (winner, loser, round) => {
  roundSelections[winner[0]][round] = winner[1];
  roundSelections[loser[0]][round] = loser[1];
  scores[winner[0]] += 1;
  document.querySelector(`.${winner[0]}-score`).textContent = scores[winner[0]];
  renderScoreBoard();
  if (winningConditionMet()) endGame();
};

const winningConditionMet = () => {
  const winTotal = Math.floor(roundSelections.player.length / 2 + 1);
  return scores.player === winTotal || scores.computer === winTotal;
};

const removeGameButtons = () => {
  userChoiceContainer.innerHTML = '';
};

const renderWinningMessage = () => {
  const winner = scores.player > scores.computer ? 'You are' : 'Computer is';
  alert(`${winner} the winner`);
};

renderNewGameButton = () => {
  createGameButton('New Game', '', userChoiceContainer);
  document
    .querySelector(`[data-choice="New Game"`)
    .addEventListener('click', () => {
      clearCurrentGameStats();
      currentRound = 0;
      toggleHidden(gameContainer, gameStartForm);
    });
};

const endGame = () => {
  removeGameButtons();
  renderWinningMessage();
  renderNewGameButton();
};

const toggleHidden = (...args) => {
  args.forEach((element) => {
    element.classList.toggle('hidden');
  });
};

const setupGame = (gameType, bestOf) => {
  const gameChoices = allGameChoices[gameType];
  toggleHidden(gameStartForm, gameContainer);
  initialScoreBoardRender(bestOf);
  renderPlayingField();
  renderGameChoices(gameChoices);
  getUserSelection(gameChoices);
};

renderGameOptionForm();

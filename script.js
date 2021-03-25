'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;
// default values (starting)
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  // hide the dice
  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  // switch to the next player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//
// Rolling dice functionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      // add dice to the current score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});

//
// Hold Button functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= _
    if (scores[activePlayer] >= 35) {
      // if yes finish the game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

//
// 'New Game' Button functionality
btnNew.addEventListener('click', init);

//
// 'How To' Button functionality
const instructions = document.querySelector('.instructions');
const overlay = document.querySelector('.overlay');
const btnCloseInstructions = document.querySelector('.close-instructions');
const btnsShowInstructions = document.querySelectorAll('.btn--instructions');

const openInstructions = function () {
  instructions.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeInstructions = function () {
  instructions.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsShowInstructions.length; i++)
  btnsShowInstructions[i].addEventListener('click', openInstructions);

btnCloseInstructions.addEventListener('click', closeInstructions);
overlay.addEventListener('click', closeInstructions);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !instructions.classList.contains('hidden'))
    closeInstructions();
});

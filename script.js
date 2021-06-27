'use strict';
//selecting of elements

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
//starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
const scores = [0, 0];
let currentScore = 0;
let activePLayer = 0;
let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePLayer}`).textContent = 0;
  currentScore = 0;
  activePLayer = activePLayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling the dice
btnRoll.addEventListener('click', function () {
  //Generating the random no.
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    //Displaying the dice.
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //check for rolled 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePLayer}`).textContent =
        currentScore;
      currentScore;
    } else {
      //Switch the player
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePLayer] += currentScore;
    document.getElementById(`score--${activePLayer}`).textContent =
      scores[activePLayer];
    if (scores[activePLayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePLayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePLayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', function () {
  playing = true;
  currentScore = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--winner');
  scores[0] = 0;
  scores[1] = 1;
});

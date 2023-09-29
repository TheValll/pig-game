"use strict";
// Selecting elements

const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const diceEl = document.querySelector(".dice");
const btnRestart = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const btnRoll = document.querySelector(".btn--roll");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

// Switch player function

const switchPlayer = () => {
  document.querySelector(`#current--${activeplayer}`).textContent = 0;
  currentScore = 0;
  activeplayer = activeplayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

// Starting conditions

let currentScore, activeplayer, playing, scores;

const int = () => {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  scores = [0, 0];
  currentScore = 0;
  activeplayer = 0;
  playing = true;

  diceEl.classList.add("hidden");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
};

int();

// Rolling Dice function

btnRoll.addEventListener("click", () => {
  // Generating random dice roll

  const dice = Math.trunc(Math.random() * 6) + 1;

  // Display dice img

  diceEl.classList.remove("hidden");
  diceEl.src = `dice-${dice}.png`;

  // Check rolled

  if (dice !== 1) {
    currentScore += dice;
    document.querySelector(`#current--${activeplayer}`).textContent =
      currentScore;
  } else {
    // Switch player

    switchPlayer();
  }
});

// Holding Score function

btnHold.addEventListener("click", () => {
  if (playing) {
    // Add current score at the activePlayer score

    scores[activeplayer] += currentScore;
    document.querySelector(`#score--${activeplayer}`).textContent =
      scores[activeplayer];
  }

  if (scores[activeplayer] >= 50) {
    playing = false;
    document
      .querySelector(`.player--${activeplayer}`)
      .classList.add("player--winner");

    document
      .querySelector(`.player--${activeplayer}`)
      .classList.remove("player--active");
  } else {
    switchPlayer();
  }
});

// Restart game

btnRestart.addEventListener("click", int);

// keep track of possible selections
const options = ["ROCK", "PAPER", "SCISSORS"];
// find our user selection buttons
const rockButton = document.querySelector("#rock-button");
const paperButton = document.querySelector("#paper-button");
const scissorsButton = document.querySelector("#scissors-button");
// find selection and result sections
const selection = document.querySelector("#selection");
const result = document.querySelector("#result");

// write event listeners for user selection
// when they click we want to send the correct array index
rockButton.addEventListener("click", function () {
  checkResult(0);
});
paperButton.addEventListener("click", function () {
  checkResult(1);
});
scissorsButton.addEventListener("click", function () {
  checkResult(2);
});

function checkResult(mySelection) {
  // find user selection from array
  let userSelection = options[mySelection];
  console.log(userSelection);
  // find computer selection
  // random select generates random number between 0 - 1, then multiplies by 3, then rounds down
  let randomSelect = Math.floor(Math.random() * 3);
  let computerSelection = options[randomSelect];
  // display both user and computers selection in the DOM
  selection.innerHTML = `
    <p id = "my-choice">
        <span class = "${userSelection.toLowerCase()}">You picked: ${userSelection} </span>
    </p>
    <p id = "computer-choice">
        <span class = "${computerSelection.toLowerCase()}"> Computer picked: ${computerSelection} </span>
    </p>
    `;
  if (userSelection === computerSelection) {
    // this happens if there is a tie
    result.innerHTML = `<p class ="tie"> It was a tie :| </p>`;
  } else if (
    (userSelection === "ROCK" && computerSelection === "SCISSORS") ||
    (userSelection === "PAPER" && computerSelection === "ROCK") ||
    (userSelection === "SCISSORS" && computerSelection === "PAPER")
  ) {
    // this happens if you win
    result.innerHTML = `<p class ="win"> YOU WIN!!! :) </p>`;
  } else {
    // this happens if you lose
    result.innerHTML = `<p class ="loose"> you lose :( </p>`;
  }
}

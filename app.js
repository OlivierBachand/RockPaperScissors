// Select elements from the DOM
const buttons = document.querySelectorAll('.choice');
const resultDiv = document.getElementById('result');
const scoresDiv = document.getElementById('score');
const resetButton = document.getElementById('reset');
// Initialize scores
let playerScore = 0;
let computerScore = 0;
let PlayerResult = '';

// Add event listeners to buttons
buttons.forEach(button => {
  button.addEventListener('click', () => {
    buttons.forEach(btn => {
      if (btn !== button) {
        btn.style.backgroundColor = ''; // Reset other buttons
      }
    });
    playRound(button.dataset.choice)
    if (PlayerResult === 'win') {
      button.style.backgroundColor = 'lightgreen';
    } else if (PlayerResult === 'draw') {
      button.style.backgroundColor = '#faee81ff';
    }
    else {
      button.style.backgroundColor = 'lightcoral';
    }
});
});

resetButton.addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;
    resultDiv.textContent = '';
    scoresDiv.textContent = `Player: ${playerScore} | Computer: ${computerScore}`;
    buttons.forEach(btn => {
        btn.style.backgroundColor = '';
    });
});

// Function to get computer's choice
function getComputerChoice() {
    const possibleChoices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    const randomIndex = Math.floor(Math.random() * possibleChoices.length);
    return possibleChoices[randomIndex];
}

// Function to determine the winner of a round
function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return 'draw';
  }
  // List of arrays containing winning combinations
  const winningCombinations = {
    rock: ['scissors', 'lizard'],
    paper: ['rock', 'spock'],
    scissors: ['paper', 'lizard'],
    lizard: ['spock', 'paper'],
    spock: ['scissors', 'rock'],  
  };
    if (winningCombinations[playerChoice].includes(computerChoice)) {
      return 'player';
    } else {
      return 'computer';
    }
}

// Function to play a round
function playRound(playerChoice) {
  const computerChoice = getComputerChoice();
  const winner = determineWinner(playerChoice, computerChoice); 
  if (winner === 'player') {
    playerScore++;
    PlayerResult = 'win';
    resultDiv.textContent = `You win! ${playerChoice} beats ${computerChoice}.`;
  } else if (winner === 'computer') {
    computerScore++;
    PlayerResult = 'lose';
    resultDiv.textContent = `You lose! ${computerChoice} beats ${playerChoice}.`;
  } else {
    resultDiv.textContent = `It's a draw! Both chose ${playerChoice}.`;
    PlayerResult = 'draw';
  }
  scoresDiv.textContent = `Player: ${playerScore} | Computer: ${computerScore}`;
}
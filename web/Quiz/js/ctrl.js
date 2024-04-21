import { checkWin } from './checkWin';
import { endGame } from './endGame';
import { startTimer } from './startTimer';
import { showFinalScore, showCongratulations, playWinSound, showGameOverScreen, updateTimer } from './displayFunctions';
import { handleTimerExpiration } from './handleTimer';

// Example usage: Call startTimer when you display a new question to start the timer.
startTimer();

// Replace this with the actual correct answer for the current question
var correctAnswer = "correctAnswer";

// Function to check the user's answer
function checkAnswer(userAnswer) {
    var answerFeedback = document.getElementById("answer-feedback");
    var answerSound = document.getElementById("answer-sound");

    if (userAnswer === correctAnswer) {
        displayFeedback("Correct", "lime"); // Green for correct
    } else {
        displayFeedback("Incorrect", "red"); // Red for incorrect
    }

    playAnswerSound(answerSound);
}

// Function to display feedback
function displayFeedback(feedbackText, color) {
    var answerFeedback = document.getElementById("answer-feedback");
    answerFeedback.textContent = feedbackText;
    answerFeedback.style.color = color;
}

// Function to play the answer sound
function playAnswerSound(answerSound) {
    answerSound.play();
}

// Example usage:
var userAnswer = "user's answer"; // Replace this with the actual user's answer
checkAnswer(userAnswer);

nextButton.addEventListener("click", () => showNextQuestion());
function showNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      showQuestion(questions[currentQuestionIndex]);
    }
  }
  const backButton = document.getElementById("back-button");

backButton.addEventListener("click", () => showPreviousQuestion());
function showPreviousQuestion() {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      showQuestion(questions[currentQuestionIndex]);
    }
  }
  
  // displayFunctions.js

function showFinalScore() {
    document.getElementById('final-score').textContent = 'Your Score: ' + userScore;
  }
  
  function showCongratulations() {
    document.getElementById('congratulations').style.display = 'block';
  }
  
  function playWinSound() {
    document.getElementById('win-sound').play();
  }
  
  function showGameOverScreen() {
    document.getElementById('game-over').style.display = 'block';
  }
  
  function updateTimer(time) {
    document.getElementById('countdown').textContent = time;
  }
  
  // Initialize progress variables
const progressBar = document.getElementById('bar');
let currentQuestion = 0;
const totalQuestions = 5; // Change this to the total number of questions in your quiz

function updateProgressBar() {
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;
    progressBar.style.width = `${progress}%`;
}

// Simulating correct answer scenario
function simulateCorrectAnswer() {
    if (currentQuestion < totalQuestions - 1) {
        currentQuestion++;
        updateProgressBar();
        // Add logic to load the next question here
    } else {
        // Quiz is completed, show the final result
    }
}

// Simulating a correct answer after a delay (for example purposes)
setTimeout(simulateCorrectAnswer, 2000);

// storage.js

// Check if there's data in sessionStorage
const savedData = sessionStorage.getItem('quizData');

// If there's data, use it to set up your quiz
if (savedData) {
  const parsedData = JSON.parse(savedData);

  // Use parsedData to set up your quiz, for example:
  // Set the current question, score, or any other relevant data

  // Example:
  // const currentQuestion = parsedData.currentQuestion;
  // const score = parsedData.score;
}

// Add an event listener for page unload (refresh/close)
window.addEventListener('unload', function () {
  // Save your current quiz data to sessionStorage
  const quizData = {
    // Store any relevant data here
    // Example:
    // currentQuestion: replaceWithActualValue,
    // score: replaceWithActualValue,
  };

  sessionStorage.setItem('quizData', JSON.stringify(quizData));
});

// checkWin.js

function checkWin() {
    if (userScore >= 80) {
      showFinalScore();
      showCongratulations();
      playWinSound();
    }
  }
  
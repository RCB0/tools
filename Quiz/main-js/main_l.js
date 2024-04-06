const questions = [
  {
    question: "Who built the ark?",
    options: ["Noah", "Moses", "David", "Abraham"],
    answer: 0
  },
  {
    question: "What was the first miracle of Jesus?",
    options: ["Feeding the 5000", "Turning water into wine", "Healing a blind man", "Walking on water"],
    answer: 1
  },
  {

  question: "Who defeated Goliath?",
    options: ["David", "Jesus", "Moses", "Abraham"],
    answer: 0
  },
  {
    question: "Who created the world?",
    options: ["David", "Elijah", "Adam", "God"],
    answer: 3
  },
  {
    question: "Who is the first human?",
    options: ["Eve", "Adam", "Solomon", "Moses"],
    answer: 1
  },
  {
    question: "Who separated the red sea?",
    options: ["Jesus", "Adam", "Moses", "John"],
    answer: 2
  },
  {
    question: "How many days does it take to create the earth?",
    options: ["8", "10", "7", "6"],
    answer: 2
  },
    // Add more questions and answers here 
];

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-button");
const playAgainButton = document.getElementById("play-again-button");
const finalScoreElement = document.getElementById("final-score");
const gameOverElement = document.getElementById("game-over");

let currentQuestionIndex = 0;
let score = 0;

function showQuestion(question) {
  questionElement.textContent = question.question;
  optionsElement.innerHTML = ""; // Clear previous options

  for (let i = 0; i < question.options.length; i++) {
    const button = document.createElement("button");
    button.textContent = question.options[i];
    button.addEventListener("click", () => checkAnswer(i));
    optionsElement.appendChild(button);
  }
}

function checkAnswer(selectedIndex) {
  if (selectedIndex === questions[currentQuestionIndex].answer) {
    alert("Correct!");
    score++;
  } else {
    alert("Incorrect. The correct answer is: " + questions[currentQuestionIndex].options[questions[currentQuestionIndex].answer]);
  }
  currentQuestionIndex++;
  updateScore();
  if (currentQuestionIndex < questions.length) {
    showQuestion(questions[currentQuestionIndex]);
  } else {
    showGameOver();
  }
}

function updateScore() {
  finalScoreElement.textContent = "Final Score: " + score + " out of " + questions.length;
}

function showGameOver() {
  questionElement.innerHTML = '<img src="../images/win.png" alt="Congratulations!" style="width: 200px; height: 200px;">';
  optionsElement.innerHTML = "";
  nextButton.style.display = "none";
  gameOverElement.style.display = "block";
}


function playAgain() {
  currentQuestionIndex = 0;
  score = 0;
  showQuestion(questions[currentQuestionIndex]);
  nextButton.style.display = "block";
  gameOverElement.style.display = "none";
  updateScore();
}

nextButton.addEventListener("click", () => showQuestion(questions[currentQuestionIndex]));
playAgainButton.addEventListener("click", playAgain);

showQuestion(questions[currentQuestionIndex]);
updateScore();

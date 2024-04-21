const questions = [
  {
    question: "What was the first miracle of Jesus?",
    options: ["Feeding the 5000", "Turning water into wine", "Healing a blind man", "Walking on water"],
    answer: 1
  },
 
  {
    question: "Who created the world?",
    options: ["David", "Elijah", "Adam", "God"],
    answer: 3
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
  {
      question: "What was the name of the disciple who walked on water with Jesus?",
      options: ["Peter", "John", "James", "Andrew"],
      answer: 0
  },
  {
      question: "Which prophet was known for being swallowed by a whale?",
      options: ["Jonah", "Isaiah", "Ezekiel", "Jeremiah"],
      answer: 0
  },
  {
      question: "Which disciple betrayed Jesus for thirty pieces of silver?",
      options: ["Peter", "Judas Iscariot", "John", "Thomas"],
      answer: 1
  },
  {
      question: "Which biblical character is known for building the ark?",
      options: ["Noah", "Abraham", "Moses", "David"],
      answer: 0
  },
  {
      question: "What is the name of the river where Jesus was baptized?",
      options: ["Nile", "Jordan", "Euphrates", "Tigris"],
      answer: 1
  },
  {
      question: "Who was the father of King Solomon?",
      options: ["David", "Solomon", "Saul", "Rehoboam"],
      answer: 0
  },
  {
      question: "Which biblical character is known for being thrown into a den of lions?",
      options: ["Daniel", "David", "Moses", "Elijah"],
      answer: 0
  },
  {
      question: "Who was known as the 'strongest man' in the Bible?",
      options: ["David", "Samson", "Goliath", "Moses"],
      answer: 1
  },
  {
      question: "Who was sold into slavery by his brothers and eventually became a powerful ruler in Egypt?",
      options: ["Joseph", "Isaac", "Jacob", "Abel"],
      answer: 0
  },
  {
      question: "What is the name of the angel who visited Mary to announce the birth of Jesus?",
      options: ["Gabriel", "Michael", "Raphael", "Uriel"],
      answer: 0
  },
  {
      question: "What is the name of the river that the Israelites crossed to enter the Promised Land?",
      options: ["Jordan", "Nile", "Euphrates", "Tigris"],
      answer: 0
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

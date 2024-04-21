// Define your level 1 questions array
const level1Questions = [

{
    question: "Who was the first king of Israel?",
    options: ["David", "Solomon", "Saul", "Samuel"],
    answer: 2
},
{
    question: "In which book of the Bible can you find the Ten Commandments?",
    options: ["Exodus", "Leviticus", "Deuteronomy", "Numbers"],
    answer: 0
},


{
    question: "Who was the author of the majority of the New Testament epistles?",
    options: ["Peter", "John", "Paul", "James"],
    answer: 2
},
{
    question: "What was the name of the city where Jesus was born?",
    options: ["Jerusalem", "Nazareth", "Bethlehem", "Capernaum"],
    answer: 2
},

{
    question: "Who was the father of John the Baptist?",
    options: ["Zechariah", "Simeon", "Joseph", "Elijah"],
    answer: 0
},
{
    question: "What is the name of the sea Jesus calmed during a storm?",
    options: ["Sea of Galilee", "Dead Sea", "Mediterranean Sea", "Red Sea"],
    answer: 0
},
{
    question: "Who was the wife of Abraham?",
    options: ["Rachel", "Sarah", "Leah", "Rebekah"],
    answer: 1
},

{
    question: "What is the name of the place where Jesus was crucified?",
    options: ["Gethsemane", "Bethlehem", "Calvary", "Jerusalem"],
    answer: 2
},
{
    question: "Who wrote the book of Acts in the New Testament?",
    options: ["Peter", "Paul", "Luke", "James"],
    answer: 2
},
{
    question: "What was the name of the disciple known as 'the disciple whom Jesus loved'?",
    options: ["Peter", "John", "James", "Thomas"],
    answer: 1
},
{
    question: "Who was the mother of John the Baptist?",
    options: ["Elizabeth", "Mary", "Hannah", "Deborah"],
    answer: 0
},

{
    question: "What is the first miracle performed by Jesus as recorded in the New Testament?",
    options: ["Feeding the 5,000", "Turning water into wine", "Healing the blind man", "Raising Lazarus from the dead"],
    answer: 1
},
{
    question: "What is the name of the mountain where Moses received the Ten Commandments?",
    options: ["Mount Sinai", "Mount Nebo", "Mount Zion", "Mount Carmel"],
    answer: 0
},
{
    question: "Who was known as the 'weeping prophet'?",
    options: ["Isaiah", "Jeremiah", "Ezekiel", "Daniel"],
    answer: 1
},


{
    question: "What was the name of the city where Jesus was raised?",
    options: ["Nazareth", "Jerusalem", "Bethlehem", "Capernaum"],
    answer: 0
},
{
    question: "What is the name of the hill where Jesus was crucified?",
    options: ["Mount of Olives", "Mount Moriah", "Mount Calvary", "Mount Zion"],
    answer: 2
},

{
    question: "Who was the first martyr of the Christian faith?",
    options: ["Stephen", "Paul", "Peter", "James"],
    answer: 0
},
{
    question: "What is the name of the place where Jesus was transfigured before Peter, James, and John?",
    options: ["Mount Sinai", "Mount Tabor", "Mount Hermon", "Mount Moriah"],
    answer: 2
},
  // Add more questions here
  {
    question: "Do you want to continue?",
    options: ["Yes", "No"],
    answer: null // There's no correct answer for this question
  }
];

// Get references to HTML elements
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-button");
const playAgainButton = document.getElementById("play-again-button");
const finalScoreElement = document.getElementById("final-score");
const gameOverElement = document.getElementById("game-over");

let currentQuestionIndex = 0;
let score = 0;

// Function to display a question
function showQuestion(question) {
  questionElement.textContent = question.question;
  optionsElement.innerHTML = ""; // Clear previous options

  // Create buttons for each option
  for (let i = 0; i < question.options.length; i++) {
    const button = document.createElement("button");
    button.textContent = question.options[i];
    button.addEventListener("click", () => checkAnswer(i));
    optionsElement.appendChild(button);
  }
}

// Function to check the selected answer
function checkAnswer(selectedIndex) {
  const currentQuestion = level1Questions[currentQuestionIndex];
  if (selectedIndex === currentQuestion.answer) {
    alert("Correct!");
    score++;
  } else {
    alert("Incorrect. The correct answer is: " + currentQuestion.options[currentQuestion.answer]);
  }
  currentQuestionIndex++;
  updateScore();
  if (currentQuestionIndex < level1Questions.length - 1) {
    showQuestion(level1Questions[currentQuestionIndex]);
  } else {
    showContinueQuestion();
  }
}

// Function to display the "Do you want to continue?" question
function showContinueQuestion() {
  questionElement.textContent = "Do you want to continue?";
  optionsElement.innerHTML = ""; // Clear previous options

  // Create buttons for Yes and No
  const yesButton = document.createElement("button");
  yesButton.textContent = "Yes";
  yesButton.addEventListener("click", () => {
    // Redirect to hard_lvl_2.html or perform any other action if needed
    window.location.href = "hard_lvl_2.html";
  });
  optionsElement.appendChild(yesButton);

  const noButton = document.createElement("button");
  noButton.textContent = "No";
  noButton.addEventListener("click", () => {
    // Handle No button action if needed
  });
  optionsElement.appendChild(noButton);
}

// Function to update the score display
function updateScore() {
  finalScoreElement.textContent = "Final Score: " + score + " out of " + (level1Questions.length - 1);
}

// Function to display the game over screen
function showGameOver() {
  questionElement.innerHTML = '<img src="../images/win.png" alt="Congratulations!" style="width: 200px; height: 200px;">';
  optionsElement.innerHTML = "";
  nextButton.style.display = "none";
  gameOverElement.style.display = "block";
}

// Function to reset the game
function playAgain() {
  currentQuestionIndex = 0;
  score = 0;
  showQuestion(level1Questions[currentQuestionIndex]);
  nextButton.style.display = "block";
  gameOverElement.style.display = "none";
  updateScore();
}

// Event listeners for next question and play again buttons
nextButton.addEventListener("click", () => showQuestion(level1Questions[currentQuestionIndex]));
playAgainButton.addEventListener("click", playAgain);

// Display the first question when the page loads
showQuestion(level1Questions[currentQuestionIndex]);
updateScore();

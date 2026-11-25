// 1. Questions Array
const questions = [
    {
        question: "Which HTML tag is used to define an internal style sheet?",
        options: ["<css>", "<script>", "<style>", "<link>"],
        answer: "<style>"
    },
    {
        question: "Which CSS property controls the text size?",
        options: ["font-style", "text-size", "font-size", "text-style"],
        answer: "font-size"
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        options: ["<js>", "<scripting>", "<javascript>", "<script>"],
        answer: "<script>"
    },
    {
        question: "How do you write 'Hello World' in an alert box in JavaScript?",
        options: ["msg('Hello World');", "alertBox('Hello World');", "alert('Hello World');", "msgBox('Hello World');"],
        answer: "alert('Hello World');"
    },
    {
        question: "Which HTML5 element is used to specify a footer for a document or section?",
        options: ["<bottom>", "<footer>", "<section>", "<aside>"],
        answer: "<footer>"
    }
];

// Global state variables
let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timerInterval;
let answerSubmitted = false;

// DOM element references
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const questionNumberEl = document.getElementById("question-number");
const timerEl = document.getElementById("timer");
const questionTextEl = document.getElementById("question-text");
const optionsContainerEl = document.getElementById("options-container");
const feedbackEl = document.getElementById("feedback");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const scoreDisplayEl = document.getElementById("score-display");
const finalScoreTextEl = document.getElementById("final-score-text");

// 2. shuffleQuestions()
function shuffleQuestions() {
    shuffledQuestions = [...questions];
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
    }
}

// 3. startTimer()
function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 15;
    timerEl.textContent = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;

        // Automatically handle timeout if user hasn't submitted
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            if (!answerSubmitted) {
                answerSubmitted = true;
                const correctAns = shuffledQuestions[currentQuestionIndex].answer;
                feedbackEl.textContent = `Time's up! The correct answer is: ${correctAns}`;
                feedbackEl.className = "feedback-msg feedback-wrong";
                submitBtn.disabled = true;
                nextBtn.classList.remove("hidden");
            }
        }
    }, 1000);
}

// 4. displayQuestion()
function displayQuestion() {
    answerSubmitted = false;
    feedbackEl.textContent = "";
    feedbackEl.className = "feedback-msg";
    submitBtn.disabled = false;
    nextBtn.classList.add("hidden");

    const currentQ = shuffledQuestions[currentQuestionIndex];
    questionNumberEl.textContent = `Question ${currentQuestionIndex + 1} of ${shuffledQuestions.length}`;
    questionTextEl.textContent = currentQ.question;

    // Clear previous options and generate new radio buttons
    optionsContainerEl.innerHTML = "";
    currentQ.options.forEach((option, index) => {
        const label = document.createElement("label");
        label.className = "option-item";

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "quiz-option";
        radio.value = option;
        radio.id = `option-${index}`;

        const span = document.createElement("span");
        span.textContent = option;

        label.appendChild(radio);
        label.appendChild(span);
        optionsContainerEl.appendChild(label);
    });

    startTimer();
}

// 5. checkAnswer()
function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz-option"]:checked');

    // Ensure the user selects an option first
    if (!selectedOption) {
        alert("Please select an answer before submitting!");
        return;
    }

    answerSubmitted = true;
    clearInterval(timerInterval);

    const userAnswer = selectedOption.value;
    const correctAnswer = shuffledQuestions[currentQuestionIndex].answer;

    if (userAnswer === correctAnswer) {
        score++;
        scoreDisplayEl.textContent = score;
        feedbackEl.textContent = "Correct! Well done.";
        feedbackEl.className = "feedback-msg feedback-correct";
    } else {
        feedbackEl.textContent = `Incorrect! The correct answer is: ${correctAnswer}`;
        feedbackEl.className = "feedback-msg feedback-wrong";
    }

    submitBtn.disabled = true;
    nextBtn.classList.remove("hidden");
}

// 6. nextQuestion()
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < shuffledQuestions.length) {
        displayQuestion();
    } else {
        clearInterval(timerInterval);
        quizBox.classList.add("hidden");
        resultBox.classList.remove("hidden");
        finalScoreTextEl.textContent = `Your final score is ${score} out of ${shuffledQuestions.length}.`;
    }
}

// 7. startQuiz()
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreDisplayEl.textContent = score;

    resultBox.classList.add("hidden");
    quizBox.classList.remove("hidden");

    shuffleQuestions();
    displayQuestion();
}

// Button Event Listeners
submitBtn.addEventListener("click", checkAnswer);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startQuiz);

// Automatically start the quiz when the page loads
startQuiz();
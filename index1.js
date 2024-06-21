// / quiz portion

// select all elements
document.addEventListener("DOMContentLoaded", function() {
const start_btn =document.querySelector(".start-btn button");
const info_box =document.querySelector(".info-box");
const exit_btn =document.querySelector(".buttons .quit");
const continue_btn =document.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz-box");

// start quiz button is clicked
start_btn.onclick = () => {
    info_box.classList.add("activeInfo");

}
// if exit bttn is clicked
exit_btn.onclick = () => { 
    info_box.classList.remove("activeInfo");
}
continue_btn.onclick = () => { 
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
}

});

//// api provide question





document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.querySelector('.start-btn button');
    const infoBox = document.querySelector('.info-box');
    const quizBox = document.querySelector('.quiz-box');
    const resultBox = document.querySelector('.result-box');
    const nextButton = document.querySelector('.next-btn');
    const quitButton = document.querySelector('.quit');
    const restartButtons = document.querySelectorAll('.restart');
    const questionElement = document.querySelector('.quiz-box section .ques-text');
    const optionList = document.querySelector('.quiz-box section .option-list');
    const currentQuestionCount = document.querySelector('.quiz-box footer .total-ques span p:first-child');
    const timerElement = document.querySelector('.timer'); // Assuming this is the timer display element
    const resultScoreText = document.querySelector('.result-box .score-text span p:first-child'); // Score display in result box
    const scoreget = document.querySelector('#scoreget'); 
    let currentQuestionIndex = 0;
    let questions = [];
    let score = 0;
    let timer;
    const questionTimeInSeconds = 60; // Adjust as needed

    // API endpoint for computer science questions
    const apiUrl = "https://opentdb.com/api.php?amount=5&category=18&type=multiple"; // category=18 is for computer science

    // Start Quiz button click event
    startButton.addEventListener('click', startQuiz);

    // Fetch questions from API
    async function fetchQuestions() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            questions = data.results;
            displayQuestion();
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    }

    // Display current question and options
    function displayQuestion() {
        resetTimer();
        if (currentQuestionIndex < questions.length) {
            const currentQuestion = questions[currentQuestionIndex];
            questionElement.innerHTML = currentQuestion.question;
            optionList.innerHTML = '';

            // Combine correct and incorrect answers
            const allOptions = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
            // Shuffle options randomly
            const shuffledOptions = shuffleArray(allOptions);

            shuffledOptions.forEach(option => {
                const optionElement = document.createElement('div');
                optionElement.classList.add('option');
                optionElement.innerHTML = `<span>${option}</span>`;
                optionElement.addEventListener('click', () => checkAnswer(option === currentQuestion.correct_answer, optionElement));
                optionList.appendChild(optionElement);
            });

            // Update question count
            currentQuestionCount.textContent = currentQuestionIndex + 1;

            // Start timer
            startTimer();
        } else {
            showResult();
        }
    }

    // Start quiz function
    function startQuiz() {
        startButton.style.display = 'none';
        infoBox.classList.add('activeInfo');
        quizBox.classList.add('activeQuiz'); // Show quiz box
        resultBox.classList.remove('activeResult');
        fetchQuestions();
    }

    // Start timer function
    function startTimer() {
        let timeInSeconds = questionTimeInSeconds;
        timerElement.textContent = formatTime(timeInSeconds);

        timer = setInterval(() => {
            timeInSeconds--;
            timerElement.textContent = formatTime(timeInSeconds);

            if (timeInSeconds === 0) {
                clearInterval(timer);
                // Auto-submit answer or handle timeout logic here
                // For example, show the correct answer and move to next question
                handleTimeout();
            }
        }, 1000); // Update timer every second (1000 milliseconds)
    }

    // Reset timer function
    function resetTimer() {
        clearInterval(timer);
        timerElement.textContent = formatTime(questionTimeInSeconds);
    }

    // Format time in MM:SS format
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    // Check if answer is correct
    function checkAnswer(isCorrect, optionElement) {
        clearInterval(timer); // Stop the timer

        if (isCorrect) {
            optionElement.classList.add('correct');
            score++;
        } else {
            optionElement.classList.add('incorrect');
            // Find correct option and mark it
            const correctOption = Array.from(optionList.children).find(option => option.textContent === questions[currentQuestionIndex].correct_answer);
            if (correctOption) {
                correctOption.classList.add('correct');
            }
        }

        // Disable further clicks on options
        const optionElements = document.querySelectorAll('.option');
        optionElements.forEach(option => option.style.pointerEvents = 'none');

        // Show next question button
        nextButton.style.display = 'block';
    }

    // Handle timeout when the timer runs out
    function handleTimeout() {
        const correctOption = Array.from(optionList.children).find(option => option.textContent === questions[currentQuestionIndex].correct_answer);
        if (correctOption) {
            correctOption.classList.add('correct');
        }
        nextButton.style.display = 'block'; // Show next question button
    }

    // Show next question
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        nextButton.style.display = 'none'; // Hide next button until next question is displayed
        displayQuestion();
    });

    // Show result function
    function showResult() {
        infoBox.classList.remove('activeInfo');
        quizBox.classList.remove('activeQuiz');
        resultBox.classList.add('activeResult');
        scoreget.textContent = score; // Display score in result box
    }

    // Event listeners for restart and quit buttons
    restartButtons.forEach(button => {
        button.addEventListener('click', () => {
            window.location.reload(); // Reload page for simplicity in this example
        });
    });

    quitButton.addEventListener('click', () => {
        alert("You cannot quit the quiz!");
    });

    // Shuffle array function
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
});

// Selectors for page elements

// Quiz Variables:
var timerEl = document.querySelector("header span#time");
var startDivEl = document.querySelector("div.start-div");
var startButton = document.querySelector("button#start");
var questionDivEl = document.querySelector("div.question-div");
var answerButtons = document.querySelector("div.buttons");
var questionEl = document.querySelector("h1#question");
var rightWrongEl = document.querySelector("div#right-wrong");

// End of quiz elements:
var endDivEl = document.querySelector("div.end-div");
var finalScoreEl = document.querySelector("h2 span#final-score");
var scoreForm = document.querySelector("form#score-form");
var initialsInput = document.querySelector("input#initials");

// High Score elements:
var hsLink = document.querySelector("header div#hs");
var highScores = document.querySelector("div.high-scores");
var scoresList = document.querySelector("ol#scores-list");
var clearHsBtn = document.querySelector("button#clear");
var goBackHsBtn = document.querySelector("button#go-back");

// Quiz question bank. Questions sourced from:
// W3Schools JavaScript Quiz: https://www.w3schools.com/quiztest/quiztest.asp?qtest=JS
var questionBank = [
    {
        question: "Inside of which HTML element do we place the JavaScript?",
        possibleAns: ["A. <scripting>", "B. <js>", "C. <script>", "D. <javascript>"],
        correctAns: 2
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        possibleAns: ["A. msg('Hello World');", "B. alert('Hello World');", "C. alertBox('Hello World');", "D. msgBox('Hello World');"],
        correctAns: 1
    },
    {
        question: "How do you write an IF statement in JavaScript?",
        possibleAns: ["A. if i = 5", "B. if(i = 5 then)", "C. if i == 5 then", "D. if(i == 5)"],
        correctAns: 3
    },
    {
        question: "How do you write an IF statement for executing some code if 'i' is NOT equal to 5?",
        possibleAns: ["A. if(i != 5)", "B. if(i <> 5)", "C. if i <> 5", "D. if i =! 5 then"],
        correctAns: 0
    },
    {
        question: "How do you round the number 7.25, to the nearest integer?",
        possibleAns: ["A. Math.rnd(7.25)", "B. round(7.25)", "C. rnd(7.25)", "D. Math.round(7.25)"],
        correctAns: 3
    },


];


// initialize quiz variables

var questionIdx = 0; // tracks the current question
var secondsLeft = 60; // tracks time left which also is the score
var timerInterval; // pointer to timer interval
var flashTimeout; // pointer to timeout for right/wrong flash messages

// Helper functions to hide and show elements

function hide(element) {
    element.setAttribute("style", "display: none;");
}

function show(element) {
    element.setAttribute("style", "display: block;");
}


// Quiz Functions

// loads question into html elements
function displayQuestion() {
    var currQuestion = questionBank[questionIdx]; // loads the current question from question bank
    questionEl.textContent = currQuestion.question; // puts question in the question heading
    // puts possible answers into answer buttons
    var possibleAnswers = currQuestion.possibleAns;
    for (var i = 0; i < possibleAnswers.length; i++) {
        answerButtons.children[i].textContent = possibleAnswers[i];
    }
}


// End the quiz - when time runs out or there are no more questions, this function is called
function endQuiz() {
    clearInterval(timerInterval); // clears the timer interval
    timerEl.textContent = 0; // sets the timer display to 0

    // make sure score is not a negative number
    if (secondsLeft < 0) {
        secondsLeft = 0;
    }

    finalScoreEl.textContent = secondsLeft; // displays the seconds left as the score
    hide(questionDivEl); // hides the question div
    show(endDivEl); // shows the end of quiz div

}

// Starts the timer interval and displays time remaining on screen
function startTimer() {
    timerInterval = setInterval(function () {
        secondsLeft--; // decrements time left
        timerEl.textContent = secondsLeft; // displays time left on top of screen
        // when timer runs out
        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            // end the quiz
            endQuiz();
        }
    }, 1000)
}

// Starts the quiz when the Start Quiz button is clicked
function startQuiz() {
    // hide start div
    hide(startDivEl);
    // load first question from question bank
    displayQuestion();
    // show question div
    show(questionDivEl);
    // start timer
    startTimer();
}

// Event listener to start the quiz when the Start Quiz button is clicked
startButton.addEventListener("click", startQuiz);


// loads the next question from the question bank
function nextQuestion() {
    // checks to see if there are more questions in question bank
    // if there are more questions:
    if (questionIdx < questionBank.length - 1) {
        // increment the question index
        questionIdx++;
        // display the new question
        displayQuestion();
    } else {
        // no more questions left
        // display end screen after showing right or wrong for 0.5 second
        setTimeout(function () {
            endQuiz();
        }, 500)

    }
}

// checks answer and displays right or wrong
function checkAnswer(answer) {
    if (questionBank[questionIdx].correctAns == answer) {
        // answer is right
        // flash right message for 1 second
        clearTimeout(flashTimeout);
        rightWrongEl.setAttribute("class", "right");
        rightWrongEl.textContent = "Right!";
        show(rightWrongEl);
        flashTimeout = setTimeout(function () {
            hide(rightWrongEl);
        }, 1000);
    } else {
        // answer is wrong
        // subtract time from clock
        secondsLeft -= 10;
        // flash wrong message for 1 second
        clearTimeout(flashTimeout);
        rightWrongEl.setAttribute("class", "wrong")
        rightWrongEl.textContent = "Wrong.";
        show(rightWrongEl);
        flashTimeout = setTimeout(function () {
            hide(rightWrongEl);
        }, 1000);
        
    }
    // loads the next question
    nextQuestion();
}

// Event listener for the four answer buttons - runs checkAnswer to check for right/wrong
answerButtons.addEventListener("click", function (event) {
    var element = event.target;
    if (element.matches("button")) {
        checkAnswer(element.value);
    }
})



// High Scores 

// initialize array to hold high listings: objects containing initials and scores which will be loaded from localStorage

var scores = [];

// Helper function used to compare scores in order to sort them in decending order
function compareScores(a, b) {
    return b.score - a.score;
}

// displays score ranking on High Scores html
function renderScores() {
    // hide other divs - question, end, start 
    hide(questionDivEl);
    hide(endDivEl);
    hide(startDivEl);

    // clear current scores on page
    scoresList.innerHTML = "";

    // sort scores in order from highest to lowest
    scores.sort(compareScores);

    // render scores on page in LIs
    for (var i = 0; i < scores.length; i++) {
        var li = document.createElement("li");
        li.textContent = `${scores[i].initials} - ${scores[i].score}`;
        scoresList.appendChild(li);
    }
    // show High Scores div
    show(highScores);
}

// updates localStorage with content of scores array
function storeScore() {
    localStorage.setItem("scores", JSON.stringify(scores));
}

// checks for scores in localStorage and loads them into scores array
function loadScores() {
    var storedScores = JSON.parse(localStorage.getItem("scores"));
    if (storedScores) {
        scores = storedScores;
    }
}

// Load any high scores from local Storage before beginning the quiz
loadScores();

// Click listeners on high score buttons

// Clear the high score listing of all scores button
clearHsBtn.addEventListener("click", function () {
    localStorage.clear();
    scores = [];
    renderScores();
})

// Go back to the start screen button
goBackHsBtn.addEventListener("click", function () {
    // clear timer
    clearInterval(timerInterval);
    // initialize quiz variables
    questionIdx = 0;
    secondsLeft = 60;
    // display seconds left
    timerEl.textContent = secondsLeft;
    // hide high scores div and show Start div
    hide(highScores);
    show(startDivEl);
})

// Event listener for submitting high scores listing - initials and score
scoreForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var initials = initialsInput.value.trim();
    // check to make sure form is not blank
    if (!initials) {
        return;
    }
    // create object with initials and score 
    var initialsScore = {
        initials: initials,
        score: secondsLeft
    };

    // add initials and score to scores array
    scores.push(initialsScore);

    // clear initials text input
    initialsInput.value = "";

    // update localStorage with scores array
    storeScore();
    // display high scores with scores listing
    renderScores();
})

// Event listener on high scores link at top of page to display the high scoeres screen
hsLink.addEventListener("click", function () {
    // clear timer if there is one
    clearInterval(timerInterval);
    // render the high score listing on the screen
    renderScores();
})
let questions = null;
/*
const questions = [
    {
        question: "44 + 32",
        answers: [
            {text: "78", correct: false},
            {text: "76", correct: true},
            {text: "10", correct: false},
        ]
    },
    {
        question: "36 + 10",
        answers: [
            {text: "49", correct: false},
            {text: "44", correct: false},
            {text: "46", correct: true},
        ]
    },
    {
        question: "76 + 29",
        answers: [
            {text: "20", correct: false},
            {text: "99", correct: false},
            {text: "105", correct: true},
        ]
    }
];
*/

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;


function startQuiz(){
    console.log("starting quiz");
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";


    loadQuestions();
//    showQuestion();
}


/*
function loadQuestions(){

    const fs = require('fs');
    const json_data = require('1.json');
    fs.readFile(json_data, 'utf8', function (err, data) {
    try {
        data = JSON.parse(data)
        for (let i in data){
        console.log('question:',data[i].question)
        }
    } catch (e) {
        // Catch error in case file doesn't exist or isn't valid JSON
    }
    })
}
*/

function loadQuestions(){
    fetch("https://renegadephantom.github.io/quizdataset/users.json")
    .then(response => response.json())
    .then(data => showInfo(data));
}


function showInfo(data){
//    console.log("showinfo");
//    console.table(data);

    questions = data;
    showQuestion();
    startTimer();
}

function showQuestion(){
    console.log('these are questions');
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = "Q" + questionNumber + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

var timer;
var tele = document.getElementById('timer');

function startTimer(){

    var sec = 0;
    timer = setInterval(()=>{
        tele.innerHTML = '00:'+sec;
      sec ++;
    }, 1000) // each 1 second
}

function stopTimer(){
    clearInterval(timer);

}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }

}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
}  
);

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex< questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

function showScore(){
    resetState();
    stopTimer();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Start Over";
    nextButton.style.display = "block";
}

startQuiz();



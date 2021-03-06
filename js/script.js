// create array to store quiz questions and answers

var quizQuestions = [{
        question: 'How do you call a function named "myFunction?"',
        answers: {
            A: 'function = myFunction()',
            B: 'call function(myFunction)',
            C: 'myFunction()',
            D: 'function(myFunction)'
        },
        correctAnswer: 'C'
    },
    {
        question: 'What is the correct way to write a JavaScript array?',
        answers: {
            A: 'var colors = ["red", "green", "blue"',
            B: 'var colors = "red", "green", "blue"',
            C: 'var colors = [red, green, blue]',
            D: 'var colors = ("red", "green", "blue")',
        },
        correctAnswer: 'A'
    },
    {
        question: 'How do you round the number 7.25 to the nearest integer?',
        answers: {
            A: 'round(7.25)',
            B: 'Math.rnd(7.25',
            C: 'rnd(7.25)',
            D: 'Math.round(7.25'
        },
        correctAnswer: 'D'
    },
    {
        question: 'How does a FOR loop start?',
        answers: {
            A: 'for i = 1 to 5',
            B: 'for(i = 0; i <= 5; i++)',
            C: 'for(i <= 5; i++)',
            D: 'for(i = 0; i <= 5)'
        },
        correctAnswer: 'B'
    },
    {
        question: 'How do you write an IF statement for executing some code if "i" is NOT equal to 5?',
        answers: {
            A: 'if(i != 5)',
            B: 'if i <> 5',
            C: 'if(i <> 5)',
            D: 'if i =! 5 then'
        },
        correctAnswer: 'A'
    },
]
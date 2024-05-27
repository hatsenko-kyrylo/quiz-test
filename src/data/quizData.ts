export interface IAnswer {
    text: string;
    isCorrect: boolean;
    id: number | string;
}

export interface IQuestion {
    id: number | string;
    question: string;
    answers: IAnswer[];
    points: number;
}

export interface IQuiz {
    id: number | string;
    title: string;
    timeLimit: number;
    questions: IQuestion[];
    maxPoints: number;
}

export const quizData: IQuiz[] = [
    {
        id: 'csddcs1',
        title: 'JavaScript Basics',
        timeLimit: 600,
        maxPoints: 30,
        questions: [
            {
                id: 1,
                question: 'What is the output of "2" + 2 in JavaScript?',
                answers: [
                    { text: '22', isCorrect: true, id: 1 },
                    { text: '4', isCorrect: false, id: 2 },
                    { text: 'NaN', isCorrect: false, id: 3 },
                    { text: 'undefined', isCorrect: false, id: 4 },
                ],
                points: 10,
            },
            {
                id: 2,
                question: 'Which company developed JavaScript?',
                answers: [
                    { text: 'Netscape', isCorrect: true, id: 1 },
                    { text: 'Microsoft', isCorrect: false, id: 2 },
                    { text: 'Google', isCorrect: false, id: 3 },
                    { text: 'Apple', isCorrect: false, id: 4 },
                ],
                points: 10,
            },
            {
                id: 3,
                question: 'How do you write a comment in JavaScript?',
                answers: [
                    { text: '// This is a comment', isCorrect: true, id: 1 },
                    { text: '<!-- This is a comment -->', isCorrect: false, id: 2 },
                    { text: '# This is a comment', isCorrect: false, id: 3 },
                    { text: '/* This is a comment */', isCorrect: false, id: 4 },
                ],
                points: 10,
            },
        ],
    },
    {
        id: 2,
        title: 'Python Basics',
        timeLimit: 900,
        maxPoints: 30,
        questions: [
            {
                id: 1,
                question: 'What is the correct file extension for Python files?',
                answers: [
                    { text: '.py', isCorrect: true, id: 1 },
                    { text: '.python', isCorrect: false, id: 2 },
                    { text: '.pt', isCorrect: false, id: 3 },
                    { text: '.pyt', isCorrect: false, id: 4 },
                ],
                points: 10,
            },
            {
                id: 2,
                question: 'How do you create a variable in Python?',
                answers: [
                    { text: 'x = 10', isCorrect: true, id: 1 },
                    { text: 'int x = 10', isCorrect: false, id: 2 },
                    { text: 'var x = 10', isCorrect: false, id: 3 },
                    { text: 'let x = 10', isCorrect: false, id: 4 },
                ],
                points: 10,
            },
            {
                id: 3,
                question: 'Which of the following is a valid function declaration in Python?',
                answers: [
                    { text: 'def my_function():', isCorrect: true, id: 1 },
                    { text: 'function my_function():', isCorrect: false, id: 2 },
                    { text: 'create my_function():', isCorrect: false, id: 3 },
                    { text: 'function:my_function()', isCorrect: false, id: 4 },
                ],
                points: 10,
            },
        ],
    },
];

export function initializeQuizData() {
    if (!localStorage.getItem('quizzes')) {
        localStorage.setItem('quizzes', JSON.stringify(quizData));
    }
}

export function fetchQuizData(): Promise<IQuiz[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const quizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
            resolve(quizzes);
        }, 500);
    });
}

export function getQuizById(id: string | number): IQuiz | undefined {
    const quizzes = JSON.parse(localStorage.getItem('quizzes') || '[]') as IQuiz[];
    const parsedId = typeof id === 'string' ? parseInt(id) : id;
    return quizzes.find((quiz) => quiz.id === parsedId || quiz.id === id);
}

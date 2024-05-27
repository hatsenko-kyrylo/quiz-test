import { FC, useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IQuiz, getQuizById } from '../../data/quizData';

import AnswerItem from '../../components/AnswerItem';

import answerArrow from '../../images/icons/quiz-arrow.svg';

const QuizPage: FC = () => {
    const { id } = useParams<{ id?: string }>();
    const [quiz, setQuiz] = useState<IQuiz | undefined>();
    const [timeLeft, setTimeLeft] = useState<number>(1);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
    const [value, setValue] = useState<number | string | null>(null);
    const [questionIndex, setQuestionIndex] = useState<number>(0);
    const [score, setScore] = useState<number>(0);

    const navigate = useNavigate();

    // Скидує все необхідні для нового проходження змінні
    useEffect(() => {
        setQuestionIndex(0);
        setScore(0);
    }, []);

    // Дістає вікторину
    useEffect(() => {
        if (id) {
            const quizData = getQuizById(id);
            setQuiz(quizData);
            if (quizData) {
                setTimeLeft(quizData.timeLimit);
            }
        }
    }, [id]);

    // Робота таймера
    useEffect(() => {
        if (!quizCompleted && timeLeft > 0) {
            const interval = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
                setElapsedTime((prevTime) => prevTime + 1);
            }, 1000);

            return () => clearInterval(interval);
        } else if (timeLeft === 0) {
            setQuizCompleted(true);
        }
    }, [quizCompleted, timeLeft]);

    // Перехід до наступного питання і перевірка його на правильну відповідь, додавання балів
    const handleNextButtonClick = useCallback(() => {
        if (value !== null && quiz) {
            const currentQuestion = quiz.questions[questionIndex];
            const selectedAnswer = currentQuestion.answers.find((answer) => answer.id === value);
            if (selectedAnswer?.isCorrect) {
                setScore((prevIndex) => prevIndex + currentQuestion.points);
            }
            setValue(null);
            if (questionIndex < quiz.questions.length - 1) {
                setQuestionIndex((prevIndex) => prevIndex + 1);
            } else {
                setQuizCompleted(true);
            }
        }
    }, [value, quiz, questionIndex]);

    if (!quiz) {
        return <div className='text-3xl font-bold text-center'>Quiz not found</div>;
    }

    const currentQuestion = quiz.questions[questionIndex];

    const timeLeftVar = `Time left: ${Math.floor(timeLeft / 60)}:${
        timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60
    }`;
    const timeTakenVar = `Time taken: ${Math.floor(elapsedTime / 60)}:${
        elapsedTime % 60 < 10 ? `0${elapsedTime % 60}` : elapsedTime % 60
    }`;

    return (
        <div className='flex flex-col gap-2'>
            <h1 className='pb-4 text-5xl text-white font-bold border-b-2 border-y-0 border-x-0 border-solid border-black'>
                {quiz.title}
            </h1>
            <p className='text-2xl'>{quizCompleted ? timeTakenVar : timeLeftVar}</p>
            {!quizCompleted && (
                <p className='text-2xl pb-2 border-b-2 border-y-0 border-x-0 border-solid border-black'>
                    Maximum points: {quiz.maxPoints}
                </p>
            )}
            {!quizCompleted && (
                <div className='flex flex-col gap-2'>
                    <p className='text-2xl'>
                        {currentQuestion.question}{' '}
                        <span className='font-bold'>{currentQuestion.points} points</span>
                    </p>
                    <ul>
                        {currentQuestion.answers.map((answer) => (
                            <AnswerItem
                                key={answer.id}
                                data={answer}
                                value={value}
                                setValue={setValue}
                            />
                        ))}
                    </ul>
                    <button
                        disabled={!value}
                        onClick={handleNextButtonClick}
                        className='w-fit h-14 px-5 mb-4 flex gap-4 justify-between items-center shadow-black rounded-lg border-2 border-solid border-primary bg-black disabled:border-gray'
                    >
                        <p className='text-lg font-bold'>Next</p>
                        <img
                            src={answerArrow}
                            alt='Next question'
                            className='w-[30px] h-[30px] drop-shadow-primary cursor-pointer rotate-180 transition-transform duration-300 hover:translate-x-[10px]'
                        />
                    </button>
                </div>
            )}

            {quizCompleted && (
                <div className='flex flex-col items-center'>
                    <p className=' text-2xl font-bold'>
                        Your score: {score} / {quiz.maxPoints}s
                    </p>
                    <p className=' text-2xl font-bold'>
                        {score === quiz.maxPoints
                            ? 'Congratulations! You got all the correct answers!'
                            : 'Keep practicing!'}
                    </p>
                    <button
                        className='w-fit h-10 px-10 mt-4 flex justify-between items-center shadow-black rounded-lg border-2 border-solid border-primary bg-black active:translate-x-[2px] active:translate-y-[2px]'
                        onClick={() => navigate('/')}
                    >
                        Back
                    </button>
                </div>
            )}
        </div>
    );
};

export default QuizPage;

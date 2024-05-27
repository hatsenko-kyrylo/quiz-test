import React, { useState, useEffect } from 'react';

import QuizItem from '../../components/QuizItem';

import { fetchQuizData, IQuiz, initializeQuizData } from '../../data/quizData';
import { Link } from 'react-router-dom';

const MainPage = () => {
    const [quizzes, setQuizzes] = useState<IQuiz[]>([]);

    useEffect(() => {
        initializeQuizData();
        fetchQuizData().then((data) => setQuizzes(data));
    }, []);

    return (
        <div className='w-[1200px] h-fit flex flex-col gap-5'>
            <h1 className='text-5xl text-white font-bold'>Quizzes</h1>
            <Link
                to='/add'
                className='w-fit h-14 px-5 flex gap-4 justify-between items-center text-lg font-bold shadow-black rounded-lg border-2 border-solid border-primary bg-black cursor-pointer active:translate-x-0.5 active:translate-y-0.5'
            >
                Add quiz
            </Link>
            <ul className='max-w-[500px] '>
                {quizzes.map((quiz) => (
                    <QuizItem key={quiz.id} data={quiz} quizzes={quizzes} setQuizzes={setQuizzes} />
                ))}
            </ul>
        </div>
    );
};

export default MainPage;

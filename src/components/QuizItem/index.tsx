import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import quizEdit from '../../images/icons/quiz-edit.svg';
import quizDelete from '../../images/icons/quiz-delete.svg';
import quizArrow from '../../images/icons/quiz-arrow.svg';

import { IQuiz } from '../../data/quizData';

interface IQuizItemProps {
    data: IQuiz;
    quizzes: IQuiz[];
    setQuizzes: (quizzes: IQuiz[]) => void;
}

const QuizItem: FC<IQuizItemProps> = ({ data, quizzes, setQuizzes }) => {
    const navigate = useNavigate();

    const goToQuiz = () => {
        navigate(`quiz/${data.id}`);
    };
    const handleEditQuiz = () => {};
    const handleDeleteQuiz = () => {
        const updatedQuizzes = quizzes.filter((quiz) => quiz.id !== data.id);
        localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
        setQuizzes(updatedQuizzes);
    };

    return (
        <li className='h-20 px-5 mb-4 flex justify-between items-center shadow-black rounded-lg border-2 border-solid border-black'>
            <div className='flex gap-5 '>
                <img
                    src={quizArrow}
                    alt='Go to quiz'
                    className='w-[35px] h-[35px] drop-shadow-primary cursor-pointer transition-transform duration-300 hover:translate-x-[-10px]'
                    onClick={goToQuiz}
                />
                <p className='w-full h-full align-middle text-3xl'>{data.title}</p>
            </div>
            <div className='flex gap-4'>
                <div
                    className='drop-shadow-primary cursor-pointer active:translate-x-0.5 active:translate-y-0.5'
                    onClick={handleEditQuiz}
                >
                    <img src={quizEdit} alt='Edit quiz' />
                </div>
                <div
                    className='drop-shadow-primary cursor-pointer active:translate-x-0.5 active:translate-y-0.5'
                    onClick={handleDeleteQuiz}
                >
                    <img src={quizDelete} alt='Delete quiz' />
                </div>
            </div>
        </li>
    );
};

export default QuizItem;

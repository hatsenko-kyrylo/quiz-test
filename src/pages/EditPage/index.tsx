import { FC, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { fetchQuizData } from '../../data/quizData';
import EditPageQuestion from '../../components/EditPageQuestion';
import { useNavigate } from 'react-router-dom';

interface IEditPageProps {
    type: 'ADD' | 'EDIT';
}

const createNewQuestion = () => ({
    id: uuidv4(),
    question: '',
    answers: [{ text: '', isCorrect: false, id: uuidv4() }],
    points: 10,
});

const EditPage: FC<IEditPageProps> = ({ type }) => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([createNewQuestion()]);
    const [quizTitle, setQuizTitle] = useState<string>('');
    const [quizTimeLimit, setQuizTimeLimit] = useState<number | ''>('');

    const handleChangeTimeLimit = (value: string) => {
        if (/^\d*$/.test(value)) {
            setQuizTimeLimit(value === '' ? '' : Number(value));
        }
    };

    const handleQuestionChange = (index: number, question: any) => {
        setQuestions((prevQuestions) => {
            const newQuestions = [...prevQuestions];
            newQuestions[index] = question;
            return newQuestions;
        });
    };

    const addQuestion = () => {
        setQuestions((prevQuestions) => [...prevQuestions, createNewQuestion()]);
    };

    const newQuiz = {
        id: uuidv4(),
        title: quizTitle,
        timeLimit: +quizTimeLimit * 60,
        maxPoints: questions.reduce((sum, q) => sum + q.points, 0),
        questions: questions,
    };

    const setNewQuizToLocalStorage = async () => {
        const data = await fetchQuizData();
        const newQuizzes = [...data, newQuiz];
        localStorage.removeItem('quizzes');
        localStorage.setItem('quizzes', JSON.stringify(newQuizzes));
        navigate('/');
    };

    return (
        <div className='w-[1200px] p-3 pb-10 h-full flex flex-col gap-5 overflow-y-auto shadow-black rounded-lg border-4 border-solid border-black'>
            <h1 className='text-5xl text-white font-bold'>Add Quiz</h1>
            <div className='flex gap-4'>
                <input
                    className='w-[400px] h-20 px-5 bg-white flex justify-between items-center text-black text-2xl shadow-black rounded-lg border-2 border-solid border-black placeholder:text-black/50 placeholder:text-2xl'
                    type='text'
                    placeholder='Title of quiz'
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                />
                <input
                    className='w-[400px] h-20 px-5 bg-white flex justify-between items-center text-black text-2xl shadow-black rounded-lg border-2 border-solid border-black placeholder:text-black/50 placeholder:text-2xl'
                    type='text'
                    placeholder='Time of quiz (in minutes)'
                    value={quizTimeLimit}
                    onChange={(e) => handleChangeTimeLimit(e.target.value)}
                />
                <button
                    className='w-fit h-full px-5 flex gap-4 justify-between items-center text-2xl font-bold shadow-black rounded-lg border-2 border-solid border-primary bg-black cursor-pointer active:translate-x-0.5 active:translate-y-0.5 disabled:border-gray'
                    disabled={!quizTitle || !quizTimeLimit}
                    onClick={setNewQuizToLocalStorage}
                >
                    Create quiz
                </button>
            </div>
            <div>
                <h2 className='text-3xl mb-2 text-white font-bold'>Questions</h2>
                {questions.map((question, i) => (
                    <EditPageQuestion
                        key={i}
                        question={question}
                        onChange={(q) => handleQuestionChange(i, q)}
                    />
                ))}
                <button
                    type='button'
                    className='w-fit h-14 px-5 flex gap-4 justify-between items-center text-lg font-bold shadow-black rounded-lg border-2 border-solid border-primary bg-black cursor-pointer active:translate-x-0.5 active:translate-y-0.5'
                    onClick={addQuestion}
                >
                    Add Question
                </button>
            </div>
        </div>
    );
};

export default EditPage;

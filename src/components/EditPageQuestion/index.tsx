import { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { IQuestion, IAnswer } from '../../data/quizData';

import EditPageAnswer from '../../components/EditPageAnswer';

interface IEditPageQuestionProps {
    question: IQuestion;
    onChange: (question: IQuestion) => void;
}
const EditPageQuestion: FC<IEditPageQuestionProps> = ({ question, onChange }) => {
    const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({ ...question, question: e.target.value });
    };

    const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPoints = parseInt(e.target.value);
        if (!isNaN(newPoints)) {
            onChange({ ...question, points: newPoints });
        } else if (e.target.value === '') {
            onChange({ ...question, points: 0 });
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
        if (!/^[0-9]$/.test(e.key) && !allowedKeys.includes(e.key)) {
            e.preventDefault();
        }
    };

    const handleAnswerChange = (index: number, updatedAnswer: IAnswer) => {
        const updatedAnswers = [...question.answers];
        updatedAnswers[index] = updatedAnswer;
        onChange({ ...question, answers: updatedAnswers });
    };

    const handleSetCorrectAnswer = (correctAnswerId: string | number) => {
        const updatedAnswers = question.answers.map((answer) => ({
            ...answer,
            isCorrect: answer.id === correctAnswerId,
        }));
        onChange({ ...question, answers: updatedAnswers });
    };

    const addAnswer = () => {
        const newAnswer: IAnswer = { text: '', isCorrect: false, id: uuidv4() };
        onChange({ ...question, answers: [...question.answers, newAnswer] });
    };

    return (
        <div className='py-4 px-2 mb-4 shadow-black rounded-lg border-2 border-solid border-black'>
            <input
                className='w-[300px] h-14 mb-4 px-5 bg-white flex justify-between items-center text-black text-2xl shadow-black rounded-lg border-2 border-solid border-black placeholder:text-black/50 placeholder:text-2xl'
                type='text'
                placeholder='Title of question'
                value={question.question}
                onChange={handleQuestionChange}
            />
            <h3 className='text-2xl mb-2 text-white font-bold'>
                Answers on questions (Choose one correct answer)
            </h3>
            <div className='w-fit p-4 flex flex-col gap-4 mb-4 shadow-black rounded-lg border-2 border-solid border-black'>
                {question.answers.map((answer, i) => (
                    <EditPageAnswer
                        key={answer.id}
                        answer={answer}
                        onChange={(updatedAnswer) => handleAnswerChange(i, updatedAnswer)}
                        onSetCorrect={() => handleSetCorrectAnswer(answer.id)}
                    />
                ))}
                {question.answers.length < 5 && (
                    <button
                        type='button'
                        className='w-fit h-14 px-5 flex gap-4 justify-between items-center text-lg font-bold shadow-black rounded-lg border-2 border-solid border-primary bg-black cursor-pointer active:translate-x-0.5 active:translate-y-0.5'
                        onClick={addAnswer}
                    >
                        Add answer
                    </button>
                )}
            </div>
            <input
                className='w-[300px] h-14 px-5 bg-white flex justify-between items-center text-black text-2xl shadow-black rounded-lg border-2 border-solid border-black placeholder:text-black/50 placeholder:text-2xl'
                type='text'
                placeholder='Points per question'
                value={question.points}
                onChange={(e) => handlePointsChange(e)}
                onKeyDown={(e) => handleKeyPress(e)}
            />
        </div>
    );
};

export default EditPageQuestion;

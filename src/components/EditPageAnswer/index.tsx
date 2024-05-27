import { FC } from 'react';

import { IAnswer } from '../../data/quizData';

interface IEditPageAnswerProps {
    answer: any;
    onChange: (answer: any) => void;
    onSetCorrect: () => void;
}

const EditPageAnswer: FC<IEditPageAnswerProps> = ({ answer, onChange, onSetCorrect }) => {
    const handleCheckboxChange = () => {
        onSetCorrect();
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedAnswer: IAnswer = { ...answer, text: e.target.value };
        onChange(updatedAnswer);
    };
    return (
        <div className='flex items-center gap-4'>
            <input
                className='w-[300px] h-14 px-5 bg-white flex justify-between items-center text-black text-2xl shadow-black rounded-lg border-2 border-solid border-black placeholder:text-black/50 placeholder:text-2xl'
                type='text'
                placeholder='Answer'
                value={answer.text}
                onChange={handleTextChange}
            />
            <input
                type='checkbox'
                className='hidden peer'
                id={`form-checkbox-${answer.id}`}
                checked={answer.isCorrect}
                onChange={handleCheckboxChange}
            />
            <label
                htmlFor={`form-checkbox-${answer.id}`}
                className='relative h-[30px] min-w-[30px] rounded-full border-2 border-solid border-white shadow-black overflow-hidden transition-opacity  duration-200 ease-in-out before:content-[""] before:absolute before:w-[30px] before:h-[30px] before:bg-primary before:opacity-0 before:left-0 peer-checked:before:opacity-100'
            ></label>
        </div>
    );
};

export default EditPageAnswer;

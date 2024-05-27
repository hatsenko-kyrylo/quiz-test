import { FC } from 'react';

import { IAnswer } from '../../data/quizData';

interface IAnswerItemProps {
    data: IAnswer;
    value: number | string | null;
    setValue: (id: number | string) => void;
}

const AnswerItem: FC<IAnswerItemProps> = ({ data, value, setValue }) => {
    const onCheckboxValue = () => {
        setValue(data.id);
    };

    return (
        <li className='h-14 px-5 mb-4 flex justify-between items-center shadow-black rounded-lg border-2 border-solid border-black'>
            <div className='flex gap-4 items-center relative'>
                <input
                    type='checkbox'
                    className='hidden peer'
                    id={`form-checkbox-${data.id}`}
                    checked={value === data.id}
                    onChange={onCheckboxValue}
                />
                <label
                    htmlFor={`form-checkbox-${data.id}`}
                    className='relative h-[30px] min-w-[30px] rounded-full border-2 border-solid border-white shadow-black overflow-hidden transition-opacity  duration-200 ease-in-out before:content-[""] before:absolute before:w-[30px] before:h-[30px] before:bg-primary before:opacity-0 before:left-0 peer-checked:before:opacity-100'
                ></label>
                <label htmlFor={`form-checkbox-${data.id}`} className='text-lg font-md'>
                    {data.text}
                </label>
            </div>
        </li>
    );
};

export default AnswerItem;

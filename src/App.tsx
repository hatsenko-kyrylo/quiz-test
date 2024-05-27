import { Routes, Route } from 'react-router-dom';

import MainPage from './pages/MainPage';
import QuizPage from './pages/QuizPage';
import EditPage from './pages/EditPage';

function App() {
    return (
        <div className='h-dvh p-10 w-full flex justify-center items-center'>
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/quiz/:id' element={<QuizPage />} />
                <Route path='/add' element={<EditPage type='ADD' />} />

                {/* Недороблено <Route path='/edit' element={<EditPage type='EDIT' />} /> */}
            </Routes>
        </div>
    );
}

export default App;

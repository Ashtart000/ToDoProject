import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import TodoPage from './Pages/ToDoPage';

function App() {

  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home sendUser={setUser} />} />
        <Route path='/tasks/' element={<TodoPage user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
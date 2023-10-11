import React, {useState, useEffect} from 'react';
import { unstable_HistoryRouter as HistoryRouter, BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import TodoPage from './Pages/ToDoPage';
import { authUser } from './api/';
import history from './BrowserHistory';

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    if(!user) {
            authUser()
            .then(userData => {
              setUser(userData.data)
            })
            .catch(error => {
                history.push('/');
            })
        }

  }, []);

  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path='/' element={<Home sendUser={setUser} />} />
        <Route path='/tasks/' element={<TodoPage user={user} />} />
      </Routes>
    </HistoryRouter>
  );
}
export default App;
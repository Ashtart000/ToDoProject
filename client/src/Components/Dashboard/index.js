import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authUser } from '../../api';
import TodoPage from '../../Pages/ToDoPage';

const Dashboard = (props) => {
    const [todo, setTodo] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if(!props.user) {
            authUser()
            .then(userData => {
                props.sendUser(userData.data)
            })
            .catch(error => {
                navigate('/');
            })
        } 
        setTodo(true)  
    }, [])

    return (
        <>
            {todo ? <TodoPage /> : null}
        </>
    );
}

export default Dashboard;

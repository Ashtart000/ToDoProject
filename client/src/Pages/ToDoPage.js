import React, { useEffect, useState } from 'react';
import ToDoList from '../Components/ToDoList';
import { useNavigate } from 'react-router-dom';
import { getTasks, createTask, authUser } from '../api';
import ToDoForm from '../Components/ToDoForm';

const TodoPage = (props) => {
    const [todos, setTodos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if(!props.user) {
            const token = localStorage.getItem('token');
            if(token) {
                authUser(token)
                .then(userData => {
                    props.sendUser(userData.data)})
                .catch(error => {
                    return navigate('/');
                })
            } else {
                return navigate('/');
            }
        } else {
            getTasks(props.user._id)
            .then(result => {
                setTodos(result.data);
            })
            .catch(error => {
                console.error(error);
            })
        }
    }, [props.user]);

    const getNewTd = (data) => {
        createTask({
            status: 'new',
            ...data
        })
        .then(({data: createdTask}) => {
            const newTodo = [...todos, createdTask];
            setTodos(newTodo);
        })
        .catch(error => {
            console.error(error)
        })
    }

    return (
        <div>
            <h2>ToDo List</h2>
            <ToDoList todos={todos}/>
            <ToDoForm sendData={getNewTd}/>
        </div>
    );
}
export default TodoPage;

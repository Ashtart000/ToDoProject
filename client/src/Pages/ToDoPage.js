import React, { useEffect, useState } from 'react';
import ToDoList from '../Components/ToDoList';
import { useNavigate } from 'react-router-dom';
import { getTasks, createTask, deleteTask } from '../api';
import ToDoForm from '../Components/ToDoForm';

const TodoPage = (props) => {
    const [todos, setTodos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getTasks()
            .then(result => {
                setTodos(result.data);
            })
            .catch(error => {
                console.error(error);
            })
        }, []);

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

    const delTask = (id) => {
        deleteTask(id)
        .then(({data: deletedTask}) => {
            const updatedTask = todos.filter(td => td._id !== deletedTask._id);
            setTodos(updatedTask);
        })
        .catch(error => {
            console.error(error);
        })
    }

    return (
        <div>
            <h2>ToDo List</h2>
            <ToDoForm sendData={getNewTd} />
            <ToDoList todos={todos} delCallback={delTask} />
        </div>
    );
}
export default TodoPage;

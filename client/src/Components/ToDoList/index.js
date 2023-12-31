import React from 'react';
import TodoItem from '../ToDoItem';

const ToDoList = (props) => {
    return (
        <ul>
            {props.todos.map(td => <TodoItem item={td} key={td._id} delete={props.delCallback} />)}
        </ul>
    );
}

export default ToDoList;

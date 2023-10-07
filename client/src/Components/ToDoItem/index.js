import React from 'react';

const TodoItem = (props) => {
    const {item: {body, deadline, status}} = props;

    return (
        <li>
            <span>{body}</span>
            <span>{new Date(deadline).toISOString()}</span>
        </li>
    );
}

export default TodoItem;
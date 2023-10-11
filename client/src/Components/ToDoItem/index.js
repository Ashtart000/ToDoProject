import React from 'react';

const TodoItem = (props) => {
    const {item: {_id, body, deadline, status}} = props;

    return (
        <li>
            <span>{body}</span>
            <span>{new Date(deadline).toISOString()}</span>
            <span>{status}</span>
            <button onClick={() => props.delete(_id)}>Delete</button>
        </li>
    );
}

export default TodoItem;
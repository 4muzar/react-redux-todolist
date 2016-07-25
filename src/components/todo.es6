import React from 'react';

const Todo = ({
    text,
    completed,
    onclick
}) => (
    <li onClick={onclick}>
        <span style={{
            textDecoration: completed ? 'line-through' : ''
        }}>{text}</span>
    </li>
);

export default Todo;
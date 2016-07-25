import React from 'react';
import Todo from './todo';

const TodoList = ({
    todos,
    onTodoClick
}) => (
    <ul>
        {todos.map(todo =>
            <Todo
                key={todo.id}
                {...todo}
                onclick={() => onTodoClick(todo.id)}
            />
        )}
    </ul>
);

export default TodoList;
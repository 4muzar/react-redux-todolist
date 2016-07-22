import { Component } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';

const todo = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case 'TOGGLE_TODO':
            if (state.id != action.id) {
                return state;
            }

            return {
                ...state,
                completed: !state.completed
            };
        default:
            return state;
    }
};

const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ];
        case 'REMOVE_TODO':
            return [
                ...state.slice(0, action.id),
                ...state.slice(action.id + 1)
            ];
        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action));
        default:
            return state;
    }
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.value;
        default:
            return state;
    }
};

const todoApp = combineReducers({
    todos,
    visibilityFilter
});
const store = createStore(todoApp);

const AddTodo = ({
    onClick
}) => {
    let input;

    return (
        <div>
            <input ref={(node) => input = node}/>
            <button onClick={() => {
                onClick(input.value);
                input.value = '';
            }}>
                add todo
            </button>
        </div>
    );
};

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

const FilterLink = ({
    filter,
    currentFilter,
    onClick,
    children
}) => {
    if (currentFilter === filter) {
        return <span>{children}</span>;
    }

    return (
        <a href="#" onClick={(e) => {
            e.preventDefault();

            onClick(filter);
        }}>
            {children}
        </a>
    );
};

const Footer = ({
    visibilityFilter,
    onFilterLinkClick
}) => (
    <div>
        <FilterLink filter="SHOW_ALL" currentFilter={visibilityFilter} onClick={onFilterLinkClick}>
            all
        </FilterLink>
        {', '}
        <FilterLink filter="SHOW_ACTIVE" currentFilter={visibilityFilter} onClick={onFilterLinkClick}>
            active
        </FilterLink>
        {', '}
        <FilterLink filter="SHOW_COMPLETED" currentFilter={visibilityFilter} onClick={onFilterLinkClick}>
            completed
        </FilterLink>
    </div>
);

const getVisibleTodos = ({todos, visibilityFilter}) => {
    return todos.filter((todo) => {
        switch (visibilityFilter) {
            case "SHOW_ALL":
                return todo;
            case "SHOW_ACTIVE":
                return !todo.completed;
            case "SHOW_COMPLETED":
                return todo.completed;
        }
    });
};

let todoID = 0;
const TodoApp = ({
    todos,
    visibilityFilter
}) => (
    <div>
        <AddTodo onClick={(text) => {
            store.dispatch({
                type: 'ADD_TODO',
                text: text,
                id: todoID++
            });
        }}/>
        <TodoList
            todos={getVisibleTodos({
                todos,
                visibilityFilter
            })}
            onTodoClick={(todoId) => {
                store.dispatch({
                    type: 'TOGGLE_TODO',
                    id: todoId
                });
            }}
        />
        <Footer
            visibilityFilter={visibilityFilter}
            onFilterLinkClick={(filter) => {
                store.dispatch({
                    type: 'SET_VISIBILITY_FILTER',
                    value: filter
                });
            }}
        />
    </div>
);


const render = () => {
    ReactDOM.render(
        <TodoApp
            {...store.getState()}
        />,
        document.querySelector('#root')
    );
};

store.subscribe(() => {
    render();
});
render();
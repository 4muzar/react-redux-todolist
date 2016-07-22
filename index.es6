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
                ...state.slice(action.id + 1),
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

const Todo = ({todo}) => {
    return (
        <li onClick={() => {
            store.dispatch({
                type: 'TOGGLE_TODO',
                id: todo.id
            });
        }}>
            <span style={{
                textDecoration: todo.completed ? 'line-through' : ''
            }}>{todo.text}</span>
        </li>
    );
};

const FilterLink = ({
    filter,
    currentFilter,
    children
}) => {
    if (currentFilter === filter) {
        return <span>{children}</span>;
    }

    return (
        <a href="" onClick={(e) => {
            e.preventDefault();
            store.dispatch({
                type: 'SET_VISIBILITY_FILTER',
                value: filter
            });
        }}>
            {children}
        </a>
    );
};

const getVisibleTodos = ({todos, currentFilter}) => {
    return todos.filter((todo) => {
        switch (currentFilter) {
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
class TodoApp extends Component {
    render() {
        const { todos } = store.getState();
        const currentFilter = store.getState().visibilityFilter;
        const visibleTodos = getVisibleTodos({
            todos,
            currentFilter
        });

        return (
            <div>
                <input ref={(node) => this.input = node}/>
                <button onClick={() => {
                    store.dispatch({
                        type: 'ADD_TODO',
                        text: this.input.value,
                        id: todoID++
                    });
                    this.input.value = '';
                }}>
                    add todo
                </button>
                <ul>
                    {visibleTodos.map(todo =>
                        <Todo key={todo.id} todo={todo} />
                    )}
                </ul>
                <FilterLink filter="SHOW_ALL" currentFilter={currentFilter}>
                    all
                </FilterLink>
                {', '}
                <FilterLink filter="SHOW_ACTIVE" currentFilter={currentFilter}>
                    active
                </FilterLink>
                {', '}
                <FilterLink filter="SHOW_COMPLETED" currentFilter={currentFilter}>
                    completed
                </FilterLink>
            </div>
        );
    }
}

const render = () => {
    ReactDOM.render(
        <TodoApp/>,
        document.querySelector('#root')
    );
};

store.subscribe(() => {
    render();
});
render();
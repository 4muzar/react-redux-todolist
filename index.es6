import { Component } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';

// reducers

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

// components

let todoID = 0;
const AddTodo = ({
    store
}) => {
    let input;
    
    return (
        <div>
            <input ref={(node) => input = node}/>
            <button onClick={() => {
                store.dispatch({
                    type: 'ADD_TODO',
                    text: input.value,
                    id: todoID++
                });
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

class VisibleTodoList extends Component {

    state = {
        todos: this.props.store.getState().todos,
        visibilityFilter: this.props.store.getState().visibilityFilter
    };

    componentDidMount() {
        this.unsubscribe = this.props.store.subscribe(() => {
            this.setState({
                todos: this.props.store.getState().todos,
                visibilityFilter: this.props.store.getState().visibilityFilter
            });
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const visibleTodos = this.getVisibleTodos(todos);

        return (
            <TodoList
                todos={visibleTodos}
                onTodoClick={(todoId) => {
                    this.props.store.dispatch({
                        type: 'TOGGLE_TODO',
                        id: todoId
                    });
                }}
            />
        );
    }

    getVisibleTodos () {
        const { todos, visibilityFilter } = this.state;

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
    }
}

const Link = ({
    active,
    onClick,
    children
}) => {
    if (active) {
        return <span>{children}</span>;
    }

    return (
        <a href="#" onClick={(e) => {
            e.preventDefault();

            onClick();
        }}>
            {children}
        </a>
    );
};

class FilterLink extends Component {

    state = {
        visibilityFilter: this.props.store.getState().visibilityFilter
    };

    componentDidMount() {
        this.unsubscribe = this.props.store.subscribe(() => {
            this.setState({
                visibilityFilter: this.props.store.getState().visibilityFilter
            });
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const { visibilityFilter } = this.state;
        const { filter, children } = this.props;
        const active = visibilityFilter === filter;

        return (
            <Link
                active={active}
                onClick={() => {
                    this.props.store.dispatch({
                        type: 'SET_VISIBILITY_FILTER',
                        value: filter
                    });
                }}
            >
                {children}
            </Link>
        );
    }
}

const Footer = ({
    store
}) => (
    <div>
        Show:
        {' '}
        <FilterLink filter="SHOW_ALL" store={store}>
            all
        </FilterLink>
        {', '}
        <FilterLink filter="SHOW_ACTIVE" store={store}>
            active
        </FilterLink>
        {', '}
        <FilterLink filter="SHOW_COMPLETED" store={store}>
            completed
        </FilterLink>
    </div>
);

const TodoApp = ({
    store
}) => (
    <div>
        <AddTodo store={store} />
        <VisibleTodoList store={store} />
        <Footer store={store} />
    </div>
);

// app index

const todoApp = combineReducers({
    todos,
    visibilityFilter
});

ReactDOM.render(
    <TodoApp store={createStore(todoApp)}/>,
    document.querySelector('#root')
);
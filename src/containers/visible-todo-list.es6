import React, { Component, PropTypes } from 'react';
import TodoList from './../components/todo-list';

class VisibleTodoList extends Component {
    
    static contextTypes = {
        store: PropTypes.object  
    };

    state = {
        todos: this.context.store.getState().todos,
        visibilityFilter: this.context.store.getState().visibilityFilter
    };

    componentDidMount() {
        this.unsubscribe = this.context.store.subscribe(() => {
            this.setState({
                todos: this.context.store.getState().todos,
                visibilityFilter: this.context.store.getState().visibilityFilter
            });
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const visibleTodos = this.getVisibleTodos();

        return (
            <TodoList
                todos={visibleTodos}
                onTodoClick={(todoId) => {
                    this.context.store.dispatch({
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

export default VisibleTodoList;
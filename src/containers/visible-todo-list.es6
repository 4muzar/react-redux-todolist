import React, { Component } from 'react';
import TodoList from './../components/todo-list';

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
        const visibleTodos = this.getVisibleTodos();

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

export default VisibleTodoList;
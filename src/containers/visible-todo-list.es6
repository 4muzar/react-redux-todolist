import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TodoList from './../components/todo-list';
import { toggleTodo } from '../actions/todos';

function getVisibleTodos ({todos, visibilityFilter}) {
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

export default connect(
    (state) => {
        return {
            todos: getVisibleTodos({
                todos: state.todos,
                visibilityFilter: state.visibilityFilter
            })
        }
    },
    (dispatch) => {
        return {
            onTodoClick: (todoId) => {
                dispatch(toggleTodo(todoId));
            }
        }
    }
)(TodoList);
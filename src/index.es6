import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

import reducers from './reducers';

import AddTodo from './containers/add-todo';
import VisibleTodoList from './containers/visible-todo-list';
import Footer from './components/Footer';

class TodoApp extends Component {

    static childContextTypes = {
        store: PropTypes.object
    };

    getChildContext() {
        return {
            store: this.props.store
        }
    }

    render() {
        return (
            <div>
                <AddTodo />
                <VisibleTodoList />
                <Footer />
            </div>
        );
    }
}


ReactDOM.render(
    <TodoApp store={createStore(reducers)}/>,
    document.querySelector('#root')
);
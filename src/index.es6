import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducers from './reducers';

import AddTodo from './containers/add-todo';
import VisibleTodoList from './containers/visible-todo-list';
import Footer from './components/Footer';

const TodoApp = () => (
    <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
    </div>
);


ReactDOM.render(
    <Provider store={createStore(reducers)}>
        <TodoApp />
    </Provider>,
    document.querySelector('#root')
);
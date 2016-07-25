import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

import reducers from './reducers';

import AddTodo from './containers/add-todo';
import VisibleTodoList from './containers/visible-todo-list';
import Footer from './components/Footer';

const TodoApp = ({
    store
}) => (
    <div>
        <AddTodo store={store} />
        <VisibleTodoList store={store} />
        <Footer store={store} />
    </div>
);

ReactDOM.render(
    <TodoApp store={createStore(reducers)}/>,
    document.querySelector('#root')
);
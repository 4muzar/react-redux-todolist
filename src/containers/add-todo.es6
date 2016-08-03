import React, { PropTypes } from 'react';

let todoID = 0;

const AddTodo = (props, context) => {
    let input;

    return (
        <div>
            <input ref={(node) => input = node}/>
            <button onClick={() => {
                context.store.dispatch({
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

AddTodo.contextTypes = {
    store: PropTypes.object
};

export default AddTodo;
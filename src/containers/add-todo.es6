import React from 'react';

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

export default AddTodo;
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

let todoID = 0;

const AddTodo = ({ dispatch }) => {
    let input;

    return (
        <div>
            <input ref={(node) => input = node}/>
            <button onClick={() => {
                dispatch({
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

export default connect()(AddTodo);
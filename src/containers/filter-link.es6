import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Link from './../components/link';

export default connect(
    (state, props) => {
        return {
            active: state.visibilityFilter === props.filter
        }
    },
    (dispatch, props) => {
        return {
            onClick: () => {
                dispatch({
                    type: 'SET_VISIBILITY_FILTER',
                    value: props.filter
                });
            }
        }
    }
)(Link);
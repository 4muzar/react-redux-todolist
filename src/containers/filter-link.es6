import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Link from './../components/link';
import { setVisibilityFilter } from '../actions/visibility-filter';

export default connect(
    (state, props) => {
        return {
            active: state.visibilityFilter === props.filter
        }
    },
    (dispatch, props) => {
        return {
            onClick: () => {
                dispatch(setVisibilityFilter(props.filter));
            }
        }
    }
)(Link);
import React, { Component, PropTypes } from 'react';
import Link from './../components/link';

class FilterLink extends Component {

    static contextTypes = {
        store: PropTypes.object
    };

    state = {
        visibilityFilter: this.context.store.getState().visibilityFilter
    };

    componentDidMount() {
        this.unsubscribe = this.context.store.subscribe(() => {
            this.setState({
                visibilityFilter: this.context.store.getState().visibilityFilter
            });
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const { visibilityFilter } = this.state;
        const { filter, children } = this.props;
        const active = visibilityFilter === filter;

        return (
            <Link
                active={active}
                onClick={() => {
                    this.context.store.dispatch({
                        type: 'SET_VISIBILITY_FILTER',
                        value: filter
                    });
                }}
            >
                {children}
            </Link>
        );
    }
}

export default FilterLink;
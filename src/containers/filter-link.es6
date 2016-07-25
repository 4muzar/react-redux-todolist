import React, { Component } from 'react';
import Link from './../components/link';

class FilterLink extends Component {

    state = {
        visibilityFilter: this.props.store.getState().visibilityFilter
    };

    componentDidMount() {
        this.unsubscribe = this.props.store.subscribe(() => {
            this.setState({
                visibilityFilter: this.props.store.getState().visibilityFilter
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
                    this.props.store.dispatch({
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
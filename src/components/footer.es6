import React from 'react';
import FilterLink from './../containers/filter-link';

const Footer = ({
    store
}) => (
    <div>
        Show:
        {' '}
        <FilterLink filter="SHOW_ALL" store={store}>
            all
        </FilterLink>
        {', '}
        <FilterLink filter="SHOW_ACTIVE" store={store}>
            active
        </FilterLink>
        {', '}
        <FilterLink filter="SHOW_COMPLETED" store={store}>
            completed
        </FilterLink>
    </div>
);

export default Footer;
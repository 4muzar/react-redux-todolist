import React from 'react';
import FilterLink from './../containers/filter-link';

const Footer = () => (
    <div>
        Show:
        {' '}
        <FilterLink filter="SHOW_ALL">
            all
        </FilterLink>
        {', '}
        <FilterLink filter="SHOW_ACTIVE">
            active
        </FilterLink>
        {', '}
        <FilterLink filter="SHOW_COMPLETED">
            completed
        </FilterLink>
    </div>
);

export default Footer;
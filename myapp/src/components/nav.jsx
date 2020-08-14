import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

 
const Nav = (props) => {
    
    const logged_out_nav = (
        <ul>
            <li onClick={() => props.display_form('login')}>login</li>
            <li onClick={() => props.display_form('signup')}>signup</li>
        </ul>
    );

    const logged_in_nav = (
        <ul>
            <li onClick={props.handle_logout}>logout</li>
        </ul>
    )


    return ( <div>{props.logged_in ? logged_in_nav : <Link to="/login">Login</Link>}</div> );
}
 
export default Nav;


Nav.propTypes = {
    logged_in: PropTypes.bool.isRequired,
    display_form: PropTypes.func.isRequired,
    handle_logout: PropTypes.func.isRequired,
};
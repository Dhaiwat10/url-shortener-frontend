import React from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './Navbar.module.css';

const navbar = (props) => {
    const logOutLink = props.isLoggedIn ? <NavLink to='/logout'>Logout</NavLink> : null;
    const logInLink = props.isLoggedIn ? null : <NavLink to='/login'>Login</NavLink>
    return (
        <nav>
            <NavLink to='/register'>Register</NavLink>
            {logInLink}
            {logOutLink}
        </nav>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn
    }
}

export default connect(mapStateToProps)(navbar);
import React from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './Navbar.module.css';

const navbar = (props) => {
    const logOutLink = props.isLoggedIn ? <NavLink className='nav-link' to='/logout'>Logout</NavLink> : null;
    const logInLink = props.isLoggedIn ? null : <NavLink className='nav-link' to='/login'>Login</NavLink>
    return (
        <nav class="navbar navbar-expand-lg navbar-dark">
            <NavLink style={{fontSize: '24px', fontWeight: 'bold', color: '#f44292'}} className='navbar-brand' to='/'>URL shortener</NavLink>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class={['navbar-toggler-icon', classes.White].join(' ')}></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul className='navbar-nav'>
                    <li class='nav-item'>
                        <NavLink className='nav-link' to='/register'>Register</NavLink>
                    </li>

                    <li class='nav-item'>
                        {logInLink}
                    </li>

                    <li class='nav-item'>
                        {logOutLink}
                    </li>
                </ul>
            </div>
        </nav>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn
    }
}

export default connect(mapStateToProps)(navbar);
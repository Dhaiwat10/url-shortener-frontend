import React, { Component } from 'react';
import Input from '../../components/Input/Input';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Login.module.css';

class Login extends Component {
    state = {
        username: '',
        password: '',
        authStatus: null,
        loading: true
    }

    componentWillUnmount() {
        this.setState({loading: true})
    }

    componentDidMount() {
        this.setState({loading: false});
    }

    onUsernameChangeHandler = (e) => {
        this.setState({username: e.target.value})
    }

    onPasswordChangeHandler = (e) => {
        this.setState({password: e.target.value})
    }

    onFormSubmitHandler = (e) => {
        e.preventDefault();
        this.setState({loading: true});
        const reqUser = {username: this.state.username, password: this.state.password};

        axios.post('https://stark-fjord-67228.herokuapp.com/users/auth', reqUser)
            .then(res => {
                console.log(res);
                if(res.data.auth) {
                    this.props.onLogin(res.data.username);
                    this.setState({authStatus: true, loading: false});
                } else {
                    this.setState({authStatus: false, loading: false})
                }
            })
            .catch(err => {
                this.setState({authStatus: false, loading: false})
        });
    }


    render() {
        //CSS classes
        const inputCssClasses = [classes.Input, 'form-control'].join(' ');
        const buttonClasses = ['btn', classes.Button].join(' ');

        let authMessage = null;

        if(this.state.authStatus) {
            authMessage = (
                <p>Auth successful!</p>
            )
        } else if(this.state.authStatus === false) {
            authMessage = (
                <p>Auth failed. Please try again.</p>
            )
        } else if(this.state.authStatus === null) {
            authMessage = null;
        }

        const redirect = this.props.isLoggedIn ? <Redirect to='/home' /> : null;

        const spinner = <Spinner />;

        const content = this.state.loading ? spinner : (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.onFormSubmitHandler}>
                    <div className="form-group">
                        <label className={classes.Pink} for="usernameInput">Username</label>
                        <input className={inputCssClasses} id='usernameInput' placeholder='Username' type='text' onChange={this.onUsernameChangeHandler}/>
                    </div>
                    
                    <div className="form-group">
                        <label className={classes.Pink} for='passwordInput'>Password</label>
                        <input className={inputCssClasses} id='passwordInput' placeholder='Password' type='password' onChange={this.onPasswordChangeHandler}/>
                    </div>
                    <button className={buttonClasses} type='submit'>Login</button>
                </form>
                {authMessage}
                <Link to='/'>New user?</Link>
            </div>
        );
        
        return (
            <React.Fragment>
                {redirect}
                {content}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
        isLoggedIn: state.isLoggedIn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (username) => dispatch({type: actionTypes.LOGIN, username: username})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
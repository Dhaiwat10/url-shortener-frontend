import React, { Component } from 'react';
import Input from '../../components/Input/Input';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';

class Login extends Component {
    state = {
        username: '',
        password: '',
        authStatus: null
    }

    onUsernameChangeHandler = (e) => {
        this.setState({username: e.target.value})
    }

    onPasswordChangeHandler = (e) => {
        this.setState({password: e.target.value})
    }

    onFormSubmitHandler = (e) => {
        e.preventDefault();
        console.log('Executed');
        const reqUser = {username: this.state.username, password: this.state.password};

        axios.post('https://stark-fjord-67228.herokuapp.com/users/auth', reqUser)
            .then(res => {
                console.log(res);
                if(res.data.auth) {
                    this.props.onLogin(res.data.username);
                    this.setState({authStatus: true});
                } else {
                    this.setState({authStatus: false})
                }
            })
            .catch(err => {
                this.setState({authStatus: false})
        });
    }


    render() {
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
        
        return (
            <React.Fragment>
                {redirect}
                <h1>Login</h1>
                <form onSubmit={this.onFormSubmitHandler}>
                    <Input placeholder='Username' type='text' changed={this.onUsernameChangeHandler}/>
                    <Input placeholder='Password' type='password' changed={this.onPasswordChangeHandler}/>
                    <button type='submit'>Login</button>
                </form>
                {authMessage}
                <Link to='/'>New user?</Link>
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
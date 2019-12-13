import React, { Component } from 'react';
import Input from '../../components/Input/Input';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Register.module.css';

class Register extends Component {
    state = {
        username: '',
        password: '',
        regSuccess: null,
        isDuplicate: null,
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
        const newUser = {username: this.state.username, password: this.state.password};

        axios.post('https://stark-fjord-67228.herokuapp.com/users/new', newUser)
            .then(res => {
                this.setState({loading: false, regSuccess: res.data.success});
            })
            .catch((err) => {
                console.log(err.response);
                this.setState({regSuccess: false});
                if(err.response.data.errCode === 11000)
                    this.setState({isDuplicate: true, loading: false})
            });
    }

    render() {
        //CSS classes
        const inputCssClasses = [classes.Input, 'form-control'].join(' ');
        const buttonClasses = ['btn', classes.Button].join(' ');

        const spinner = <Spinner />;

        const content = this.state.loading ? spinner : (
            <div>
                <h1>Register</h1>
                <form onSubmit={this.onFormSubmitHandler}>
                    <div className="form-group">
                        <label className={classes.Pink} for="usernameInput">Username</label>
                        <input className={inputCssClasses} id='usernameInput' placeholder='Username' type='text' onChange={this.onUsernameChangeHandler}/>
                    </div>
                    
                    <div className="form-group">
                        <label className={classes.Pink} for='passwordInput'>Password</label>
                        <input className={inputCssClasses} id='passwordInput' placeholder='Password' type='password' onChange={this.onPasswordChangeHandler}/>
                    </div>
                    <button type='submit' className={buttonClasses}>Register</button>
                </form>
                <Link to='/login'>Already have an account?</Link>
            </div>
        );

        let redirect = null;
        if(this.state.regSuccess === true) {
            redirect = (<Redirect to='/login' />)
        } else if(this.state.regSuccess === false && this.state.isDuplicate) {
            redirect = (<p>This username is already taken. Please choose another one.</p>)
        } 
        else if(this.state.regSuccess === false) {
            redirect = (<p>Registration failed. Please try again.</p>);
        } else
            redirect = null;

        return (
            <div className={classes.PageBody}>
                {/* <Helmet>
                    <style>{'body { background-color: #1b2b66; }'}</style>
                </Helmet> */}
                {redirect}
                {content}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.isLoggedIn
    }
}

export default connect(mapStateToProps)(Register);
import React, { Component } from 'react';
import Input from '../../components/Input/Input';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';

class Register extends Component {
    state = {
        username: '',
        password: '',
        regSuccess: null,
        isDuplicate: null
    }

    onUsernameChangeHandler = (e) => {
        this.setState({username: e.target.value})
    }

    onPasswordChangeHandler = (e) => {
        this.setState({password: e.target.value})
    }

    onFormSubmitHandler = (e) => {
        e.preventDefault();
        const newUser = {username: this.state.username, password: this.state.password};

        axios.post('https://stark-fjord-67228.herokuapp.com/users/new', newUser)
            .then(res => {
                this.setState({regSuccess: res.data.success});
            })
            .catch((err) => {
                console.log(err.response);
                this.setState({regSuccess: false});
                if(err.response.data.errCode === 11000)
                    this.setState({isDuplicate: true})
            });
    }

    render() {
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
            <React.Fragment>
                {redirect}
                <h1>Register</h1>
                <form onSubmit={this.onFormSubmitHandler}>
                    <Input placeholder='Username' type='text' changed={this.onUsernameChangeHandler}/>
                    <Input placeholder='Password' type='password' changed={this.onPasswordChangeHandler}/>
                    <button type='submit'>Register</button>
                </form>
                <Link to='/login'>Already have an account?</Link>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.isLoggedIn
    }
}

export default connect(mapStateToProps)(Register);
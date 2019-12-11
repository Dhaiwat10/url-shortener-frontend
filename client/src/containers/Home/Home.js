import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Input from '../../components/Input/Input';
import { Redirect, Link } from 'react-router-dom';
import classes from './Home.module.css';

class Home extends Component {
    state = {
        inputUrl: '',
        generatedCode: ''
    }

    inputChangedHandler = (event) => {
        this.setState({inputUrl: event.target.value});
        // axios.post('/', {baseUrl: this.state.inputUrl})
        //     .then(res => console.log(res))
        //     .catch(err => console.log(err));
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
        console.log('DOES THIS EVEN WORK');
        const payload = {baseUrl: this.state.inputUrl, username: this.props.currentUser};
        axios.post('https://stark-fjord-67228.herokuapp.com/urls/new', payload)
            .then(res => {
                console.log(res);
                this.setState({generatedCode: res.data});
            })
            .catch(err => console.log(err));
    }

    render() {
        let generatedCodeDisplay = null;

        if(this.state.generatedCode) {
            generatedCodeDisplay = (
                <div>
                    <p>Generated code: <a target="_blank" href={'https://stark-fjord-67228.herokuapp.com/'+this.state.generatedCode}>/{this.state.generatedCode}</a></p>
                </div>
            )
        }

        const authRedirect = !this.props.isLoggedIn ? <Redirect to='/' /> : null;

        return (
            <div>
                {authRedirect}
                <h1 className={classes.Title}>URL shortener</h1>
                <h3>Current user: {this.props.currentUser}</h3>
                <form onSubmit={this.formSubmitHandler}>
                    <Input 
                        changed={this.inputChangedHandler}
                        inputUrl={this.state.inputUrl}
                        placeholeder="Enter a new URL"
                        type="text"/>
                    <button type="submit">Submit</button>
                </form>
                {generatedCodeDisplay}
                <Link to='/history'>Your history</Link>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
        isLoggedIn: state.isLoggedIn
    }
}

const mapDispatchToProps = dispatch => {

}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
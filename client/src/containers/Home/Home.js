import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import classes from './Home.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import SmallSpinner from '../../components/UI/SmallSpinner/SmallSpinner';

class Home extends Component {
    state = {
        inputUrl: null,
        generatedCode: null,
        pageLoading: true,
        codeLoading: false
    }

    componentDidMount() {
        this.setState({pageLoading: false});
    }

    componentWillUnmount() {
        this.setState({pageLoading: true});
    }

    inputChangedHandler = (event) => {
        this.setState({inputUrl: event.target.value});
        // axios.post('/', {baseUrl: this.state.inputUrl})
        //     .then(res => console.log(res))
        //     .catch(err => console.log(err));
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
        this.setState({codeLoading: true});
        const payload = {baseUrl: this.state.inputUrl, username: this.props.currentUser};
        axios.post('https://stark-fjord-67228.herokuapp.com/urls/new', payload)
            .then(res => {
                console.log(res);
                this.setState({generatedCode: res.data, codeLoading: false});
            })
            .catch(err => {
                console.log(err);
                this.state({generatedCode: 'Error. Please try again.', codeLoading: false});
            });
    }

    render() {
        //CSS classes
        const inputCssClasses = [classes.Input, 'form-control'].join(' ');
        const buttonClasses = ['btn', classes.Button].join(' ');

        let generatedCodeDisplay = null;

        if(!this.state.generatedCode && this.state.codeLoading) {
            generatedCodeDisplay = <SmallSpinner />
        } else if(!this.state.generatedCode) {
            generatedCodeDisplay = null
        } else if(!this.state.codeLoading) {
            generatedCodeDisplay = (
                <div>
                    <p>Generated code:  <a target="_blank" href={'https://stark-fjord-67228.herokuapp.com/'+this.state.generatedCode}>/{this.state.generatedCode}</a></p>
                </div>
            )
        } else {
            generatedCodeDisplay = <SmallSpinner />;
        }

        const historyDisplay = this.props.isLoggedIn ? <Link to='/history'>Your history</Link> : null;

        let pageContent = this.state.pageLoading ? <Spinner /> : (
            <div>
                <h4 className={classes.Title}>Enter the URL you want to shorten:</h4>
                {/* <h3 className={classes.Pink}>Current user: <span style={{color: 'white'}}>{this.props.currentUser}</span></h3> */}
                <form onSubmit={this.formSubmitHandler}>
                    <input
                        id='urlInput'
                        className={inputCssClasses} 
                        onChange={this.inputChangedHandler}
                        inputUrl={this.state.inputUrl}
                        placeholeder="Enter a new URL"
                        type="text"
                        required/>
                    <button className={buttonClasses} type="submit">Submit</button>
                </form>
                {generatedCodeDisplay}
                {historyDisplay}
            </div>
        );

        return (
            <div>
                {pageContent}
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
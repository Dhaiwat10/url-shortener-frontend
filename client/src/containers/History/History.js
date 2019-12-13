import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './History.module.css';

class History extends Component {
    state = {
        loadedData: [],
        pageLoading: true
    }

    componentDidMount() {
        axios.get('https://stark-fjord-67228.herokuapp.com/urls/all/' + this.props.currentUser)
            .then(res => {
                console.log(res.data);
                this.setState({loadedData: [...res.data], pageLoading: false});
            })
            .catch(err => console.log(err));
    }

    fetchHistory() {
        return this.state.loadedData.map(currentRecord => {
            return (
                <tr>
                    <td>{currentRecord.baseUrl}</td>
                    <td>
                        <a 
                            href={'http://stark-fjord-67228.herokuapp.com/'+currentRecord.shortenedCode}
                            target='_blank'>
                                {currentRecord.shortenedCode}
                        </a>
                    </td>
                </tr>
            );
          })
    }

    render() {
        let authCheck = !this.props.isLoggedIn ? <Redirect to='/login' /> : null;

        let loader = this.state.pageLoading ? <Spinner /> : (
            <div>
                <h1>{this.props.currentUser}'s history</h1>
                <table className='table table-dark'>
                    <thead>
                        <tr>
                            <th>Original URL</th>
                            <th>Shortened link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.fetchHistory()}
                    </tbody>
                </table>
            </div>
        );

        return (
            <React.Fragment>
                {authCheck}
                {loader}
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

export default connect(mapStateToProps)(History);
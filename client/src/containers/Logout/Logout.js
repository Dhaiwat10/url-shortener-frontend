import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions';

class Logout extends Component {
    componentDidMount() {
        this.props.onLogout();
    }

    render() {
        return (
            <div>
                <Redirect to='/'></Redirect>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch({type: actionTypes.LOGOUT})
    };
}

export default connect(null, mapDispatchToProps)(Logout);
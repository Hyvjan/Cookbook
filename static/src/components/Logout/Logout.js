import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {signOut} from '../../store/Actions';
import {connect} from 'react-redux';

class Logout extends Component {

    componentDidMount() {
        this.props.logout();
    }

    render () {
        return <Redirect to="/"/>
    }
}; 

const mapDispatchToProps = dispatch => {
    return {
        logout:() => dispatch(signOut()),
    }
}

export default connect(null, mapDispatchToProps)(Logout);
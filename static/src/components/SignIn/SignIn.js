import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/Actions';
import {getToken} from '../../store/Actions';

class SignIn extends Component  {

    state = {
        'username': "",
        'password':""
    }

        usernameHandler = (evt) => {
            this.setState({'username': evt.target.value});
        }

        passwordHandler = (evt) => {
            this.setState({'password': evt.target.value});
        }

        submitHandler = () => {
            console.log("sign in clicked");
            this.props.getToken(this.state.username, this.state.password);
        }

        render() {

        return (

            <div>
                <input type="text" value={this.state.username} 
                    onChange={evt=>this.usernameHandler(evt)}/>
                <input type="password" value={this.state.password}
                    onChange={evt => this.passwordHandler(evt)}/>
                <button onClick={this.submitHandler}>Sign In</button>
            </div>
        ) 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getToken: (username, password) => dispatch(getToken(username, password)),
    }
  }

export default connect(null, mapDispatchToProps)(SignIn);
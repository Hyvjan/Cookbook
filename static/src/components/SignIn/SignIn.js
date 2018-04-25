import React, { Component } from 'react';

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

export default SignIn;
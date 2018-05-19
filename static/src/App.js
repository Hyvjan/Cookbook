import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import {BrowserRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {checkTokenValidy} from './store/Actions';

class App extends Component {

  componentDidMount() {
    this.props.tryAutoSignup();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Layout />
        </div>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    tryAutoSignup:() => dispatch(checkTokenValidy()),
  }
}

export default connect(null, mapDispatchToProps)(App);

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Routes from 'Routes';
import { getUser } from 'actions/user';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    return (
      <div className="App">
        <Routes />
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

export default withRouter(
  connect(
    mapStateToProps,
    { getUser }
  )(App)
);

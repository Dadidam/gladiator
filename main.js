import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import App from './App_antd';
import AppState from './AppState';

const appState = new AppState();

ReactDOM.render(<App appState={appState} />, document.getElementById('app'));

import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import App from './App_antd';
import AppState from './AppState';
import PlayerStore from './stores/PlayerStore';

const appState = new AppState();
const playerStore = new PlayerStore();

ReactDOM.render(
	<App appState={appState} playerStore={playerStore} />
	, document.getElementById('app')
);

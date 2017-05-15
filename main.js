import React from 'react';
import ReactDOM from 'react-dom';

import App from './App_antd';
import UiStore from './stores/UiStore';
import PlayerStore from './stores/PlayerStore';

const uiStore = new UiStore();
const playerStore = new PlayerStore();

ReactDOM.render(
	<App playerStore={playerStore} uiStore={uiStore} />
	, document.getElementById('app')
);

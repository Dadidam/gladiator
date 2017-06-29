import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Map } from 'immutable';
// import reducer from 'reducers/index';

import App from './App';
import UiStore from './stores/UiStore';
import PlayerStore from './stores/PlayerStore';

import * as storage from 'services/localStorage';
import tabs from 'components/mainMenuTabs';

// const uiStore = new UiStore();
const playerStore = new PlayerStore();

const reducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_TAB':
            return state.update('currentTab', () => {
                console.log('action - ', action);
                switch (action.tab) {
                    case 1:
                        return tabs.quests;
                    case 2:
                        return tabs.arena;
                    case 3:
                        return tabs.shop;
                    case 4:
                        return tabs.changeHero;
                    default:
                        return tabs.quests;
                }
            });
        case 'TAB_QUESTS':
            return state.update('currentTab', tab => tabs.quests);
        case 'TAB_ARENA':
            return state.update('currentTab', tab => tabs.arena);
        default:
            return state;
    }
};

const player = storage.get('player');

const initialState = Map({
    player,
    currentTab: player && player.activeHeroId ? 1 : 4,
});

const reduxStore = createStore(reducer, initialState);

ReactDOM.render(
    <Provider store={reduxStore}>
        <App playerStore={playerStore} />
    </Provider>,
    document.getElementById('app')
);

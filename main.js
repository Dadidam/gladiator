import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Map } from 'immutable';

import App from './App';
import PlayerStore from './stores/PlayerStore';

import * as storage from 'services/localStorage';
import tabs from 'components/mainMenuTabs';

const playerStore = new PlayerStore();

const reducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_TAB':
            return state.update('currentTab', () => {
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

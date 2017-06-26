import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Map } from 'immutable';
import reducer from 'reducers/index';

import App from './App';
import UiStore from './stores/UiStore';
import PlayerStore from './stores/PlayerStore';

const uiStore = new UiStore();
const playerStore = new PlayerStore();

// const reducer = (state, action) => {
//     switch (action.type) {
//         case 'ADD_LIKE':
//             return state.update('likes', likes => likes + 1);
//         case 'ADD_DISLIKE':
//             return state.update('dislikes', dislikes => dislikes + 1);
//         default:
//             return state;
//     }
// };

const initialState = Map({
    likes: 1,
    dislikes: 2
});

const reduxStore = createStore(reducer, initialState);

ReactDOM.render(
    <Provider store={reduxStore}>
        <App playerStore={playerStore} uiStore={uiStore} />
    </Provider>,
    document.getElementById('app')
);

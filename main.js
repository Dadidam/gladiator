import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import App from './App';

//TODO: remove
import PlayerStore from './stores/PlayerStore';

//TODO: remove
const playerStore = new PlayerStore();
const store = createStore(
    reducer, /* preloadedState, */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <Provider store={store}>
        <App playerStore={playerStore} />
    </Provider>,
    document.getElementById('app')
);

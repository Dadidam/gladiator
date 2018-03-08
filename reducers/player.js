import * as storage from 'services/localStorage';

const initData = storage.get('player');

const player = (state = initData, action) => {
    switch (action.type) {
        case 'UPDATE_PLAYER':
            storage.set('player', action.player);
            return action.player;
        default:
            return state;
    }
};

export default player

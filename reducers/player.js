import * as storage from 'services/localStorage';

const initData = storage.get('player');

const player = (state = initData, action) => {
  switch (action.type) {
    case 'UPDATE_PLAYER':
      storage.set('player', action.player);
      return action.player;
    case 'START_BATTLE':
    case 'FINISH_BATTLE':
      const newPlayer = { ...state, battle: action.battle };
      storage.set('player', newPlayer);
      return newPlayer;
    default:
      return state;
  }
};

export default player;

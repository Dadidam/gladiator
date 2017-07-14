import { combineReducers } from 'redux';
import tab from './tab';
import hero from './hero';
import player from './player';

export default combineReducers({
    tab,
    hero,
    player
})

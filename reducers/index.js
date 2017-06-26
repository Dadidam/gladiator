import { combineReducers } from 'redux-immutable';
import likes from './likes';
import dislikes from './dislikes';

export default combineReducers({
    likes,
    dislikes
})

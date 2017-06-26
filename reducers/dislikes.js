export default function dislikes(state = 0, action) {
    switch (action.type) {
        case 'ADD_DISLIKE':
            return state.update('dislikes', dislikes => dislikes + 1);
        default:
            return state;
    }
}

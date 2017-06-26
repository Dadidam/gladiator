export default function likes(state = 0, action) {
    switch (action.type) {
        case 'ADD_LIKE':
            return state.update('likes', likes => likes + 1);
        default:
            return state;
    }
}

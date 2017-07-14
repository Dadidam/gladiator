const activeTab = (state = 1, action) => {
    switch (action.type) {
        case 'CHANGE_ACTIVE_TAB':
            return action.tab;
        default:
            return state;
    }
};

export default activeTab

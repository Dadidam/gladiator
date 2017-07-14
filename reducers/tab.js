import tabs from 'components/mainMenuTabs';

const activeTab = (state = tabs.quests, action) => {
    debugger;
    switch (action.type) {
        case 'CHANGE_ACTIVE_TAB':
            return action.tab;
        default:
            return state;
    }
};

export default activeTab

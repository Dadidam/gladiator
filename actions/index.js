export const setActiveTab = (tab) => ({
    type: 'CHANGE_ACTIVE_TAB',
    tab
});

export const updatePlayer = (player) => ({
    type: 'UPDATE_PLAYER',
    player
});

export const changeHero = (heroId) => ({
    type: 'CHANGE_HERO',
    heroId
});

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

export const updateHero = (hero) => ({
    type: 'UPDATE_HERO',
    hero
});

export const addExp = (exp, hero) => ({
    type: 'ADD_EXP',
    exp,
    hero
});

export const addCoins = (coins, hero) => ({
    type: 'ADD_COINS',
    coins,
    hero
});

export const addArenaPoints = (rank, hero) => ({
    type: 'ADD_ARENA_RANK_POINTS',
    rank,
    hero
});

export const addHp = (hp, hero) => ({
    type: 'ADD_HP',
    hp,
    hero
});

export const setHp = (hp, hero) => ({
    type: 'SET_HP',
    hp,
    hero
});

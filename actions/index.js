export const setActiveTab = tab => ({
  type: 'CHANGE_ACTIVE_TAB',
  tab
});

export const updatePlayer = player => ({
  type: 'UPDATE_PLAYER',
  player
});

export const changeHero = heroId => ({
  type: 'CHANGE_HERO',
  heroId
});

export const updateHero = hero => ({
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

export const addItem = (item, hero) => ({
  type: 'ADD_ITEM',
  item,
  hero
});

export const useItem = (item, hero) => ({
  type: 'USE_ITEM',
  item,
  hero
});

export const deleteItem = (item, hero) => ({
  type: 'DELETE_ITEM',
  item,
  hero
});

export const takeOffItem = (item, hero) => ({
  type: 'TAKE_OFF_ITEM',
  item,
  hero
});

export const startBattle = () => ({
  type: 'START_BATTLE',
  battle: true
});

export const finishBattle = () => ({
  type: 'FINISH_BATTLE',
  battle: false
});

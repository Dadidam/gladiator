import * as storage from 'services/localStorage';

const player = storage.get('player');

const getHeroById = (id) => {
    if (!id) {
        return null;
    }

    const result = player.heroes.filter(hero => {
        return hero.id === id;
    });

    return result[0];
};

const hero = (state = getHeroById(player.activeHeroId), action) => {
    switch (action.type) {
        case 'CHANGE_HERO':
            if (!action.heroId) {
                return null;
            }
            return getHeroById(action.heroId);
        default:
            return state;
    }
};

export default hero

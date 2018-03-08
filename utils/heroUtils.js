import * as storage from 'services/localStorage';

export const getHeroById = (id) => {
    const player = storage.get('player');

    if (!id || !player) {
        return null;
    }

    const result = player.heroes.filter(hero => {
        return hero.id === id;
    });

    return result[0];
};

export const getHeroLevel = (hero) => {
    const exp = 50;
    const lvl = Math.floor(hero.exp / exp);

    return lvl > 0 ? (lvl + 1) : 1;
};

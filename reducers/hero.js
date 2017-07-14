import * as storage from 'services/localStorage';
import { getHeroById, getHeroLevel } from '../utils/heroUtils';

const player = storage.get('player');

const hero = (state = getHeroById(player.activeHeroId), action) => {
    const hero = action.hero || null;
    switch (action.type) {
        case 'CHANGE_HERO':
            if (!action.heroId) {
                return null;
            }
            return getHeroById(action.heroId);
        case 'UPDATE_HERO':
            return Object.assign({}, action.hero);
        case 'ADD_EXP':
            hero.exp += action.exp;

            const heroLevel = getHeroLevel(hero);

            if (heroLevel > hero.level) {
                hero.level = heroLevel;
            }

            return Object.assign({}, hero);
        case 'ADD_COINS':
            action.hero.coins += action.coins;
            return Object.assign({}, action.hero);
        case 'ADD_ARENA_RANK_POINTS':
            hero.rank += action.rank;

            if (hero.rank < 0) {
                hero.rank = 0;
            }
            return Object.assign({}, hero);
        case 'ADD_HP':
            hero.health += action.hp;

            if (hero.health <= 0) {
                hero.health = 0;
            }
            return Object.assign({}, hero);
        case 'SET_HP':
            hero.health = action.hp;

            if (hero.health <= 0) {
                hero.health = 0;
            }
            return Object.assign({}, hero);
        default:
            return state;
    }
};

export default hero

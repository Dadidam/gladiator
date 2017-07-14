import * as storage from 'services/localStorage';
import { getHeroById, getHeroLevel } from '../utils/heroUtils';

const player = storage.get('player');

const hero = (state = getHeroById(player.activeHeroId), action) => {
    switch (action.type) {
        case 'CHANGE_HERO':
            if (!action.heroId) {
                return null;
            }
            return getHeroById(action.heroId);
        case 'UPDATE_HERO':
            return Object.assign({}, action.hero);
        case 'ADD_EXP':
            const hero = action.hero;
            hero.exp += action.exp;

            const heroLevel = getHeroLevel(hero);

            if (heroLevel > hero.level) {
                hero.level = heroLevel;
            }

            return Object.assign({}, hero);
        default:
            return state;
    }
};

export default hero

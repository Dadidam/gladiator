import * as storage from 'services/localStorage';
import { getHeroById, getHeroLevel } from '../utils/heroUtils';

const player = storage.get('player');

const hero = (state = getHeroById(player.activeHeroId), action) => {
    const hero = action.hero || null;
    const item = action.item || null;

    switch (action.type) {
        case 'CHANGE_HERO':
            if (!action.heroId) {
                return null;
            }
            return getHeroById(action.heroId);
        case 'UPDATE_HERO':
            return Object.assign({}, hero);
        case 'ADD_EXP':
            hero.exp += action.exp;

            const heroLevel = getHeroLevel(hero);

            if (heroLevel > hero.level) {
                hero.level = heroLevel;
            }

            return Object.assign({}, hero);
        case 'ADD_COINS':
            hero.coins += action.coins;
            return Object.assign({}, hero);
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
        case 'ADD_ITEM':
            let newItem = Object.assign({}, item); // clone item
            newItem.id = hero.inventory.length + 1; // set unique item ID
            hero.inventory.push(newItem); // add new item to inventory
            return Object.assign({}, hero);
        case 'USE_ITEM':
            switch (item.type) {
                case 'weapon':
                    hero.equipment.weapon = item.id;
                    hero.minDamage = item.params.minDamage;
                    hero.maxDamage = item.params.maxDamage;
                    break;
                case 'armor':
                    hero.equipment.armor = item.id;
                    hero.maxHealth = item.params.maxHealth;

                    if (hero.health > item.params.maxHealth) {
                        hero.health = item.params.maxHealth;
                    }
                    break;
                default:
                    throw new Error('Not supported type of item');
            }
            return Object.assign({}, hero);
        case 'DELETE_ITEM':
            // check and remove from equipped items
            if (item.id == hero.equipment.weapon) {
                hero.equipment.weapon = null;
            }

            if (item.id == hero.equipment.armor) {
                hero.equipment.armor = null;
            }

            let index;

            // find current index (itemId) in hero inventory
            hero.inventory.forEach(function(invItem, i) {
                if (invItem.id == item.id) {
                    index = i;
                }
            });

            // delete current item from hero inventory
            hero.inventory.splice(index, 1);

            // update hero data
            return Object.assign({}, hero);
        default:
            return state;
    }
};

export default hero

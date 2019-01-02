import _ from 'lodash';
import * as storage from 'services/localStorage';
import { getHeroById, getHeroLevel } from '../utils/heroUtils';

const player = storage.get('player') || {};

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
      const maxInvId = _.maxBy(hero.inventory, 'id').id; // find item with higher ID
      newItem.id = maxInvId + 1; // set unique item ID
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
          throw new Error('Not supported item type');
      }
      return Object.assign({}, hero);
    case 'DELETE_ITEM':
      // 1) check and remove from equipped items
      if (item.id == hero.equipment.weapon) {
        hero.equipment.weapon = null;
      }

      if (item.id == hero.equipment.armor) {
        hero.equipment.armor = null;
      }

      // 2) delete current item from hero inventory
      hero.inventory = _.filter(
        hero.inventory,
        invItem => item.id !== invItem.id
      );

      // 3) update hero data
      return Object.assign({}, hero);
    case 'TAKE_OFF_ITEM':
      switch (item.type) {
        case 'weapon':
          hero.equipment.weapon = null;
          hero.minDamage -= item.params.minDamage;
          hero.maxDamage -= item.params.maxDamage;

          if (hero.minDamage < 1) {
            hero.minDamage = 1;
          }

          if (hero.maxDamage < 1) {
            hero.maxDamage = 1;
          }
          break;
        case 'armor':
          hero.equipment.armor = null;
          hero.maxHealth -= item.params.maxHealth;

          if (hero.maxHealth < 5) {
            hero.maxHealth = 5;
          }

          if (hero.health < 0) {
            hero.health = 0;
          }
          break;
        default:
          throw new Error('Not supported item type');
      }

      // update hero data
      return Object.assign({}, hero);
    default:
      return state;
  }
};

export default hero;

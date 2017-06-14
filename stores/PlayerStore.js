import {observable} from 'mobx';
import * as storage from 'services/localStorage';


class PlayerStore {
    @observable player = {};

    constructor() {
        this.player = storage.get('player');
    }

    updatePlayer = (player) => {
        storage.set('player', player);
    };

    getHeroById = (id) => {
        const result = this.player.heroes.filter(hero => {
            return hero.id === id;
        });

        return result[0];
    };

    updateHero = (hero) => {
        let heroes = [];

        this.player.heroes.forEach((char, i) => {
            const character = char.id === hero.id ? hero : char;
            heroes.push(character);
        });

        this.player.heroes = heroes;

        this.updatePlayer(this.player);
    };

    getHeroLevel = (hero) => {
        const exp = 50;
        const lvl = Math.floor(hero.exp / exp);

        return lvl > 0 ? (lvl + 1) : 1;
    };

    changeHero = () => {
        this.player.activeHeroId = null;

        this.updatePlayer(this.player);
    };

    getActiveHero = () => {
        return this.player ? this.getHeroById(this.player.activeHeroId) : undefined;
    };

    addExp = (exp, hero) => {
        hero.exp += exp;

        const heroLevel = this.getHeroLevel(hero);

        if (heroLevel > hero.level) {
            hero.level = heroLevel;
        }

        this.updateHero(hero);
    };

    addCoins = (coins, hero) => {
        hero.coins += coins;

        this.updateHero(hero);
    };

    addArenaRank = (rank, hero) => {
        hero.rank += rank;

        if (hero.rank < 0) {
            hero.rank = 0;
        }

        this.updateHero(hero);
    };

    addHp = (hp, hero) => {
        hero.health += hp;

        if (hero.health <= 0) {
            hero.health = 0;
        }

        this.updateHero(hero);
    };

    setHp = (hp, hero) => {
        hero.health = hp;

        if (hero.health <= 0) {
            hero.health = 0;
        }

        this.updateHero(hero);
    };

    addItem = (item, hero) => {
        let newItem = Object.assign({}, item); // clone item
        newItem.id = hero.inventory.length + 1; // set unique item ID

        hero.inventory.push(newItem); // add new item to inventory

        this.updateHero(hero); // update changes
    };

    useItem = (item, hero) => {
        switch (item.type) {
            case 'weapon':
                hero.equipment.weapon = item.id;
                hero.minDamage = item.params.minDamage;
                hero.maxDamage = item.params.maxDamage;

                this.updateHero(hero);
                break;
            case 'armor':
                hero.equipment.armor = item.id;
                hero.maxHealth = item.params.maxHealth;

                if (hero.health > item.params.maxHealth) {
                    hero.health = item.params.maxHealth;
                }

                this.updateHero(hero);
                break;
            default:
                throw new Error('Not supported type of item');
        }
    };

    deleteItem = (item, hero) => {
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
        this.updateHero(hero);
    };

    sellItem = (item, hero) => {
        // first, delete item from inventory
        this.deleteItem(item, hero);

        // second, add coins to hero
        hero.coins += item.price.sell;

        // and now, update hero once again
        this.updateHero(hero);
    };
}

export default PlayerStore;

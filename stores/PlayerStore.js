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
    }
}

export default PlayerStore;

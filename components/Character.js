export default class Character {
    constructor(name, health = 1, maxHealth = 1) {
        this.id = 0;
        this.exp = 0;
        this.name = name;
        this.level = 1;
        this.coins = 0;
        this.health = health; // current health value
        this.maxHealth = maxHealth; // max value with other modifiers
        this.minDamage = 1;
        this.maxDamage = 1;
        this.inventory = [];
        this.equipment = { // items used by character (doll)
            weapon: null,
            armor: null
        };
    }
}

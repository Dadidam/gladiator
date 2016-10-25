import React from 'react';

class Character extends React.Component {
    constructor() {
        super();

        this.id = 0;
        this.exp = 0;
        this.name = '';
        this.level = 1;
        this.coins = 0;
        this.health = 1; // current health value
        this.maxHealth = 1; // max value with other modifiers
        this.minDamage = 1;
        this.maxDamage = 1;
        this.inventory = [];
        this.equipment = { // items used by character (doll)
            weapon: null,
            armor: null
        };
    }
}

export default Character

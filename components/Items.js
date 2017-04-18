export default {

    // WEAPONS

    rustySword: {
        name: 'Rusty sword',
        type: 'weapon',
        params: {
            minDamage: 2,
            maxDamage: 3
        },
        price: {
            buy: 15,
            sell: 3
        },
        level: 1
    },
    sharpSword: {
        name: 'Sharp sword',
        type: 'weapon',
        params: {
            minDamage: 3,
            maxDamage: 5
        },
        price: {
            buy: 25,
            sell: 5
        },
        level: 2
    },
    woodenMace: {
        name: 'Wooden mace',
        type: 'weapon',
        params: {
            minDamage: 2,
            maxDamage: 8
        },
        price: {
            buy: 60,
            sell: 12
        },
        level: 3
    },
    rapier: {
        name: 'Rapier',
        type: 'weapon',
        params: {
            minDamage: 3,
            maxDamage: 10,
            dodge: 2
        },
        price: {
            buy: 150,
            sell: 30
        },
        level: 4
    },
    steelMace: {
        name: 'Steel mace',
        type: 'weapon',
        params: {
            minDamage: 5,
            maxDamage: 12
        },
        price: {
            buy: 280,
            sell: 55
        },
        level: 5
    },

    // ARMORS

    rustyArmor: {
        name: 'Rusty armor',
        type: 'armor',
        params: {
            maxHealth: 10
        },
        price: {
            buy: 40,
            sell: 8
        },
        level: 1
    },
    leatherArmor: {
        name: 'Leather armor',
        type: 'armor',
        params: {
            maxHealth: 15,
            dodge: 3
        },
        price: {
            buy: 150,
            sell: 30
        },
        level: 3
    },
    shinyArmor: {
        name: 'Shiny armor',
        type: 'armor',
        params: {
            maxHealth: 25
        },
        price: {
            buy: 320,
            sell: 65
        },
        level: 5
    },
};

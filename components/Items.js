export default {

    // WEAPONS

    toySword: {
        name: 'Toy sword',
        type: 'weapon',
        params: {
            minDamage: 1,
            maxDamage: 2
        },
        price: {
            buy: 1,
            sell: 1
        },
        canBuy: 0,
        level: 1,
        icon: 'toySword'
    },
    rustySword: {
        name: 'Stone hammer',
        type: 'weapon',
        params: {
            minDamage: 2,
            maxDamage: 3
        },
        price: {
            buy: 15,
            sell: 3
        },
        level: 1,
        icon: 'stoneHammer'
    },
    sharpSword: {
        name: 'Sharp knife',
        type: 'weapon',
        params: {
            minDamage: 3,
            maxDamage: 5
        },
        price: {
            buy: 25,
            sell: 5
        },
        level: 2,
        icon: 'cobblersKnife'
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
        level: 3,
        icon: 'woodenMace'
    },
    rapier: {
        name: 'Short Spear',
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
        level: 4,
        icon: 'shortSpear'
    },
    steelMace: {
        name: 'Stone mace',
        type: 'weapon',
        params: {
            minDamage: 5,
            maxDamage: 12
        },
        price: {
            buy: 280,
            sell: 55
        },
        level: 5,
        icon: 'stoneMace'
    },

    // ARMORS

    shirt: {
        name: 'Rural shirt',
        type: 'armor',
        params: {
            maxHealth: 2
        },
        price: {
            buy: 10,
            sell: 1
        },
        canBuy: 0,
        level: 1,
        icon: 'ruralShirt'
    },
    rustyArmor: {
        name: 'Stout Shirt',
        type: 'armor',
        params: {
            maxHealth: 5
        },
        price: {
            buy: 25,
            sell: 3
        },
        level: 1,
        icon: 'stoutShirt'
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
        level: 3,
        icon: 'leatherArmor'
    },
    shinyArmor: {
        name: 'Rusty Mail',
        type: 'armor',
        params: {
            maxHealth: 25
        },
        price: {
            buy: 320,
            sell: 65
        },
        level: 5,
        icon: 'rustyMail'
    },
};

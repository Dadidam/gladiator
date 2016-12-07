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
            buy: 10,
            sell: 1
        }
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
            sell: 3
        }
    },

    // ARMORS

    rustyArmor: {
        name: 'Rusty armor',
        type: 'armor',
        params: {
            maxHealth: 10
        },
        price: {
            buy: 15,
            sell: 2
        }
    },
    shinyArmor: {
        name: 'Shiny armor',
        type: 'armor',
        params: {
            maxHealth: 15
        },
        price: {
            buy: 30,
            sell: 3
        }
    }
};

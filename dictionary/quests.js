export const quests = [{
    key: '1',
    quest: {
        title: 'Kill a rat',
        cost: {
            health: 3
        },
        reward: {
            exp: 1,
            coins: 1
        },
        textReward: '+1 exp, +1 coin',
    },
    reward: '+1 exp, +1 coin',
    cost: '-3 HP',
    level: {
        min: 1,
        max: 5
    }
}, {
    key: '2',
    quest: {
        title: 'Tell funny stories',
        cost: {
            coins: 1
        },
        reward: {
            exp: 3
        },
        textReward: '+3 exp',
    },
    reward: '+3 exp',
    cost: '-1 coin',
    level: {
        min: 1,
        max: 3
    },
}, {
    key: '3',
    quest: {
        title: 'Punish a thief',
        cost: {
            health: 10
        },
        reward: {
            exp: 3,
            coins: 5
        },
        textReward: '+5 coins, +3 exp',
    },
    reward: '+5 coins, +3 exp',
    cost: '-10 HP',
    level: {
        min: 2,
        max: 5
    }
}, {
    key: '4',
    quest: {
        title: 'Help on a farm',
        cost: {
            health: 6
        },
        reward: {
            exp: 4,
            coins: 3
        },
        textReward: '+3 coins, +4 exp',
    },
    reward: '+3 coins, +4 exp',
    cost: '-6 HP',
    level: {
        min: 3,
        max: 6
    }
}, {
    key: '5',
    quest: {
        title: 'Attack wolves nest',
        cost: {
            health: 12
        },
        reward: {
            exp: 5,
            coins: 10
        },
        textReward: '+10 coins, +5 exp',
    },
    reward: '+10 coins, +5 exp',
    cost: '-12 HP',
    level: {
        min: 3,
        max: 7
    }
}];

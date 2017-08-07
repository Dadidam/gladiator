export default {
    tutorial: {
        requirements: {
            level: 1,
            parentQuest: null,
            arenaRank: 1,
            maxHealth: 5
        },
        title: 'Tutorial quest',
        icon: 'boat',
        description: 'Once upon a time...',
        questPrice: {
            coins: 1,
            hp: 5
        },
        reward: {
            exp: 5,
            coins: 10,
            items: [{
                name: 'toySword',
                probability: 50
            },{
                name: 'shinyArmor',
                probability: 30
            }],
            arenaRank: 1
        }
    }
}
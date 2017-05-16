import React from 'react';
import { Table, Button, Tooltip, message } from 'antd';

class Quests extends React.Component {
    constructor(props) {
        super(props);

        this.hero = props.playerStore.getActiveHero();
        this.updateHero = props.playerStore.updateHero;
    }

    render() {
        if (!this.hero) {
            return null;
        }

        const data = this.getTableData();
        const cols = this.getTableColumns();

        return <Table columns={cols} dataSource={data} />
    }

    collectCoins = (count) => {
        this.hero.coins += count;

        this.updateHero(this.hero);
    };

    getItem = (item) => {
        let newItem = Object.assign({}, item); // clone item
        newItem.id = this.hero.inventory.length + 1; // set unique item ID

        this.hero.inventory.push(newItem); // add new item to inventory

        this.updateHero(this.hero); // update changes
    };

    getExp = (value) => {
        this.hero.exp += value;

        const heroLevel = this.props.playerStore.getHeroLevel(this.hero);

        if (heroLevel > this.hero.level) {
            this.hero.level = heroLevel;
        }

        this.updateHero(this.hero);
    };

    addHp = (value) => {
        this.hero.health += value;

        if (this.hero.health <= 0) {
            this.hero.health = 0;
        }

        this.updateHero(this.hero);
    };

    checkQuest = params => {
        const costs = Object.keys(params.cost);

        let canExecute = true;

        for (let i = 0; i < costs.length; i++) {
            if (params.cost[costs[i]] > this.hero[costs[i]]) {
                canExecute = false;
                break;
            }
        }

        if (canExecute) {
            return <Button type="primary" onClick={this.executeQuest.bind(this, params)}>{params.title}</Button>;
        }

        return <Tooltip placement="top" title="Quest conditions not met">
            <Button disabled>{params.title}</Button>
        </Tooltip>;
    };

    executeQuest = params => {
        // Apply costs subtraction action
        const costs = Object.keys(params.cost);

        for (let i = 0; i < costs.length; i++) {
            this.doActionByType(costs[i], params.cost[costs[i]], false);
        }

        // Apply get rewards action
        const rewards = Object.keys(params.reward);

        for (let i = 0; i < rewards.length; i++) {
            this.doActionByType(rewards[i], params.reward[rewards[i]]);
        }

        message.success(`You\'ve finished the quest and received: ${params.textReward} `, 3);
    };

    doActionByType = (type, value, addition = true) => {
        if (!addition) {
            value = -value;
        }

        switch (type) {
            case 'exp':
                this.getExp(value);
                break;
            case 'health':
                this.addHp(value);
                break;
            case 'coins':
                this.collectCoins(value);
                break;
        }
    };

    getTableColumns = () => {
        return [{
            title: 'Quest title',
            dataIndex: 'quest',
            key: 'quest',
            render: params => this.checkQuest(params)
        }, {
            title: 'Reward',
            dataIndex: 'reward',
            key: 'reward',
        }, {
            title: 'Cost',
            dataIndex: 'cost',
            key: 'cost',
        }];
    };

    getTableData = () => {
        return [{
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
            cost: '-3 HP'
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
            cost: '-1 coin'
        }, {
            key: '3',
            quest: {
                title: 'Punish a thief',
                cost: {
                    health: 10
                },
                reward: {
                    exp: 5,
                    coins: 3
                },
                textReward: '+3 coins, +5 exp',
            },
            reward: '+3 coins, +5 exp',
            cost: '-10 HP'
        }];
    }
}

export default Quests;

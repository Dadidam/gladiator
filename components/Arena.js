import React from 'react';
import Fight from './Fight/Fight';
import { fighters } from 'dictionary/arena';
import Character from './Character';
import { Table, Button, Tooltip, message } from 'antd';


class Arena extends React.Component {
    constructor(props) {
        super(props);

        this.hero = props.hero;
        this.updateHero = props.playerStore.updateHero;

        this.state = {
            fight: false,
            opponent: null
        };
    }

    componentWillReceiveProps(nextProps) {
        this.hero = nextProps.hero;
    };

    render() {
        if (!this.hero) {
            return null;
        }

        if (this.state.fight) {
            return <Fight
                        leaveArena={this.leaveArena}
                        playerHero={this.hero}
                        playerOpponent={this.state.opponent}
            />
        }

        const cols = this.getTableColumns();
        const data = this.getFightersByHeroRank();

        return <Table columns={cols} dataSource={data} pagination={false} />
    }

    leaveArena = () => {
        this.setState({
            fight: false,
            opponent: null
        })
    };

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

    fight = params => {
        const {name, health, maxHealth, minDamage, maxDamage} = params;
        const opponent = new Character(name, health, maxHealth, minDamage, maxDamage);

        return <span>
            <Button type="primary" size="large" onClick={() => this.setState({fight: true, opponent})}>Fight!</Button>
        </span>;
    };

    executeQuest = params => {
        // Apply costs subtraction action
        const costs = Object.keys(params.cost);

        for (let i = 0; i < costs.length; i++) {
            this.doActionByType(costs[i], params.cost[costs[i]], false);
        }

        // Apply reward action
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
            title: 'Fighter name',
            dataIndex: 'character',
            key: 'character',
            render: params => this.fight(params)
        },{
            title: 'Reward',
            dataIndex: 'textReward',
            key: 'textReward',
        }];
    };

    getFightersByHeroRank = () => {
        const rank = this.hero.rank;

        return fighters.filter((fighter) => {
            return rank >= fighter.minRank;
        })
    };
}

export default Arena;

import React from 'react';
import Fight from './Fight';
import { fighters } from 'dictionary/arena';
import { Table, Button, Tooltip, message } from 'antd';


class Arena extends React.Component {
    constructor(props) {
        super(props);

        this.hero = props.hero;
        this.updateHero = props.playerStore.updateHero;

        this.state = {
            fight: false
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
            return <Fight leaveArena={this.leaveArena}/>
        }

        const cols = this.getTableColumns();
        const data = this.getFightersByHeroRank();

        return <Table columns={cols} dataSource={data} pagination={false} />
    }

    leaveArena = () => {
        this.setState({
            fight: false
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
        return <span>
            <Button type="primary" size="large" onClick={() => this.setState({fight: true})}>Fight!</Button>
        </span>;
        // const costs = Object.keys(params.cost);
        //
        // let canExecute = true;
        //
        // for (let i = 0; i < costs.length; i++) {
        //     if (params.cost[costs[i]] > this.hero[costs[i]]) {
        //         canExecute = false;
        //         break;
        //     }
        // }
        //
        // if (canExecute) {
        //     return <span>
        //         <Button type="primary" size="large" onClick={this.executeQuest.bind(this, params)}><Icon type={params.icon} size={20} />{' '}{params.title}</Button>
        //     </span>
        // }
        //
        // return <Tooltip placement="top" title="Quest conditions not met">
        //     <Button disabled size="large"><Icon type={params.icon} size={20} />{' '}{params.title}</Button>
        // </Tooltip>;
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
            dataIndex: 'name',
            key: 'name',
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

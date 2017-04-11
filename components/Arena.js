import React from 'react';
import InventoryItems from 'Items';
import { Table, Button } from 'antd';
import { getHeroLevel } from 'services/player';

export default class Arena extends React.Component {
    constructor(props) {
        super(props);
        this.hero = this.props.hero;
        this.updateHero = this.props.heroUpdateHandler;
    }

    render() {
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

        const heroLevel = getHeroLevel(this.hero);

        if (heroLevel > this.hero.level) {
            this.hero.level = heroLevel;
        }

        this.updateHero(this.hero);
    };

    getTableColumns = () => {
        return [{
            title: 'Quest title',
            dataIndex: 'title',
            key: 'title',
            render: text => <Button type="primary" onClick={this.collectCoins.bind(this, 1)}>{text}</Button>,
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
            title: 'Kill a rat',
            reward: '+1 coin',
            cost: '-2 HP'
        }, {
            key: '2',
            title: 'Tell funny stories',
            reward: '+3 exp',
            cost: '-1 coin'
        }, {
            key: '3',
            title: 'Punish a thief',
            reward: '+3 coins, +5 exp',
            cost: '-5 HP'
        }];
    }
}

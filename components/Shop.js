import React from 'react';
import ShopItems from 'Items';
import { Table, Button, Tooltip, message } from 'antd';
import { getHeroLevel } from 'services/player';

export default class Shop extends React.Component {
    constructor(props) {
        super(props);
        this.hero = this.props.hero;
        this.updateHero = this.props.heroUpdateHandler;
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

    checkPurchase = item => {
        let canPurchase = true;

        if (item.params.price.buy > this.hero.coins || item.params.level > this.hero.level) {
            canPurchase = false;
        }

        const itemTitle = `${item.params.name} (${item.params.level} level)`;

        if (canPurchase) {
            return <Button type="primary" onClick={this.makePurchase.bind(this, item)}>{itemTitle}</Button>;
        }

        return <Tooltip placement="top" title="You can't buy this item now (low level or not enough coins)">
            <Button disabled>{itemTitle}</Button>
        </Tooltip>;
    };

    makePurchase = item => {
        // Take coins for the purchase
        const price = -item.params.price.buy;
        this.collectCoins(price);

        // Add a new item to the hero inventory
        this.getItem(ShopItems[item.key]);

        message.success(`You\'ve bought item: ${item.params.name} `, 3);
    };

    getTableColumns = () => {
        return [{
            title: 'Item',
            dataIndex: 'item',
            key: 'item',
            render: item => this.checkPurchase(item)
        }, {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: val => `${val} coins`
        }];
    };

    getTableData = () => {
        let data = [];
        let tableKey = 1;

        for (const key of Object.keys(ShopItems)) {
            const item = ShopItems[key];

            data.push({
                key: tableKey,
                item: {
                    params: item,
                    key
                },
                price: item.price.buy
            });

            tableKey++;
        }

        return data;
    }
}

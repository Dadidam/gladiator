import React from 'react';
import ShopItems from 'Items';
import { itemTypes } from './Inventory/itemTypes';
import { Table, Button, Tooltip, message, Tabs, Icon } from 'antd';

const TabPane = Tabs.TabPane;


class Shop extends React.Component {
    constructor(props) {
        super(props);

        this.hero = props.hero;
        this.updateHero = props.playerStore.updateHero;
    }

    render() {
        if (!this.hero) {
            return null;
        }

        const cols = this.getTableColumns();

        return (
            <Tabs>
                {itemTypes.map(type => {
                    const data = this.getTableData(type.id);

                    return <TabPane tab={<span><Icon type={type.icon} />{type.id}</span>} key={type.id}>
                        <Table columns={cols} dataSource={data} locale={{emptyText: 'No items to purchase'}} />
                    </TabPane>
                })}
            </Tabs>
        );
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

        const buttonTitle = `Buy for ${item.params.price.buy} coins`;

        if (canPurchase) {
            return <Button type="primary" onClick={this.makePurchase.bind(this, item)}>{buttonTitle}</Button>;
        }

        return <Tooltip placement="top" title="You can't buy this item now (low level or not enough coins)">
            <Button disabled>{buttonTitle}</Button>
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

    getItemDescription = item => {
        const params = [];

        for (const key of Object.keys(item.params)) {
            params.push({
                key,
                value: item.params[key]
            })
        }

        const paramList = params.map(param => {
            return <div key={param.key}>{param.key}: {param.value}</div>
        });

        return <div>
            <div className="inventoryItem">
                {item.name}
            </div>
            <div>{paramList}</div>
        </div>
    };

    getTableColumns = () => {
        return [{
            title: 'Item',
            dataIndex: 'item',
            key: 'item',
            render: item => this.getItemDescription(item)
        }, {
            title: 'Purchase',
            dataIndex: 'purchase',
            key: 'purchase',
            render: item => this.checkPurchase(item)
        }];
    };

    getTableData = (type) => {
        let data = [];
        let tableKey = 1;

        for (const key of Object.keys(ShopItems)) {
            const item = ShopItems[key];

            if (item.type == type && item.canBuy !== 0) {
                data.push({
                    key: tableKey,
                    purchase: {
                        params: item,
                        key
                    },
                    item
                });

                tableKey++;
            }
        }

        return data;
    }
}

export default Shop;

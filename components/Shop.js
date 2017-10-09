import React from 'react';
import ShopItems from 'Items';
import { itemTypes } from './Inventory/itemTypes';
import { Table, Button, Tooltip, message, Tabs, Icon } from 'antd';
import { connect } from 'react-redux';
import { addItem, addCoins } from '../actions';

const TabPane = Tabs.TabPane;


class Shop extends React.Component {
    constructor(props) {
        super(props);

        this.hero = props.hero;
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

    checkPurchase = item => {
        let canPurchase = true;

        if (item.params.price.buy > this.hero.coins || item.params.level > this.hero.level) {
            canPurchase = false;
        }

        const buttonTitle = `Buy for ${item.params.price.buy} coins`;

        if (canPurchase) {
            return <Button type="primary" onClick={() => this.props.makePurchase(item, this.hero)}>{buttonTitle}</Button>;
        }

        return <Tooltip placement="top" title="You can't buy this item now (low level or not enough coins)">
            <Button disabled>{buttonTitle}</Button>
        </Tooltip>;
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

    renderItemIcon = icon => {
        if (!icon.type || !icon.img) {
            return 'no icon';
        }

        return <div>
            <img src={`img/${icon.type}/${icon.img}.jpg`} />
        </div>
    };

    getTableColumns = () => {
        return [{
            title: 'Item',
            dataIndex: 'item',
            key: 'item',
            render: item => this.getItemDescription(item)
        },{
            title: 'Icon',
            dataIndex: 'icon',
            key: 'icon',
            render: icon => this.renderItemIcon(icon)
        },{
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
                    item,
                    icon: {
                        img: item.icon,
                        type: item.type
                    }
                });

                tableKey++;
            }
        }

        return data;
    }
}

const mapStateToProps = (state) => ({
    hero: state.hero
});

const mapDispatchToProps = dispatch => ({
    makePurchase: (item, hero) => {
        const price = -item.params.price.buy;

        dispatch(addCoins(price, hero));
        dispatch(addItem(ShopItems[item.key], hero));

        message.success(`You\'ve bought item: ${item.params.name} `, 3);
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Shop);

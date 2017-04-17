import React from 'react';
import {Modal, Button} from 'antd';
import ItemsList from 'Inventory/ItemsList';

const itemTypes = ['weapon', 'armor'];

export default class Inventory extends React.Component {
    constructor(props) {
        super(props);
    }

    renderEmptyListMessage() {
        return <div>You haven't any items. You can buy it at shop or get as a quest award.</div>;
    }

    renderItemList(items) {
        return items.map((type, i) => {
            return (
                <div key={type}>
                    <ItemsList
                        type={type}
                        hero={this.props.hero}
                        useItem={this.useItem}
                        sellItem={this.sellItem}
                        deleteItem={this.deleteItem}
                        updateHero={this.props.updateHero}
                    />
                    {itemTypes.length !== i + 1 ?
                        <div className="divider"></div> : null
                    }
                </div>
            )
        })
    }

    render() {
        if (!this.props.hero) {
            return null;
        }

        const itemCount = this.props.hero.inventory.length;
        const itemsList = itemCount ? this.renderItemList(itemTypes) : this.renderEmptyListMessage();

        return (
            <Modal
                title={`Inventory Items (${itemCount} pcs.)`}
                wrapClassName="vertical-center-modal"
                visible={this.props.show}
                width={800}
                footer={[
                    <Button key="submit" type="primary" onClick={this.close}>
                        Close
                    </Button>,
                ]}
            >
                {itemsList}
            </Modal>
        );
    }

    useItem = (item) => {
        const hero = this.props.hero;
        const updateHero = this.props.updateHero;

        switch (item.type) {
            case 'weapon':
                hero.equipment.weapon = item.id;
                hero.minDamage = item.params.minDamage;
                hero.maxDamage = item.params.maxDamage;

                updateHero(hero);
                break;
            case 'armor':
                hero.equipment.armor = item.id;
                hero.maxHealth = item.params.maxHealth;

                if (hero.health > item.params.maxHealth) {
                    hero.health = item.params.maxHealth;
                }

                updateHero(hero);
                break;
            default:
                throw new Error('Not supported type of item');
        }
    };

    deleteItem = (item) => {
        const hero = this.props.hero;

        // check and remove from equipped items
        if (item.id == hero.equipment.weapon) {
            hero.equipment.weapon = null;
        }

        if (item.id == hero.equipment.armor) {
            hero.equipment.armor = null;
        }

        let index;

        // find current index (itemId) in hero inventory
        hero.inventory.forEach(function(invItem, i) {
            if (invItem.id == item.id) {
                index = i;
            }
        });

        // delete current item from hero inventory
        hero.inventory.splice(index, 1);

        // update hero data
        this.props.updateHero(hero);
    };

    sellItem = (item) => {
        // first, delete item from inventory
        this.deleteItem(item);

        // second, add coins to hero
        const hero = this.props.hero;
        hero.coins += item.price.sell;

        // and now, update hero once again
        this.props.updateHero(hero);
    };

    close = () => {
        this.props.toggle();
    };
}

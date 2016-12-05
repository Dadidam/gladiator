import React from 'react';
import ItemsList from 'Inventory/ItemsList';
import { Modal, Button } from 'react-bootstrap';

export default class Inventory extends React.Component {

    constructor() {
        super();
        this.close = this.close.bind(this);
    }

    useItem(item) {
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
    }

    deleteItem(item) {
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
    }

    close() {
        this.props.toggle();
    }

    render() {
        const hero = this.props.hero;

        return (
            <Modal show={this.props.show} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Inventory ({hero.name})</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Weapons</h4>
                    <ItemsList
                        type="weapon"
                        hero={hero}
                        useItem={this.useItem}
                        deleteItem={this.deleteItem}
                        updateHero={this.props.updateHero}
                    />
                    <hr />
                    <h4>Armors</h4>
                    <ItemsList
                        type="armor"
                        hero={hero}
                        useItem={this.useItem}
                        deleteItem={this.deleteItem}
                        updateHero={this.props.updateHero}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

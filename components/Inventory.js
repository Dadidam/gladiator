import React from 'react';
import ItemsList from 'Inventory/ItemsList';
import { Modal, Button } from 'react-bootstrap';

export default (props) => {
    const useItem = (item) => {
        const hero = props.hero;
        const updateHero = props.updateHero;

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

    const deleteItem = (item) => {
        const hero = props.hero;

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
        props.updateHero(hero);
    };

    const sellItem = (item) => {
        deleteItem(item);

        const hero = props.hero;
        hero.coins += item.price.sell;

        props.updateHero(hero);
    };

    const close = () => {
        props.toggle();
    };

    return (
        <Modal show={props.show} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Inventory ({props.hero.name})</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Weapons</h4>
                <ItemsList
                    type="weapon"
                    hero={props.hero}
                    useItem={useItem}
                    sellItem={sellItem}
                    deleteItem={deleteItem}
                    updateHero={props.updateHero}
                />
                <hr />
                <h4>Armors</h4>
                <ItemsList
                    type="armor"
                    hero={props.hero}
                    useItem={useItem}
                    sellItem={sellItem}
                    deleteItem={deleteItem}
                    updateHero={props.updateHero}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={close}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

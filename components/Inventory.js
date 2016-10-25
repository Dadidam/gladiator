import React from 'react';
import { Tooltip, Popover, Modal, Button } from 'react-bootstrap';

class Inventory extends React.Component {
    constructor() {
        super();
        this.close = this.close.bind(this);
    }
    useItem(item, hero, updateHero) {
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
    close() {
        this.props.toggle();
    }
    render() {
        const hero = this.props.hero;
        const updateHero = this.props.updateHero;

        const weapons = hero.inventory.filter((item) => {
            return item.type === 'weapon';
        });
        const weaponList = weapons.map((item, i) => {
            return (
                <div key={i}>
                    {item.name} ({hero.equipment.weapon !== item.id ?
                    <a href="#" onClick={this.useItem.bind(this, item, hero, updateHero)}>Use It!</a>
                    : <b>In use</b>
                })
                </div>
            )
        });

        const armors = hero.inventory.filter((item) => {
            return item.type === 'armor';
        });
        const armorList = armors.map((item, i) => {
            return (
                <div key={i}>
                    {item.name} ({hero.equipment.armor !== item.id ?
                    <a href="#" onClick={this.useItem.bind(this, item, hero, updateHero)}>Use It!</a>
                    : <b>In use</b>
                })
                </div>
            )
        });

        return (
            <Modal show={this.props.show} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Inventory ({hero.name})</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Weapons</h4>{weaponList}<hr />
                    <h4>Armors</h4>{armorList}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default Inventory

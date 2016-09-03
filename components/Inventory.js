import React from 'react';
import { Tooltip, Popover, Modal } from 'react-bootstrap';

class Hero extends React.Component {
    constructor() {
        super();
        this.close = this.close.bind(this);
    }
    close() {
        this.props.toggle();
    }
    render() {

        const popover = (
            <Popover id="modal-popover" title="popover">
                very popover. such engagement
            </Popover>
        );
        const tooltip = (
            <Tooltip id="modal-tooltip">
                wow.
            </Tooltip>
        );
        const hero = this.props.hero;

        const weapons = hero.inventory.filter((item) => {
            return item.type === 'weapon';
        });
        const weaponList = weapons.map((item, i) => {
            return (
                <div key={i}>{item.name}</div>
            )
        });

        const armors = hero.inventory.filter((item) => {
            return item.type === 'armor';
        });
        const armorList = armors.map((item, i) => {
            return (
                <div key={i}>{item.name}</div>
            )
        });

        return (
            <Modal show={this.props.show} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Inventory ({hero.name})</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Weapons</h4>
                    {weaponList}

                    <hr />

                    <h4>Armors</h4>
                    {armorList}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default Hero

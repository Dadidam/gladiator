import React from 'react';
import Character from './Character';
import Inventory from './Inventory';
import { ProgressBar, Badge, Tooltip, OverlayTrigger } from 'react-bootstrap';

class Hero extends Character {
    constructor() {
        super();
        this.state = {
            show: false
        };
        this.toggleInventory = this.toggleInventory.bind(this);
    }
    toggleInventory() {
        this.setState({
            show: !this.state.show
        });
    }
    render() {
        const hero = this.props.params;
        const barStyle = { width:150 };
        const hp = (hero.health / hero.maxHealth) * 100;

        const hpTooltip = (
            <Tooltip id="tooltip">{`${hero.health}/${hero.maxHealth}`}</Tooltip>
        );

        return (
            <div>
                <h3>{hero.name} ({hero.level} level)</h3>
                <div style={barStyle}>
                    <OverlayTrigger placement="right" overlay={hpTooltip}>
                        <ProgressBar bsStyle="danger" now={hp} label={`${hp}%`} />
                    </OverlayTrigger>
                </div>
                <div>Damage <Badge>{hero.minDamage}-{hero.maxDamage}</Badge></div>
                <div>Coins <Badge>{hero.coins}</Badge></div>
                <div><a href="#" onClick={this.toggleInventory}>Inventory</a> <Badge>{hero.inventory.length}</Badge></div>
                <div><a href="#" onClick={this.props.changeHero}>Exit</a></div>
                <Inventory show={this.state.show} toggle={this.toggleInventory} hero={hero} updateHero={this.props.updateHero}/>
            </div>
        );
    }
}

export default Hero

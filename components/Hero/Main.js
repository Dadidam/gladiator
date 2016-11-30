import React from 'react';
import Character from 'Character';
import Inventory from 'Inventory';
import InfoPanel from 'Hero/InfoPanel';

export default class Hero extends Character {

    constructor() {
        super();
        this.state = {
            showInventory: false
        };
        this.toggleInventory = this.toggleInventory.bind(this);
    }

    componentDidMount() {
        this.restoreHealth(this.props.params, this.props.updateHero);
    }

    componentWillUpdate(nextProps) {
        this.restoreHealth(nextProps.params, nextProps.updateHero);
    }

    restoreHealth(hero, heroUpdate) {
        if (hero.health < hero.maxHealth) {
            setTimeout(() => {
                hero.health++;
                heroUpdate(hero);
            }, 1000);
        }
    }

    toggleInventory() {
        this.setState({
            showInventory: !this.state.showInventory
        });
    }

    render() {
        const hero = this.props.params;

        return (
            <div>
                <InfoPanel
                    hero={hero}
                    handleInventory={this.toggleInventory}
                    handleChangeHero={this.props.changeHero}
                />
                <Inventory
                    hero={hero}
                    show={this.state.showInventory}
                    toggle={this.toggleInventory}
                    updateHero={this.props.updateHero}
                />
            </div>
        );
    }
}

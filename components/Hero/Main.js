import React from 'react';
import Inventory from 'Inventory';
import InfoPanel from 'Hero/InfoPanel';

export default class Hero extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showInventory: false
        };

        this.hero = props.params;
        this.updateHero = props.updateHero;
        this.changeHero = props.changeHero;
    }

    componentDidMount() {
        this.restoreHealth();
    }

    componentWillUpdate() {
        this.restoreHealth();
    }

    render() {
        return (
            <div style={{ paddingLeft: '24px' }}>
                <InfoPanel
                    hero={this.hero}
                    handleInventory={this.toggleInventory}
                    handleChangeHero={this.changeHero}
                />
                <Inventory
                    hero={this.hero}
                    show={this.state.showInventory}
                    toggle={this.toggleInventory}
                    updateHero={this.updateHero}
                />
            </div>
        );
    }

    restoreHealth = () => {
        if (this.hero.health < this.hero.maxHealth) {
            setTimeout(() => {
                this.hero.health++;
                this.updateHero(this.hero);
            }, 5000);
        }

        if (this.hero.health > this.hero.maxHealth) {
            this.hero.health = this.hero.maxHealth;
            this.updateHero(this.hero);
        }
    };

    toggleInventory = () => {
        this.setState({
            showInventory: !this.state.showInventory
        });
    };
}

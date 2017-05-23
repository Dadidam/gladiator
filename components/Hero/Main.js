import React from 'react';
import Inventory from 'Inventory';
import InfoPanel from 'Hero/InfoPanel';

const refillInterval = 3000;


class Hero extends React.Component {

    constructor(props) {
        super(props);

        this.hero = props.params;
        this.restore = null;

        this.state = {
            showInventory: false,
            refill: this.hero.health < this.hero.maxHealth
        };

        this.updateHero = props.playerStore.updateHero;
    }

    componentDidMount() {
        this.restore = setInterval(
            () => this.restoreHealth(),
            refillInterval
        );
    }

    componentWillUnmount() {
        clearInterval(this.restore);
    }

    render() {
        return (
            <div className="heroMainPanel">
                <InfoPanel
                    hero={this.hero}
                    handleInventory={this.toggleInventory}
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
        console.log('this.hero.name - ', this.hero.name);
        if (this.hero.health < this.hero.maxHealth) {
            this.hero.health++;
            this.updateHero(this.hero);
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

export default Hero;

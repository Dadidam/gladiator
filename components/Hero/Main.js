import React from 'react';
import Inventory from 'Inventory';
import InfoPanel from 'Hero/InfoPanel';

const refillInterval = 3000;

export default class Hero extends React.Component {
    constructor(props) {
        super(props);

        this.hero = props.params;

        this.state = {
            showInventory: false,
            refill: this.hero.health < this.hero.maxHealth
        };

        this.updateHero = props.updateHero;
        this.changeHero = props.changeHero;
    }

    componentDidMount() {
        setInterval(
            () => this.restoreHealth(),
            refillInterval
        );
    }

    render() {
        return (
            <div className="heroMainPanel">
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
                <div>Hero name: {this.props.appState.player.name}</div>
                <button onClick={() => this.props.appState.changeName('adasdasd')}>Change player name</button>
                <div>Player Level: {this.props.playerStore.level}</div>
            </div>
        );
    }

    restoreHealth = () => {
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

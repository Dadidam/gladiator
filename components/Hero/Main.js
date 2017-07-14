import React from 'react';
import Inventory from 'Inventory';
import InfoPanel from 'Hero/InfoPanel';
import { connect } from 'react-redux';
import { updateHero } from '../../actions';

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

        this.playerStore = props.playerStore;
        // this.updateHero = props.playerStore.updateHero;
        this.updateHero = props.updateHero;
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
                    playerStore={this.playerStore}
                />
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

const mapStateToProps = (state) => ({
    hero: state.hero
});

const mapDispatchToProps = dispatch => ({
    updateHero: (hero) => dispatch(updateHero(hero)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Hero);
// export default Hero;

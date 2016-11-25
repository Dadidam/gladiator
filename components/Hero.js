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
            show: !this.state.show
        });
    }
    setHealthBarType(healthValue) {
        if (healthValue > 69) {
            return 'success';
        } else if (healthValue > 29) {
            return 'warning';
        }

        return 'danger';
    }
    render() {
        const hero = this.props.params;
        const hp = Math.round((hero.health / hero.maxHealth) * 100);

        const hpTooltip = (
            <Tooltip id="tooltip">{`${hero.health}/${hero.maxHealth} (${hp}%)`}</Tooltip>
        );

        const healthBar = this.setHealthBarType(hp);

        return (
            <div>
                <h3>{hero.name}</h3>
                <div>{hero.level} level, {hero.exp} exp</div>
                <div style={{ width: 150 }}>HP (+1/sec):</div>
                <div style={{ width: 150 }}>
                    <div>
                        <OverlayTrigger placement="right" overlay={hpTooltip}>
                            <ProgressBar bsStyle={healthBar} now={hp} style={{ backgroundColor: '#eee'}} />
                        </OverlayTrigger>
                    </div>
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

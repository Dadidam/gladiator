import React from 'react';
import Character from './Character';
import { ProgressBar, Badge, Tooltip, OverlayTrigger } from 'react-bootstrap';

class Hero extends Character {
  constructor() {
    super();
    this.state = {
      name: this.name,
      level: this.level,
      coins: this.coins,
      health: this.health,
      maxHealth: this.maxHealth,
      minDamage: this.minDamage,
      maxDamage: this.maxDamage,
      inventory: this.inventory
    }
  }
  render() {
    const hero = this.props.params;
    const barStyle = {width:150};
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
        <div>Coins <Badge>{hero.coins}</Badge></div>
        <div><a href="#">Inventory</a> <Badge>{hero.inventory.length}</Badge></div>
        <div><a href="#" onClick={this.props.changeHero}>Exit</a></div>
      </div>
    );
  }
}

export default Hero

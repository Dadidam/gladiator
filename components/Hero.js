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
    let hero = this.state;

    let barStyle = {width:150};
    let hp = (hero.health / hero.maxHealth) * 100;

    let hpTooltip = (
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
      </div>
    )
  }
}

export default Hero

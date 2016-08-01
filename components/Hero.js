import React from 'react';
import Character from './Character';
import { Button, Glyphicon } from 'react-bootstrap';

class Hero extends Character {
  constructor() {
    super();
    this.state = {
      name: this.name,
      attributes: this.attributes,
      params: this.params,
      inventory: this.inventory
    }
  }
  render() {
    let params = this.state.params;
    let attrib = this.state.attributes;

    return (
      <div>
        <h3>{this.state.name}</h3>
        <div>
          <Glyphicon glyph="heart" />
          {params.health}/{attrib.health},
          <Glyphicon glyph="copyright-mark" />
          {params.coins}
        </div>
        <h4>Attributes</h4>
        <div>
          <Glyphicon glyph="screenshot" />
          {attrib.damage + params.damage}
        </div>
        <h4>Inventory</h4>
        <div>
          Empty
        </div>
      </div>
    )
  }
}

export default Hero

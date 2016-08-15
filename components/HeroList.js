import React from 'react';
import { Button } from 'react-bootstrap';

import * as storage from '../services/localStorage';

class HeroList extends React.Component {
  constructor() {
    super();
    this.player = storage.get('player');
  }
  selectHero(id, updatePlayer) {
    this.player.activeHeroId = id;
    storage.set('player', this.player);
    updatePlayer(this.player);
  }
  render() {
    let heroes = this.props.heroes.map( hero => {
      return <div key={hero.id}>
        {hero.name} ({hero.exp} lvl)
        <Button bsSize="xsmall" bsStyle="primary" value={hero} onClick={this.selectHero.bind(this, hero.id, this.props.updatePlayer)}>select</Button>
      </div>
    });

    return (
      <div>
        <h3>Heroes list</h3>
        <div>{heroes}</div>
      </div>
    );
  }
}

export default HeroList

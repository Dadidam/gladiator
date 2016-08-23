import React from 'react';
import { Button, Grid, Row, Col } from 'react-bootstrap';

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
    const heroes = this.props.heroes.map( hero => {
      return <div key={hero.id}>
        {hero.name} ({hero.exp} lvl)
        <Button bsSize="xsmall" bsStyle="primary" value={hero}
								onClick={this.selectHero.bind(this, hero.id, this.props.updatePlayer)}>select</Button>
      </div>
    });

    return (
      <div>
        <h3>Heroes list</h3>
				<Grid>
					<Row className="show-grid">
						<div>{heroes}</div>
					</Row>
				</Grid>
      </div>
    );
  }
}

export default HeroList

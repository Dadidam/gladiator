import React from 'react';
import Hero from './components/Hero';
import Arena from './components/Arena';
import Player from './components/Player';
import { Grid, Row, Col } from 'react-bootstrap';

import * as storage from './services/localStorage';
import * as playerService from './services/player';

class App extends React.Component {
    constructor() {
      super();
      this.state = {
        player: storage.get('player')
      };
      this.updatePlayer = this.updatePlayer.bind(this);
    }
    updatePlayer(player) {
      this.setState({player: player});
    }
    render(){
      let app;
      let player = this.state.player;

      if (!player) {
        app = (
          <div>
            <Col xs={12} md={6}>
              <Player isNewPlayer={true} />
            </Col>
          </div>
        );
      } else {
        if (player.activeHeroId) {
          let hero = playerService.getHeroById(player.heroes, player.activeHeroId);

          app = (
            <div>
              <Col xs={6} md={4}>
                <Hero params={hero} />
              </Col>
              <Col xs={6} md={3}>
                <Arena />
              </Col>
            </div>
          );
        } else {
          app = (
            <div>
              <Col xs={12} md={6}>
                <Player heroes={player.heroes} updatePlayer={this.updatePlayer} />
              </Col>
            </div>
          )
        }
      }

      return (
        <div>
        <Grid>
          <Row className="show-grid">
            {app}
          </Row>
          </Grid>
        </div>
      )
    }
}

export default App;

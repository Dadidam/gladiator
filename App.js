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

      const renderApp = (app) => (
        <div>
        <Grid>
          <Row className="show-grid">
            {app}
          </Row>
          </Grid>
        </div>
      );

      const newPlayer = (
        <div>
          <Col xs={12} md={6}>
            <Player isNewPlayer={true} />
          </Col>
        </div>
      );

      const mainPanel = (hero) => (
        <div>
          <Col xs={6} md={4}>
            <Hero params={hero} />
          </Col>
          <Col xs={6} md={3}>
            <Arena />
          </Col>
        </div>
      );

      const heroList = (heroes, updatePlayer) => (
        <div>
          <Col xs={12} md={6}>
            <Player heroes={heroes} updatePlayer={updatePlayer} />
          </Col>
        </div>
      );

      if (!player) {
        return renderApp(newPlayer);
      } else {
        if (player.activeHeroId) {
          const hero = playerService.getHeroById(player.heroes, player.activeHeroId);
          const mainPanel = mainPanel(hero);

          return renderApp(mainPanel);
        } else {
          const heroList = heroList(player.heroes, this.updatePlayer);

          return renderApp(heroList);
        }
      }

      return mainApp;
    }
}

export default App;

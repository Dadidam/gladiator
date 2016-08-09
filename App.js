import React from 'react';
import Hero from './components/Hero';
import Arena from './components/Arena';
import Player from './components/Player';
import { Grid, Row, Col } from 'react-bootstrap';

import * as storage from './services/localStorage';

class App extends React.Component {
    render(){

      let app = (
        <div>
          <Col xs={6} md={4}>
            <Hero />
          </Col>
          <Col xs={6} md={3}>
            <Arena />
          </Col>
        </div>
      );

      if (!storage.get('player')) {
        app = (
          <div>
            <Col xs={12} md={6}>
              <Player />
            </Col>
          </div>
        );
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

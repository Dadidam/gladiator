import React from 'react';
import Hero from './components/Hero';
import Arena from './components/Arena';
import { Grid, Row, Col } from 'react-bootstrap';

class App extends React.Component {
    render(){
        return (
          <div>
          <Grid>
            <Row className="show-grid">
              <Col xs={6} md={4}>
                <Hero />
              </Col>
              <Col xs={6} md={3}>
                <Arena />
              </Col>
            </Row>
            </Grid>
          </div>
        )
    }
}

export default App;

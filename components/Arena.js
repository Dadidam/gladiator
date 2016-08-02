import React from 'react';
import { Button } from 'react-bootstrap';

class Arena extends React.Component {
  render() {
    const wellStyles = {maxWidth: 400, margin: '0 auto 10px'};

    return (
      <div>
        <h3>Quests</h3>
        <div className="well" style={wellStyles}>
          <Button block>Kill the rat (1 lvl)</Button>
          <Button bsStyle="success" block>Beat wolf (2 lvl)</Button>
          <Button bsStyle="warning" block>Punish the thief (3 lvl)</Button>
          <Button bsStyle="danger" block>Find treasure (5 lvl)</Button>
        </div>
      </div>
    )
  }
}

export default Arena

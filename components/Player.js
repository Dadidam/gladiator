import React from 'react';
import * as storage from '../services/localStorage';
import { ProgressBar, Badge, Tooltip, OverlayTrigger } from 'react-bootstrap';

// const hasCharacters = () => {
//
// }

/*
player: {
  heroes: [
    {
      name: '',
      exp: 0
    },
  ],
  lastVisit: null
}
*/

class Player extends React.Component {
  constructor() {
    super();
    this.player = storage.get('player');
    this.hasCharacters = () => this.player && this.player.heroes.length > 0;
  }
  render() {
    const isNewPlayer = !this.hasCharacters();

    let charList = (
      <div>CharList here</div>
    );

    if (isNewPlayer) {
      charList = (
        <div>No hero. Want to create one?</div>
      )
    }

    return charList;
  }
}

export default Player

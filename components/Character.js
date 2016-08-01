import React from 'react';

class Character extends React.Component {
  constructor() {
    super();

    this.name = 'No Name Hero';
    this.inventory = [];
    this.attributes = {
      health: 10,
      damage: 1
    };
    this.params = {
      damage: 0,
      coins: 0
    };
  }
}

export default Character

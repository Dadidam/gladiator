import React from 'react';
import { Button } from 'react-bootstrap';

class Arena extends React.Component {

	collectCoins(hero, count, updateHero) {
		hero.coins += count;

		updateHero(hero);
	}

  render() {
    const wellStyles = {maxWidth: 400, margin: '0 auto 10px'};
		const hero = this.props.hero;
		const updateHero = this.props.updateHero;

    return (
      <div>
        <h3>Quests</h3>
        <div className="well" style={wellStyles}>
          <Button block onClick={this.collectCoins.bind(this, hero, 1, updateHero)}>Kill the rat (+1 coin)</Button>
          <Button bsStyle="success" block onClick={this.collectCoins.bind(this, hero, 2, updateHero)}>Beat wolf (+2 coins)</Button>
          <Button bsStyle="warning" block onClick={this.collectCoins.bind(this, hero, 3, updateHero)}>Punish the thief (+3 coins)</Button>
          <Button bsStyle="danger" block onClick={this.collectCoins.bind(this, hero, 5, updateHero)}>Find treasure (+5 coins)</Button>
        </div>
      </div>
    )
  }
}

export default Arena

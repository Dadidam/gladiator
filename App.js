import React from 'react';
import Hero from './components/Hero/Hero';
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
		this.changeHero = this.changeHero.bind(this);
		this.updateHero = this.updateHero.bind(this);
	}

    updatePlayer(player) {
		this.setState({player: player});
	}

    updateHero(hero) {
		const updatedPlayer = playerService.updatePlayerModelByHero(this.state.player, hero);

		storage.set('player', updatedPlayer);

		this.setState({player: updatedPlayer});
	}

    changeHero() {
		const player = this.state.player;
		player.activeHeroId = null;

		storage.set('player', player);

		this.setState({player: player});
	}

    render() {

		const renderApp = (app) => (
			<div style={{ marginTop: '30px' }}>
			<Grid>
				<Row className="show-grid">
					{app}
				</Row>
				</Grid>
			</div>
		);

		const newPlayer = (
			<div>
				<Col md={12}>
					<Player isNewPlayer={true} updatePlayer={this.updatePlayer} />
				</Col>
			</div>
		);

		const mainPanel = (hero) => (
			<div>
				<Col md={3}>
					<Hero params={hero} changeHero={this.changeHero} updateHero={this.updateHero} />
				</Col>
				<Col md={6}>
					<Arena hero={hero} updateHero={this.updateHero} />
				</Col>
			</div>
		);

		const heroList = (heroes) => (
			<div>
				<Col md={12}>
					<Player heroes={heroes} updatePlayer={this.updatePlayer} />
				</Col>
			</div>
		);

		const player = this.state.player;

		if (!player) {
			return renderApp(newPlayer);
		}

		if (player.activeHeroId) {
			const hero = playerService.getHeroById(player.heroes, player.activeHeroId);
			const panel = mainPanel(hero);

			return renderApp(panel);
		}

		const charList = heroList(player.heroes, this.updatePlayer);

		return renderApp(charList);

	}
}

export default App;

import React from 'react';
import UiMain from './components/UI/Main';
import MainPanel from './components/Hero/MainPanel';
import CharacterSelectPanel from './components/Hero/CharacterSelectPanel';

import * as storage from './services/localStorage';
import * as playerService from './services/player';

export default class App extends React.Component {

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
		const player = this.state.player;

        return (
            <div>
                <UiMain>
                    <CharacterSelectPanel
                        player={player}
                        updateHandler={this.updatePlayer}
                    />
                    <MainPanel
                        player={player}
                        changeHero={this.changeHero}
                        updateHero={this.updateHero}
                    />
                </UiMain>
            </div>
        );
	}
}

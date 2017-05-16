import React from 'react';
import Character from 'Character';
import HeroSelector from 'Player/HeroSelector';
import CreateButton from 'Player/CreateButton';
import CreateHeroForm from 'Player/CreateHeroForm';

import * as storage from 'services/localStorage';

class Player extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            heroName: '',
            editMode: false,
            formDisabled: true
        };

        this.updatePlayer = props.playerStore.updatePlayer;
    }

    render() {
        const player = this.props.playerStore.player;
        const showSelector = player ? !this.state.editMode && !player.activeHeroId : !this.state.editMode;

        return (
            <div>
                <CreateHeroForm
                    updatePlayerHandler={this.updatePlayer}
                    updateHeroNameHandler={this.updateHeroName}
                    createNewHeroHandler={this.createNewHero}
                    formDisabled={this.state.formDisabled}
                    editMode={this.state.editMode}
                    player={player}
                />
                <HeroSelector
                    player={player}
                    show={showSelector}
                    uiStore={this.props.uiStore}
                    playerStore={this.props.playerStore}
                    createButton={
                        <CreateButton renderFormHandler={this.renderNewHeroForm} />
                    }
                />
            </div>
        )
    }

    renderNewHeroForm = () => {
        this.setState({editMode: true});
    };

    updateHeroName = (e) => {
        this.setState({
            heroName: e.target.value,
            formDisabled: e.target.value.length < 3
        });
    };

    createNewHero = () => {
        if (this.state.heroName !== '') {
            let player = this.props.playerStore.player;

            const startHealth = 5;

            let newHero = new Character(this.state.heroName, startHealth, startHealth);

            if (player) {
                newHero.id = player.heroes.length + 1;
                player.heroes.push(newHero);
            } else {
                newHero.id = 1;
                player = {
                    heroes: [newHero],
                    lastVisit: new Date(),
                    activeHeroId: null
                };
            }

            this.updatePlayer(player);

            this.setState({editMode: false});
        }
    };
}

export default Player;

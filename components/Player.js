import React from 'react';
import Character from 'Character';
import HeroSelector from 'Player/HeroSelector';
import CreateButton from 'Player/CreateButton';
import CreateHeroForm from 'Player/CreateHeroForm';

import * as storage from 'services/localStorage';

export default class Player extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            heroName: '',
            editMode: false,
            formDisabled: true
        };

        this.updatePlayer = this.props.updatePlayer;
    }

    render() {
        const player = storage.get('player');
        const editMode = this.state.editMode;

        return (
            <div>
                <CreateHeroForm
                    updatePlayerHandler={this.updatePlayer}
                    updateHeroNameHandler={this.updateHeroName}
                    createNewHeroHandler={this.createNewHero}
                    formDisabled={this.state.formDisabled}
                    editMode={editMode}
                    player={player}
                />
                <HeroSelector
                    player={player}
                    show={!editMode}
                    updatePlayerHandler={this.updatePlayer}
                    tabUpdateHandler={this.props.tabUpdateHandler}
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
            let player = storage.get('player');
            let newHero = new Character(this.state.heroName);

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

            storage.set('player', player);

            this.updatePlayer(player);

            this.setState({editMode: false});
        }
    };
}

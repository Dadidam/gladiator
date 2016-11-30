import React from 'react';
import Character from 'Character';
import HeroSelector from 'Player/HeroSelector';
import CreateButton from 'Player/CreateButton';
import CreateHeroForm from 'Player/CreateHeroForm';

import * as storage from 'services/localStorage';

export default class Player extends React.Component {
    constructor() {
        super();
        this.state = {
            heroName: '',
            editMode: false,
            formDisabled: true
        };

        this.renderNewHeroForm = this.renderNewHeroForm.bind(this);
        this.updateHeroName = this.updateHeroName.bind(this);
        this.createNewHero = this.createNewHero.bind(this);
    }

    renderNewHeroForm() {
        this.setState({editMode: true});
    }

    updateHeroName(e) {
        this.setState({
            heroName: e.target.value,
            formDisabled: e.target.value.length < 3
        });
    }

    createNewHero() {
        if (this.state.heroName !== '') {
            let player = storage.get('player');
            let newHero = new Character;

            newHero.name = this.state.heroName;

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

            this.props.updatePlayer(player);

            this.setState({editMode: false});
        }
    }

    render() {
        const player = storage.get('player');
        const editMode = this.state.editMode;

        return (
            <div>
                <CreateHeroForm
                    updatePlayerHandler={this.props.updatePlayer}
                    updateHeroNameHandler={this.updateHeroName}
                    createNewHeroHandler={this.createNewHero}
                    formDisabled={this.state.formDisabled}
                    editMode={editMode}
                    player={player}
                />
                <HeroSelector
                    player={player}
                    show={!editMode}
                    updatePlayerHandler={this.props.updatePlayer}
                    createButton={
                        <CreateButton renderFormHandler={this.renderNewHeroForm} />
                    }
                />
            </div>
        )
    }
}

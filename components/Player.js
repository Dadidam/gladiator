import React from 'react';
import Jumbo from './Jumbo';
import HeroList from './HeroList';
import Character from './Character';
import { Button, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import * as storage from '../services/localStorage';

class Player extends React.Component {
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

        const createBtn = (
            <div>
                <Button bsSize="large" onClick={this.renderNewHeroForm}>Create new hero</Button>
            </div>
        );

        const createHeroForm = (
            <Form inline>
                <FormGroup controlId="formInlineName">
                    <ControlLabel>Hero Name:</ControlLabel>
                    {' '}
                    <FormControl type="text" placeholder="Russell Crowe" onChange={this.updateHeroName} />
                </FormGroup>
                {' '}
                <Button type="submit" onClick={this.createNewHero} disabled={this.state.formDisabled}>
                    Create
                </Button>
            </Form>
        );

        const renderHeroList = (heroes, updatePlayer) => (
            <div>
                <HeroList heroes={heroes} updatePlayer={updatePlayer} />
                {createBtn}
            </div>
        );

        const isNewPlayer = this.props.isNewPlayer;
        const updatePlayer = this.props.updatePlayer;

        const editMode = this.state.editMode;
        const isEditMode = isNewPlayer && editMode || editMode;
        const isListMode = !editMode && !isNewPlayer;

        if (isEditMode) {
            const title = 'Create new hero';
            const text = 'What\'s the name of your hero?';

            return <Jumbo title={title} description={text} controls={createHeroForm} />;
        }

        if (isListMode) {
            const heroes = storage.get('player').heroes;
            const heroList = renderHeroList(heroes, updatePlayer);

            return <Jumbo title="Heroes list" controls={heroList} />;
        }

        const welcomeTitle = 'Welcome to the Gladiator game!';
        const welcomeText = 'You don\'t have a heroes yet. Would you like to create one?';

        return <Jumbo title={welcomeTitle} description={welcomeText} controls={createBtn} />;
    }
}

export default Player

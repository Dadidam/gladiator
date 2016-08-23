import React from 'react';
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
        storage.set('player', player);
      } else {
        newHero.id = 1;
        storage.set('player', {
          heroes: [newHero],
          lastVisit: new Date(),
          activeHeroId: null
        })
      }

			this.setState({editMode: false});
    }
  }

  render() {
    const createBtn = (
      <div>
        <Button bsSize="xsmall" onClick={this.renderNewHeroForm}>Create new hero</Button>
      </div>
    );

    const createHeroForm = (
      <div>
      <h3>Create new hero</h3>
      <Form inline>
        <FormGroup controlId="formInlineName">
          <ControlLabel>Hero Name</ControlLabel>
          {' '}
          <FormControl type="text" placeholder="Jane Doe" onChange={this.updateHeroName} />
        </FormGroup>
        {' '}
        <Button type="submit" onClick={this.createNewHero} disabled={this.state.formDisabled}>
          Create
        </Button>
      </Form>
      </div>
    );

    const noHeroMessage = (
      <div>
        <div>Heroes not found.</div>
        {createBtn}
      </div>
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
      return createHeroForm;
    }

    if (isListMode) {
      const heroes = storage.get('player').heroes;

      return renderHeroList(heroes, updatePlayer);
    }

    return noHeroMessage;
  }
}

export default Player

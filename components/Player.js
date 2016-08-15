import React from 'react';
import HeroList from './HeroList';
import Character from './Character';
import { Button, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import * as storage from '../services/localStorage';

/* PLAYER MODEL
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
    this.state = {
      heroName: '',
      editMode: false,
      formDisabled: true
    }

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
    }
  }
  render() {
    let player;

    const createBtn = (
      <div>
        <Button bsSize="xsmall" onClick={this.renderNewHeroForm}>Create new hero</Button>
      </div>
    )

    const renderCreateHeroForm = (
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
    )

    if (this.props.isNewPlayer) {
      if (this.state.editMode) {
        player = renderCreateHeroForm;
      } else {
        player = (
          <div>
            <div>Heroes not found.</div>
            {createBtn}
          </div>
        )
      }
    } else {
      const heroes = storage.get('player').heroes;

      if (this.state.editMode) {
        player = renderCreateHeroForm;
      } else {
        player = (
          <div>
            <HeroList heroes={heroes} updatePlayer={this.props.updatePlayer} />
            {createBtn}
          </div>
        )
      }
    }

    return player;
  }
}

export default Player

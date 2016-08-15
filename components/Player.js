import React from 'react';
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
    this.player = storage.get('player');
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
      // TODO: check if player was already created
      storage.set('player', {
        heroes: [
          {
            name: this.state.heroName,
            exp: 0
          },
        ],
        lastVisit: new Date()
      })
    }
  }
  render() {
    let charList = (
      <div>CharList here</div>
    );

    if (this.props.isNewPlayer) {
      if (this.state.editMode) {
        charList = (
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
      } else {
        charList = (
          <div>
            <div>Heroes not found.</div>
            <div>
              <Button bsSize="xsmall" onClick={this.renderNewHeroForm}>Create new hero</Button>
            </div>
          </div>
        )
      }

    }

    return charList;
  }
}

export default Player

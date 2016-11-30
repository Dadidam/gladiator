import React from 'react';
import Jumbo from '../Jumbo';
import dictionary from 'Player/Dictionary';
import { Button, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import * as storage from 'services/localStorage';

export default class CreateHeroForm extends React.Component {

    _renderCreateForm() {
        return (
            <Form inline>
                <FormGroup controlId="formInlineName">
                    <ControlLabel>{dictionary.heroName}:</ControlLabel>
                    {' '}
                    <FormControl
                        type="text"
                        placeholder="Russell Crowe"
                        onChange={this.props.updateHeroNameHandler}
                    />
                </FormGroup>
                {' '}
                <Button
                    type="submit"
                    onClick={this.props.createNewHeroHandler}
                    disabled={this.props.formDisabled}
                >
                    {dictionary.create}
                </Button>
            </Form>
        )
    }

    render() {
        return !this.props.player || this.props.editMode  ? (
            <Jumbo
                title={dictionary.createNewHero}
                description={dictionary.newHeroNameTitle}
                controls={this._renderCreateForm()}
            />
        ) : null
    }
}

import React from 'react';
import Jumbo from '../Jumbo';
import dictionary from 'Player/Dictionary';
import { Button, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import * as storage from 'services/localStorage';

export default class CreateHeroForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const form = this.renderForm();

        return !this.props.player || this.props.editMode  ? (
            <Jumbo
                title={dictionary.createNewHero}
                description={dictionary.newHeroNameTitle}
                controls={form}
            />
        ) : null
    }

    renderForm = () => {
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
                    disabled={this.props.formDisabled}
                    onClick={this.props.createNewHeroHandler}
                >
                    {dictionary.create}
                </Button>
            </Form>
        )
    };
}

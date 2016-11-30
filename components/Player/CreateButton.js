import React from 'react';
import { Button } from 'react-bootstrap';
import dictionary from 'Player/Dictionary';

export default class CreateButton extends React.Component {
    render() {
        return (
            <Button
                bsSize="large"
                onClick={this.props.renderFormHandler}
            >
                {dictionary.createNewHero}
            </Button>
        )
    }
}

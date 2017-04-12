import React from 'react';
import {Button} from 'antd';
import dictionary from 'Player/Dictionary';

export default class CreateButton extends React.Component {
    render() {
        return (
            <Button
                type="primary"
                onClick={this.props.renderFormHandler}
                style={{marginTop: 15}}
            >
                {dictionary.createNewHero}
            </Button>
        )
    }
}

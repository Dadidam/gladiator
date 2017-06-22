import React from 'react';
import NewHero from '../Forms/NewHero';

export default class CreateHeroForm extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (!this.props.player || this.props.editMode) {
            return <NewHero updateName={this.props.updateHeroNameHandler} createNewHero={this.props.createNewHeroHandler} />
        }

        return null;
    }
}

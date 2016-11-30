import React from 'react';
import Jumbo from '../Jumbo';
import HeroList from '../Hero/HeroList';
import dictionary from '../Player/Dictionary';
import * as storage from '../../services/localStorage';

export default class HeroSelector extends React.Component {

    _renderHeroList(heroes, updatePlayer, button) {
        return (
            <div>
                <HeroList heroes={heroes} updatePlayer={updatePlayer} />
                {button}
            </div>
        )
    }

    render() {

        if (!this.props.show) {
            return null;
        }

        const heroes = storage.get('player').heroes;
        const heroesList = this._renderHeroList(heroes, this.props.updatePlayerHandler, this.props.createButton);

        return (
            <Jumbo
                title={dictionary.heroesListTitle}
                controls={heroesList}
            />
        );
    }
}

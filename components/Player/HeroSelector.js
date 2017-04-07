import React from 'react';
import {Card} from 'antd';
import HeroList from 'Hero/HeroList';
import dictionary from 'Player/Dictionary';
import * as storage from 'services/localStorage';

export default class HeroSelector extends React.Component {

    _renderHeroList(heroes, updatePlayer, button) {
        return (
            <div>
                <HeroList heroes={heroes} updatePlayer={updatePlayer}/>
                {button}
            </div>
        )
    }

    render() {
        if (!this.props.show || !this.props.player) {
            return null;
        }

        const heroes = storage.get('player').heroes;
        const HeroesList = this._renderHeroList(heroes, this.props.updatePlayerHandler, this.props.createButton);

        return (
            <Card title={dictionary.heroesListTitle} style={{ width: 500 }}>
                <HeroList heroes={heroes} updatePlayer={this.props.updatePlayerHandler}/>
            </Card>
        );
    }
}

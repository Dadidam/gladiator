import React from 'react';
import {Card} from 'antd';
import HeroList from 'Hero/HeroList';
import dictionary from 'Player/Dictionary';
import * as storage from 'services/localStorage';

export default class HeroSelector extends React.Component {
    render() {
        if (!this.props.show || !this.props.player) {
            return null;
        }

        const heroes = storage.get('player').heroes;

        return (
            <Card title={dictionary.heroesListTitle} style={{ width: 500 }}>
                <HeroList heroes={heroes} updatePlayer={this.props.updatePlayerHandler}/>
                {this.props.createButton}
            </Card>
        );
    }
}

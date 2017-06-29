import React from 'react';
import { Card } from 'antd';
import HeroList from 'Hero/HeroList';
import dictionary from 'Player/Dictionary';


class HeroSelector extends React.Component {
    render() {
        if (!this.props.show || !this.props.player) {
            return null;
        }

        return (
            <Card
                title={dictionary.heroesListTitle}
                style={{ width: 500 }}
            >
                <HeroList
                    playerStore={this.props.playerStore}
                />
                {this.props.createButton}
            </Card>
        );
    }
}

export default HeroSelector;

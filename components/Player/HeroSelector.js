import React from 'react';
import { Card } from 'antd';
import HeroList from 'Hero/HeroList';
import { connect } from 'react-redux';
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
                <HeroList />
                {this.props.createButton}
            </Card>
        );
    }
}

const mapStateToProps = (state) => ({
    player: state.player
});

export default connect(mapStateToProps)(HeroSelector);

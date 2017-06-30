import React from 'react';
import Player from 'Player';
import { connect } from 'react-redux';


class ChangeHero extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.changeHero();
        this.props.updatePlayer(this.props.player);
    }

    renderPanel = () => {
        const isNew = !this.props.player;

        return <Player
            isNewPlayer={isNew}
            heroes={isNew ? undefined : this.props.player.heroes}
            playerStore={this.props.playerStore}
        />
    };

    render() {
        return !this.props.player || !this.props.player.activeHeroId ? this.renderPanel() : null;
    }
}

const mapStateToProps = (state) => {
    return {
        player: state.get('player'),
    }
};

const mapDispatchToProps = dispatch => ({
    updatePlayer: (player) => {
        player.activeHeroId = null;
        dispatch({type: 'UPDATE_PLAYER', player})
    },
    changeHero: () => dispatch({type: 'CHANGE_HERO'}),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeHero);

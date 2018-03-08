import React from 'react';
import Player from 'Player';
import { connect } from 'react-redux';
import { updatePlayer, changeHero } from '../../actions';


class ChangeHero extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.changeHero();
        if (this.props.player) {
            this.props.updatePlayer(this.props.player);
        }
    }

    renderPanel = () => {
        const isNew = !this.props.player;

        return <Player isNewPlayer={isNew} heroes={isNew ? undefined : this.props.player.heroes} />
    };

    render() {
        return !this.props.player || !this.props.player.activeHeroId ? this.renderPanel() : null;
    }
}

const mapStateToProps = (state) => ({
    hero: state.hero,
    player: state.player
});

const mapDispatchToProps = dispatch => ({
    updatePlayer: (player) => {
        player.activeHeroId = null;
        dispatch(updatePlayer(player));
    },
    changeHero: () => dispatch(changeHero()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeHero);

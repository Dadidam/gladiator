import React from 'react';
import Player from 'Player';


class ChangeHero extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.playerStore.changeHero();
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

export default ChangeHero;

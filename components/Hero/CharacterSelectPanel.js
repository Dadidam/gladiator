import React from 'react';
import Player from 'Player';

export default (props) => {
    const _renderPanel = () => {
        const isNew = !props.player;

        return <Player
            isNewPlayer={isNew}
            heroes={isNew ? undefined : props.player.heroes}
            updatePlayer={props.updateHandler}
        />
    };

    return !props.player || !props.player.activeHeroId ? _renderPanel() : null;
}

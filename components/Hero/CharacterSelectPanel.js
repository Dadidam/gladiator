import React from 'react';
import Player from 'Player';
import { Col } from 'react-bootstrap';

export default (props) => {
    const _renderPanel = () => {
        const isNew = !props.player;

        return (
            <div>
                <Col md={12}>
                    <Player
                        isNewPlayer={isNew}
                        heroes={isNew ? undefined : props.player.heroes}
                        updatePlayer={props.updateHandler}
                    />
                </Col>
            </div>
        )
    };

    return !props.player || !props.player.activeHeroId ? _renderPanel() : null;
}

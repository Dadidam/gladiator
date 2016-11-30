import React from 'react';
import { Col } from 'react-bootstrap';
import Player from 'Player';

export default (props) => {

    const _renderHeroList = () => {
        return (
            <div>
                <Col md={12}>
                    <Player heroes={props.player.heroes} updatePlayer={props.updateHandler} />
                </Col>
            </div>
        )
    };

    return props.player ? _renderHeroList() : null;
}

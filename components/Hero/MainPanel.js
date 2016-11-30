import React from 'react';
import Arena from 'Arena';
import Hero from 'Hero/Main';
import { Col } from 'react-bootstrap';

import { getHeroById } from 'services/player';

export default (props) => {
    const _renderMainPanel = () => {
        const hero = getHeroById(props.player.heroes, props.player.activeHeroId);

        return (
            <div>
                <Col md={3}>
                    <Hero params={hero} changeHero={props.changeHero} updateHero={props.updateHero} />
                </Col>
                <Col md={6}>
                    <Arena hero={hero} updateHero={props.updateHero} />
                </Col>
            </div>
        )
    };

    return props.player && props.player.activeHeroId ? _renderMainPanel() : null
}

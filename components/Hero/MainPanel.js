import React from 'react';
import Arena from '../../components/Arena';
import Hero from '../../components/Hero/Hero';
import { Col } from 'react-bootstrap';

import * as playerService from '../../services/player';

export default (props) => {
    const _renderMainPanel = () => {
        const hero = playerService.getHeroById(props.player.heroes, props.player.activeHeroId);

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

import React from 'react';
import { Button, Grid, Row, Col } from 'react-bootstrap';

import * as storage from '../../services/localStorage';

class HeroList extends React.Component {
    constructor() {
        super();
        this.player = storage.get('player');
    }
    selectHero(id, updatePlayer) {
        this.player.activeHeroId = id;
        storage.set('player', this.player);
        updatePlayer(this.player);
    }
    render() {
        const heroStyle = {
            marginBottom: 10
        };
        const btnStyle = {
            marginLeft: 5
        };
        const heroes = this.props.heroes.map( hero => {
            return <div key={hero.id} style={heroStyle}>
                <b>{hero.name}</b> ({hero.exp} lvl)
                <Button bsSize="xsmall" bsStyle="primary" style={btnStyle} value={hero}
                        onClick={this.selectHero.bind(this, hero.id, this.props.updatePlayer)}>select</Button>
            </div>
        });

        return (
            <div>
                <Grid>
                    <Row className="show-grid">
                        <div>{heroes}</div>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default HeroList

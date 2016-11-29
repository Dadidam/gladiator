import React from 'react';
import { Button, Grid, Row } from 'react-bootstrap';

import * as storage from '../../services/localStorage';

export default class HeroList extends React.Component {

    constructor() {
        super();

        this.player = storage.get('player');
    }

    selectHero(id, updatePlayer) {
        this.player.activeHeroId = id;

        storage.set('player', this.player);

        updatePlayer(this.player);
    }

    _createHeroesList(heroes) {
        const result = heroes.map(hero => {
            return (
                <div
                    key={hero.id}
                    style={{ marginBottom: 10 }}
                >
                    <b>{hero.name}</b>{' '}
                    ({hero.exp} lvl)
                    <Button
                        bsSize="xsmall"
                        bsStyle="primary"
                        style={{ marginLeft: 5 }}
                        value={hero}
                        onClick={this.selectHero.bind(this, hero.id, this.props.updatePlayer)}
                    >
                        select
                    </Button>
                </div>
            )
        });

        return result;
    }

    render() {
        const heroes = this._createHeroesList(this.props.heroes);

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

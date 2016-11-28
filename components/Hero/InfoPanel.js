import React from 'react';
import { ProgressBar, Badge, Tooltip, OverlayTrigger } from 'react-bootstrap';

export default class InfoPanel extends React.Component {

    _setHealthBarType(healthValue) {
        if (healthValue > 69) {
            return 'success';
        } else if (healthValue > 29) {
            return 'warning';
        }

        return 'danger';
    }

    render() {
        const hero = this.props.hero;
        const hp = Math.round((hero.health / hero.maxHealth) * 100);

        const hpTooltip = (
            <Tooltip id="tooltip">{`${hero.health}/${hero.maxHealth} (${hp}%)`}</Tooltip>
        );

        const healthBar = this._setHealthBarType(hp);

        return (
            <div>
                <h3>{hero.name}</h3>
                <div>{hero.level} level, {hero.exp} exp</div>
                <div style={{ width: 150 }}>HP (+1/sec):</div>
                <div style={{ width: 150 }}>
                    <div>
                        <OverlayTrigger placement="right" overlay={hpTooltip}>
                            <ProgressBar bsStyle={healthBar} now={hp} style={{ backgroundColor: '#eee'}} />
                        </OverlayTrigger>
                    </div>
                </div>
                <div>Damage <Badge>{hero.minDamage}-{hero.maxDamage}</Badge></div>
                <div>Coins <Badge>{hero.coins}</Badge></div>
                <div><a href="#" onClick={this.props.handleInventory}>Inventory</a> <Badge>{hero.inventory.length}</Badge></div>
                <div><a href="#" onClick={this.props.handleChangeHero}>Exit</a></div>
            </div>
        );
    }
}

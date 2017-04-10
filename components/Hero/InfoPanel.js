import React from 'react';
import {Badge, Progress, Tooltip} from 'antd';

export default class InfoPanel extends React.Component {
    _createHpTooltip(hero, hp) {
        return `${hero.health}/${hero.maxHealth} (${hp}%)`;
    }

    render() {
        const hero = this.props.hero;
        const hp = Math.round((hero.health / hero.maxHealth) * 100);
        const healthTooltip = this._createHpTooltip(hero, hp);

        return (
            <div>
                <h3>{hero.name}</h3>
                <div>
                    {hero.level} level, {hero.exp} exp
                </div>
                <div style={{width: 150}}>HP (+1/sec):</div>
                <div style={{width: 150}}>
                    <div>
                        <Tooltip placement="right" title={healthTooltip}>

                            <Progress
                                percent={hp}
                                strokeWidth={5}
                                showInfo={false}
                                status="exception"
                            />
                        </Tooltip>
                    </div>
                </div>
                <div>Damage{' '}
                    <Badge count={`${hero.minDamage}-${hero.maxDamage}`}/>
                </div>
                <div>Coins{' '}
                    <Badge
                        showZero={true}
                        count={hero.coins}
                        style={{backgroundColor: '#ffbf00'}}
                    />
                </div>
                <div>
                    <a href="#" onClick={this.props.handleInventory}>Inventory</a>
                    {' '}
                    <Badge
                        showZero={true}
                        count={hero.inventory.length}
                        style={{backgroundColor: '#d9d9d9'}}
                    />
                </div>
            </div>
        );
    }
}

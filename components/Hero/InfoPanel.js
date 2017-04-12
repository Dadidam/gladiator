import React from 'react';
import {Badge, Progress, Tooltip, Icon} from 'antd';

export default class InfoPanel extends React.Component {
    _createHpTooltip(hero, hp) {
        return `${hero.health}/${hero.maxHealth} (${hp}%)`;
    }

    render() {
        const hero = this.props.hero;

        if (!hero) {
            return null;
        }

        const hp = Math.round((hero.health / hero.maxHealth) * 100);
        const healthTooltip = this._createHpTooltip(hero, hp);

        return (
            <div className="infoPanel">
                <h3><Icon type="user" className="heroIcon" />{hero.name}</h3>
                <div className="heroLevel">
                    {hero.level} level, {hero.exp} exp
                </div>
                <div>
                    <Icon type="heart" className="heroIcon" />HP (+1/3sec):
                    <Tooltip placement="right" title={healthTooltip}>
                        <Progress
                            percent={hp}
                            strokeWidth={5}
                            showInfo={false}
                            status="exception"
                        />
                    </Tooltip>
                </div>
                <div>
                    <Icon type="shrink" className="heroIcon" />Damage{' '}
                    <Badge count={`${hero.minDamage}-${hero.maxDamage}`}/>
                </div>
                <div>
                    <Icon type="copyright" className="heroIcon" />Coins{' '}
                    <Badge
                        showZero={true}
                        count={hero.coins}
                        style={{backgroundColor: '#ffbf00'}}
                    />
                </div>
                <div>
                    <Icon type="skin" className="heroIcon" />
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

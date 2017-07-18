import React from 'react';
import { connect } from 'react-redux';
import {Badge, Progress, Tooltip, Icon} from 'antd';

class InfoPanel extends React.Component {
    constructor(props) {
        super(props);

        this.hero = props.hero;
    }

    componentWillReceiveProps(nextProps) {
        this.hero = nextProps.hero;
    }

    _createHpTooltip(hero, hp) {
        return `${hero.health}/${hero.maxHealth} (${hp}%)`;
    }

    render() {
        if (!this.hero) {
            return null;
        }

        const hp = Math.round((this.hero.health / this.hero.maxHealth) * 100);
        const healthTooltip = this._createHpTooltip(this.hero, hp);

        return (
            <div className="infoPanel">
                <h3><Icon type="user" className="heroIcon" />{this.hero.name}</h3>
                <div className="heroLevel">
                    {this.hero.level} level, {this.hero.exp} exp
                </div>
                <div>
                    Arena rank: <b>{this.hero.rank}</b>
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
                    <Badge count={`${this.hero.minDamage}-${this.hero.maxDamage}`}/>
                </div>
                <div>
                    <Icon type="copyright" className="heroIcon" />Coins{' '}
                    <Badge
                        showZero={true}
                        count={this.hero.coins}
                        overflowCount={9999}
                        style={{backgroundColor: '#ffbf00'}}
                    />
                </div>
                <div>
                    <Icon type="skin" className="heroIcon" />
                    {this.hero.inventory.length ?
                        <a href="#" onClick={this.props.handleInventory}>Inventory</a> : 'Inventory'
                    }
                    {' '}
                    <Badge
                        showZero={true}
                        count={this.hero.inventory.length}
                        style={{backgroundColor: '#d9d9d9'}}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    hero: state.hero
});

export default connect(mapStateToProps)(InfoPanel);

import React from 'react';
import Fight from './Fight/Fight';
import { fighters } from 'dictionary/arena';
import Character from './Character';
import { Table, Button, Tooltip, message } from 'antd';


class Arena extends React.Component {
    constructor(props) {
        super(props);

        this.hero = props.hero;
        this.updateHero = props.playerStore.updateHero;

        this.state = {
            fight: false,
            playerHero: null,
            opponent: null
        };
    }

    componentWillReceiveProps(nextProps) {
        this.hero = nextProps.hero;
    };

    render() {
        if (!this.hero) {
            return null;
        }

        if (this.state.fight) {
            return <Fight
                        leaveArena={this.leaveArena}
                        playerHero={this.state.playerHero}
                        playerOpponent={this.state.opponent}
            />
        }

        const cols = this.getTableColumns();
        const data = this.getFightersByHeroRank();

        return <Table columns={cols} dataSource={data} pagination={false} />
    }

    leaveArena = (arenaHero) => {
        // TODO: get reward via playerStore
        
        this.hero.health = arenaHero.health;
        this.updateHero(this.hero);

        this.setState({
            fight: false,
            playerHero: null,
            opponent: null
        })
    };

    fight = params => {
        const playerHero = this.cloneCharacter(this.hero);
        const opponent = this.cloneCharacter(params);

        return <span>
            <Button type="primary" size="large" onClick={() => this.setState({fight: true, opponent, playerHero})}>Fight!</Button>
        </span>;
    };

    cloneCharacter = params => {
        const {name, health, maxHealth, minDamage, maxDamage} = params;

        return new Character(name, health, maxHealth, minDamage, maxDamage);
    };

    getTableColumns = () => {
        return [{
            title: 'Fighter name',
            dataIndex: 'character',
            key: 'character',
            render: params => this.fight(params)
        },{
            title: 'Reward',
            dataIndex: 'textReward',
            key: 'textReward',
        }];
    };

    getFightersByHeroRank = () => {
        const rank = this.hero.rank;

        return fighters.filter((fighter) => {
            return rank >= fighter.minRank;
        })
    };
}

export default Arena;

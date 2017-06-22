import React from 'react';
import Fight from './Fight/Fight';
import { resultEnum } from './Fight/resultEnum';
import { fighters } from '../dictionary/arena';
import Character from './Character';
import { Table, Button, message } from 'antd';


class Arena extends React.Component {
    constructor(props) {
        super(props);

        this.hero = props.hero;
        this.playerStore = props.playerStore;

        this.setInitialState();
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

    setInitialState = () => {
        this.state = {
            fight: false,
            playerHero: null,
            opponent: null,
            reward: null
        };
    };

    leaveArena = (arenaHero, fightResult) => {
        const duration = 3;

        if (fightResult === resultEnum.playerWin) {
            this.playerStore.addExp(this.state.reward.exp, this.hero);
            this.playerStore.addCoins(this.state.reward.coins, this.hero);
            this.playerStore.addArenaRank(this.state.reward.rank, this.hero);

            message.success('You won at the arena battle and get some reward', duration);
        } else if (fightResult === resultEnum.playerLoose) {
            const negativeRank = -this.state.reward.rank;

            this.playerStore.addArenaRank(negativeRank, this.hero);

            message.error('You couldn\'t win at the arena and lost some rank points :(', duration);
        } else if (fightResult === resultEnum.draw) {
            message.warning('You and your opponent finished this battle with the draw result', duration);
        }

        this.playerStore.setHp(arenaHero.health, this.hero);
        this.setInitialState();
    };

    fight = params => {
        const playerHero = this.cloneCharacter(this.hero);
        const opponent = this.cloneCharacter(params);

        return <span>
            <Button type="primary" size="large" onClick={() => this.setState({fight: true, opponent, playerHero, reward: params.reward})}>Fight!</Button>
        </span>;
    };

    cloneCharacter = params => {
        const {name, health, maxHealth, minDamage, maxDamage} = params;

        return new Character(name, health, maxHealth, minDamage, maxDamage);
    };

    getTableColumns = () => {
        return [{
            title: 'Fighter name',
            dataIndex: 'character.name',
            key: 'character.name'
        },{
            title: 'Action',
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

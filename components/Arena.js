import React from 'react';
import Fight from './Fight/Fight';
import { resultEnum } from './Fight/resultEnum';
import { fighters } from 'dictionary/arena';
import character from './Character';
import { Table, Button, message } from 'antd';
import { connect } from 'react-redux';
import {
  addExp,
  addCoins,
  addArenaPoints,
  setHp,
  startBattle,
  finishBattle
} from '../actions';

class Arena extends React.Component {
  constructor(props) {
    super(props);
    this.hero = props.hero;
    this.setInitialState();
  }

  componentWillReceiveProps(nextProps) {
    this.hero = nextProps.hero;
  }

  render() {
    if (!this.hero) {
      return null;
    }

    if (this.state.fight) {
      return (
        <Fight
          leaveArena={this.leaveArena}
          playerHero={this.state.playerHero}
          playerOpponent={this.state.opponent}
          battleCallback={this.props.finishBattle}
        />
      );
    }

    const cols = this.getTableColumns();
    const data = this.getFightersByHeroRank();

    return <Table columns={cols} dataSource={data} pagination={false} />;
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
      this.props.addExp(this.state.reward.exp, this.hero);
      this.props.addCoins(this.state.reward.coins, this.hero);
      this.props.addArenaPoints(this.state.reward.rank, this.hero);

      message.success(
        'You won at the arena battle and get some reward',
        duration
      );
    } else if (fightResult === resultEnum.playerLoose) {
      const negativeRank = -this.state.reward.rank;

      this.props.addArenaPoints(negativeRank, this.hero);

      message.error(
        "You couldn't win at the arena and lost some rank points :(",
        duration
      );
    } else if (fightResult === resultEnum.draw) {
      message.warning(
        'This battle was finished with the draw result',
        duration
      );
    }

    this.props.setHp(arenaHero.health, this.hero);
    this.setInitialState();
  };

  fight = params => {
    const playerHero = { ...character, ...this.hero };
    const opponent = { ...character, ...params };

    return (
      <span>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            this.props.startBattle();
            this.setState({
              fight: true,
              opponent,
              playerHero,
              reward: params.reward
            });
          }}
        >
          Fight!
        </Button>
      </span>
    );
  };

  getTableColumns = () => {
    return [
      {
        title: 'Fighter name',
        dataIndex: 'character.name',
        key: 'character.name'
      },
      {
        title: 'Action',
        dataIndex: 'character',
        key: 'character',
        render: params => this.fight(params)
      },
      {
        title: 'Reward',
        dataIndex: 'textReward',
        key: 'textReward'
      }
    ];
  };

  getFightersByHeroRank = () => {
    const rank = this.hero.rank;

    return fighters.filter(fighter => {
      return rank >= fighter.minRank;
    });
  };
}

const mapStateToProps = ({ hero }) => ({
  hero
});

const mapDispatchToProps = dispatch => ({
  addExp: (exp, hero) => dispatch(addExp(exp, hero)),
  addCoins: (coins, hero) => dispatch(addCoins(coins, hero)),
  addArenaPoints: (points, hero) => dispatch(addArenaPoints(points, hero)),
  setHp: (hp, hero) => dispatch(setHp(hp, hero)),
  startBattle: () => dispatch(startBattle()),
  finishBattle: () => dispatch(finishBattle())
});

export default connect(mapStateToProps, mapDispatchToProps)(Arena);

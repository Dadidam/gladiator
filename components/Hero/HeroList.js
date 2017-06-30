import React from 'react';
import { Button, Table } from 'antd';
import { connect } from 'react-redux';
import { columns } from './heroListTableColumns';


class HeroList extends React.Component {
    constructor(props) {
        super(props);

        this.player = this.props.player;
        this.updatePlayer = this.props.updatePlayer;
    }

    selectHero = id => {
        this.player.activeHeroId = id;
        this.updatePlayer(this.player);
        this.props.changeHero(id);
        this.props.updateCurrentTab();
    };

    createHeroesList = heroes => {
        return heroes.map(hero => {
            const heroLvl = this.props.playerStore.getHeroLevel(hero);

            return {
                key: hero.id,
                name: hero.name,
                level: heroLvl,
                actions: <Button type="primary" size="small" onClick={this.selectHero.bind(
                    this, hero.id
                )}>
                    select
                </Button>
            };
        });
    };

    render() {
        const heroes = this.createHeroesList(this.player.heroes);

        return <Table columns={columns} dataSource={heroes} size="middle" pagination={false} />;
    }
}

const mapStateToProps = (state) => {
    return {
        player: state.get('player'),
    }
};

const mapDispatchToProps = dispatch => ({
    changeHero: (heroId) => dispatch({type: 'CHANGE_HERO', heroId}),
    updateCurrentTab: () => dispatch({type: 'CHANGE_TAB', tab: 1}),
    updatePlayer: (player) => dispatch({type: 'UPDATE_PLAYER', player}),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeroList);

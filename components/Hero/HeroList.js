import React from 'react';
import { Button, Table } from 'antd';
import { connect } from 'react-redux';
import tabs from 'components/mainMenuTabs';
import { columns } from './heroListTableColumns';


class HeroList extends React.Component {
    constructor(props) {
        super(props);

        this.player = props.playerStore.player;
        this.updatePlayer = props.playerStore.updatePlayer;
    }

    selectHero = id => {
        this.player.activeHeroId = id;
        this.updatePlayer(this.player);
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

const mapDispatchToProps = dispatch => ({
    updateCurrentTab: (tab) => dispatch({type: 'CHANGE_TAB', tab: 1}),
});

export default connect(null, mapDispatchToProps)(HeroList);

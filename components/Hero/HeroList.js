import React from 'react';
import { Button, Table } from 'antd';
import tabs from '../mainMenuTabs';
import { columns } from './heroListTableColumns';


class HeroList extends React.Component {
    constructor(props) {
        super(props);

        this.player = props.playerStore.player;
        this.updatePlayer = props.playerStore.updatePlayer;
        this.updateTab = props.updateTab;
    }

    selectHero = id => {
        this.player.activeHeroId = id;
        this.updatePlayer(this.player);
        this.updateTab(tabs.quests);
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

export default HeroList;

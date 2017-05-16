import React from 'react';
import { Button, Table } from 'antd';
import tabs from 'components/mainMenuTabs';

import * as storage from 'services/localStorage';


class HeroList extends React.Component {

    constructor() {
        super();

        this.player = storage.get('player');
        this.columns = [{
            title: 'Name',
            dataIndex: 'name',
        }, {
            title: 'Level',
            dataIndex: 'level',
        }, {
            title: 'Actions',
            dataIndex: 'actions',
        }];
    }

    selectHero(id, updatePlayer, updateMenuTab) {
        this.player.activeHeroId = id;

        storage.set('player', this.player);

        updateMenuTab(tabs.quests);
        updatePlayer(this.player);
    }

    _createHeroesList(heroes) {
        return heroes.map(hero => {
            const heroLvl = this.props.playerStore.getHeroLevel(hero);

            return {
                key: hero.id,
                name: hero.name,
                level: heroLvl,
                actions: <Button type="primary" size="small" onClick={this.selectHero.bind(
                    this, hero.id,
                    this.props.updatePlayer,
                    this.props.tabUpdateHandler
                )}>
                    select
                </Button>
            };
        });
    }

    render() {
        const heroes = this._createHeroesList(this.props.heroes);

        return <Table columns={this.columns} dataSource={heroes} size="middle" pagination={false} />;
    }
}

export default HeroList;

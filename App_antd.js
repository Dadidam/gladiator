import React from 'react';
import Hero from 'Hero/Main';
import { getHeroById } from 'services/player';
import { Layout, Menu, Icon, Badge } from 'antd';
import CharacterSelectPanel from './components/Hero/CharacterSelectPanel';

import * as storage from './services/localStorage';
import * as playerService from './services/player';

import './index.less';

const { Header, Content, Footer, Sider } = Layout;

export default class App extends React.Component {
    constructor() {
        super();

        this.state = {
            player: storage.get('player')
        };

        this.updatePlayer = this.updatePlayer.bind(this);
        this.changeHero = this.changeHero.bind(this);
        this.updateHero = this.updateHero.bind(this);
    }

    render() {
        const player = this.state.player;
        const hasActiveHero = player && player.activeHeroId;
        const hero = player ? getHeroById(player.heroes, player.activeHeroId) : undefined;

        return(
            <Layout>
                <Header className="header">
                    <div className="logo">
                        <h5>Gladiator Game</h5>
                    </div>
                    {hasActiveHero ?
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['1']}
                            className="appMenu"
                            onClick={this.mainMenuClickHandler}
                        >
                            <Menu.Item key="1">
                                <Icon type="flag" />Arena
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="key" />Quests
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="shop" />Shop
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Icon type="logout" />Change hero
                            </Menu.Item>
                        </Menu>
                        : null
                    }
                </Header>
                <Content className="appContent">
                    <Layout className="appLayout whiteBg">
                        {hasActiveHero ?
                            <Sider width={200} className="whiteBg">
                                <Hero params={hero} changeHero={this.changeHero} updateHero={this.updateHero} />
                            </Sider>
                            : null
                        }
                        <Content className="contentSelectPanel">
                            <CharacterSelectPanel
                                player={player}
                                updateHandler={this.updatePlayer}
                            />
                        </Content>
                    </Layout>
                </Content>
                <Footer className="center">
                    Gladiator Game ©2016-2017 Created by <a href="https://github.com/Dadidam/gladiator" target="_blank">Ilya Vorontsov</a>
                </Footer>
            </Layout>
        )
    }

    updatePlayer = (player) => {
        this.setState({player: player});
    };

    updateHero = (hero) => {
        const updatedPlayer = playerService.updatePlayerModelByHero(this.state.player, hero);

        storage.set('player', updatedPlayer);

        this.setState({player: updatedPlayer});
    };

    changeHero = () => {
        const player = this.state.player;
        player.activeHeroId = null;

        storage.set('player', player);

        this.setState({player: player});
    };

    mainMenuClickHandler = (item) => {
        switch (item.key) {
            case '1':
                break;
            case '2':
                break;
            case '3':
                break;
            case '4':
                this.changeHero();
        }
    };
}

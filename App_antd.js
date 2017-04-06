import React from 'react';
import Hero from 'Hero/Main';
import { getHeroById } from 'services/player';
import { Layout, Menu, Icon, Badge } from 'antd';
import CharacterSelectPanel from './components/Hero/CharacterSelectPanel';

import * as storage from './services/localStorage';
import * as playerService from './services/player';

import './index.less';

const { SubMenu } = Menu;
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
                            style={{ lineHeight: '64px' }}
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
                <Content style={{ padding: '20px 50px 0 50px' }}>
                    <Layout style={{ padding: '24px 0', background: '#fff' }}>
                        {hasActiveHero ?
                            <Sider width={200} style={{ background: '#fff' }}>
                                <Hero params={hero} changeHero={this.changeHero} updateHero={this.updateHero} />
                                <Menu
                                    mode="inline"
                                    defaultSelectedKeys={['1']}
                                    defaultOpenKeys={['sub1']}
                                    style={{ height: '100%' }}
                                >
                                    <SubMenu key="sub1" title={<span><Icon type="user" />Hero</span>}>
                                        <Menu.Item key="1">
                                            <Icon type="skin" />inventory
                                        </Menu.Item>
                                        <Menu.Item key="2">option2</Menu.Item>
                                        <Menu.Item key="3">option3</Menu.Item>
                                        <Menu.Item key="4">option4</Menu.Item>
                                    </SubMenu>
                                    <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
                                        <Menu.Item key="5">option5</Menu.Item>
                                        <Menu.Item key="6">option6</Menu.Item>
                                        <Menu.Item key="7">option7</Menu.Item>
                                        <Menu.Item key="8">option8</Menu.Item>
                                    </SubMenu>
                                    <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
                                        <Menu.Item key="9">option9</Menu.Item>
                                        <Menu.Item key="10">option10</Menu.Item>
                                        <Menu.Item key="11">option11</Menu.Item>
                                        <Menu.Item key="12">option12</Menu.Item>
                                    </SubMenu>
                                </Menu>
                            </Sider>
                            : null
                        }
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>
                            <CharacterSelectPanel
                                player={player}
                                updateHandler={this.updatePlayer}
                            />
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
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

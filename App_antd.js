import React from 'react';
import { Layout } from 'antd';
import { observer } from 'mobx-react';

import Hero from 'Hero/Main';
import AppBody from './components/UI/Body';
import {getHeroById} from 'services/player';
import AppHeader from './components/UI/Header';
import AppFooter from './components/UI/Footer';

import * as storage from './services/localStorage';
import * as playerService from './services/player';

import './index.less';

const {Content, Header, Sider} = Layout;

@observer
export default class App extends React.Component {
    constructor() {
        super();

        this.state = {
            player: storage.get('player'),
        };

        this.updatePlayer = this.updatePlayer.bind(this);
        this.changeHero = this.changeHero.bind(this);
        this.updateHero = this.updateHero.bind(this);
    }

    render() {
        const player = this.state.player;
        const hasActiveHero = player && player.activeHeroId;
        const hero = player ? getHeroById(player.heroes, player.activeHeroId) : undefined;

        return (
            <Layout>
                <Header className="header">
                    <AppHeader
                        uiStore={this.props.uiStore}
                        showMainMenu={hasActiveHero}
                    />
                </Header>
                <Content className="appContent">
                    <Layout className="appLayout whiteBg">
                        {hasActiveHero ?
                            <Sider width={200} className="whiteBg leftPanel">
                                <Hero
                                    params={hero}
                                    changeHero={this.changeHero}
                                    updateHero={this.updateHero}
                                    appState={this.props.appState}
                                    playerStore={this.props.playerStore}
                                />
                            </Sider>
                            : null
                        }
                        <AppBody
                            hero={hero}
                            player={player}
                            uiStore={this.props.uiStore}
                            heroUpdateHandler={this.updateHero}
                            playerUpdateHandler={this.updatePlayer}
                        />
                    </Layout>
                </Content>
                <AppFooter />
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
}

import React from 'react';
import { Layout } from 'antd';
import { observer } from 'mobx-react';

import Hero from 'Hero/Main';
import AppBody from './components/UI/Body';
import {getHeroById} from 'services/player';
import AppHeader from './components/UI/Header';
import AppFooter from './components/UI/Footer';
import tabs from './components/mainMenuTabs';

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
            currentTab: storage.get('player') ? 1 : 4
        };

        this.updatePlayer = this.updatePlayer.bind(this);
        this.changeHero = this.changeHero.bind(this);
        this.updateHero = this.updateHero.bind(this);
        this.updateCurrentTab = this.updateCurrentTab.bind(this);
    }
	
	onReset = () => {
		this.props.appState.resetTimer();
	};

    appTest = () => {
        this.props.playerStore.changeLevel(999);
    };

    render() {
        const player = this.state.player;
        const hasActiveHero = player && player.activeHeroId;
        const hero = player ? getHeroById(player.heroes, player.activeHeroId) : undefined;

        return (
            <Layout>
                <Header className="header">
                    <AppHeader
                        showMainMenu={hasActiveHero}
                        mainMenuHandler={this.mainMenuClickHandler}
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
                            currentTab={this.state.currentTab}
                            heroUpdateHandler={this.updateHero}
                            playerUpdateHandler={this.updatePlayer}
                            tabUpdateHandler={this.updateCurrentTab}
                        />
                    </Layout>
					<button onClick={this.onReset}>
						Seconds passed: {this.props.appState.timer}
					</button>
                    <button onClick={this.appTest}>
                        Change level {this.props.playerStore.level}
                    </button>
                </Content>
                <AppFooter />
            </Layout>
        )
    }

    updatePlayer = (player) => {
        this.setState({player: player});
    };

    updateCurrentTab = (tab) => {
        this.setState({currentTab: tab});
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
                this.updateCurrentTab(tabs.quests);
                break;
            case '2':
                this.updateCurrentTab(tabs.arena);
                break;
            case '3':
                this.updateCurrentTab(tabs.shop);
                break;
            case '4':
                this.changeHero();
                this.updateCurrentTab(tabs.changeHero);
                break;
        }
    };
}

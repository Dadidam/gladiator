import React from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import * as storage from 'services/localStorage';

import Hero from 'Hero/Main';
import AppBody from './components/UI/Body';
import AppHeader from './components/UI/Header';
import AppFooter from './components/UI/Footer';

import './index.less';

const {Content, Header, Sider} = Layout;


class App extends React.Component {
    componentWillReceiveProps(nextProps) {
        let heroes = [];

        nextProps.player.heroes.forEach((char) => {
            const character = char.id === nextProps.hero.id ? nextProps.hero : char;
            heroes.push(character);
        });

        nextProps.player.heroes = heroes;
        storage.set('player', nextProps.player);
    }

    render() {
        const player = this.props.player;
        const hasActiveHero = player && player.activeHeroId;
        const hero = this.props.hero;

        return (
            <Layout>
                <Header className="header">
                    <AppHeader showMainMenu={hasActiveHero} />
                </Header>
                <Content className="appContent">
                    <Layout className="appLayout whiteBg">
                        {hasActiveHero ?
                            <Sider width={200} className="whiteBg leftPanel">
                                <Hero params={hero} />
                            </Sider>
                            : null
                        }
                        <AppBody
                            hero={hero}
                            player={player}
                            playerStore={this.props.playerStore}
                        />
                    </Layout>
                </Content>
                <AppFooter />
            </Layout>
        )
    }
}
const mapStateToProps = (state) => ({
    hero: state.hero,
    player: state.player
});

export default connect(mapStateToProps)(App);

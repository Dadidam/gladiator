import React from 'react';
import { Layout } from 'antd';
import { observer } from 'mobx-react';

import Hero from 'Hero/Main';
import AppBody from './components/UI/Body';
import AppHeader from './components/UI/Header';
import AppFooter from './components/UI/Footer';

import './index.less';

const {Content, Header, Sider} = Layout;


@observer
class App extends React.Component {
    render() {
        const player = this.props.playerStore.player;
        const hasActiveHero = player && player.activeHeroId;
        const hero = this.props.playerStore.getActiveHero();

        return (
            <Layout>
                <Header className="header">
                    <AppHeader showMainMenu={hasActiveHero} />
                </Header>
                <Content className="appContent">
                    <Layout className="appLayout whiteBg">
                        {hasActiveHero ?
                            <Sider width={200} className="whiteBg leftPanel">
                                <Hero
                                    params={hero}
                                    playerStore={this.props.playerStore}
                                />
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

export default App;

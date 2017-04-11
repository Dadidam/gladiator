import React from 'react';
import {Layout} from 'antd';
import tabs from 'components/mainMenuTabs';
import CharacterSelectPanel from 'components/Hero/CharacterSelectPanel';

const {Content} = Layout;

export default (props) => {
    return (
        <Content className="contentSelectPanel">
            <CharacterSelectPanel
                player={props.player}
                updateHandler={props.playerUpdateHandler}
            />
            {props.currentTab == tabs.arena ?
                <div>Arena</div> : null
            }
            {props.currentTab == tabs.quests ?
                <div>Quests</div> : null
            }
        </Content>
    )
}

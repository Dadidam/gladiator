import React from 'react';
import {Layout} from 'antd';
import Arena from 'components/Arena';
import CharacterSelectPanel from 'components/Hero/CharacterSelectPanel';

const {Content} = Layout;

const tabs = {
    1: Arena
};

const getTabContent = id => {
    const content = tabs[id];

    if (content) {
        return content;
    }

    return () => <div>No content for viewing</div>
};

export default (props) => {
    const TabContent = getTabContent(props.currentTab);

    return (
        <Content className="contentSelectPanel">
            <CharacterSelectPanel
                player={props.player}
                updateHandler={props.playerUpdateHandler}
            />
            <TabContent {...props} />
        </Content>
    )
}

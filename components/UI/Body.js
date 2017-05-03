import React from 'react';
import {Layout} from 'antd';
import { observer } from 'mobx-react';

import Shop from 'components/Shop';
import Arena from 'components/Arena';
import Quests from 'components/Quests';
import CharacterSelectPanel from 'components/Hero/CharacterSelectPanel';

const {Content} = Layout;

const tabs = {
    1: Quests,
    2: Arena,
    3: Shop,
    4: CharacterSelectPanel
};

const getTabContent = id => {
    const content = tabs[id];

    if (content) {
        return content;
    }

    return () => <div>No content for viewing</div>
};

@observer
//export default (props) => {
export default class AppBody extends React.Component {
	constructor(props) {
        super(props);
    }
	
	render() {
		let currentTab = this.props.hero ? this.props.currentTab : 4;

		const TabContent = getTabContent(currentTab);

		return (
			<Content className="contentSelectPanel">
				<TabContent {...this.props} />
			</Content>
		)
	}
}

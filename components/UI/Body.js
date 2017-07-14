import React from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';

import Shop from 'components/Shop';
import Arena from 'components/Arena';
import Quests from 'components/Quests';
import ChangeHero from 'components/Hero/ChangeHero';

const { Content } = Layout;

const tabs = {
    1: Quests,
    2: Arena,
    3: Shop,
    4: ChangeHero
};

const getTabContent = id => {
    const content = tabs[id];

    if (content) {
        return content;
    }

    return () => <div>No content for viewing</div>
};


class AppBody extends React.Component {
	constructor(props) {
        super(props);

        this.state = {
            hero: props.hero
        }
    }

    componentWillReceiveProps(nextProps) {
	    console.log('nextProps - ', nextProps);
        this.setState({
            hero: nextProps.hero
        })
    };

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

const mapStateToProps = (state) => ({
    currentTab: state.tab
});

export default connect(mapStateToProps)(AppBody);

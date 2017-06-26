import React from 'react';
import {Layout} from 'antd';
import { observer } from 'mobx-react';
import { connect } from 'react-redux';

import Shop from 'components/Shop';
import Arena from 'components/Arena';
import Quests from 'components/Quests';
import ChangeHero from 'components/Hero/ChangeHero';

const {Content} = Layout;

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


@observer
class AppBody extends React.Component {
	constructor(props) {
        super(props);

        this.state = {
            hero: props.hero
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            hero: nextProps.hero
        })
    };

	render() {
		let currentTab = this.props.hero ? this.props.uiStore.currentTab : 4;

		const TabContent = getTabContent(currentTab);

		return (
			<Content className="contentSelectPanel">
				<TabContent {...this.props} />
                <p>+{this.props.likes} - {this.props.dislikes}</p>
                <div>
                    <button onClick={this.props.like}>Like</button>
                    <button onClick={this.props.dislike}>Dislike</button>
                </div>
			</Content>
		)
	}
}

const mapStateToProps = (state) => {
    return {
        likes: state.get('likes'),
        dislikes: state.get('dislikes'),
    }
};

const mapDispatchToProps = dispatch => ({
    like: () => dispatch({type: 'ADD_LIKE'}),
    dislike: () => dispatch({type: 'ADD_DISLIKE'}),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppBody);

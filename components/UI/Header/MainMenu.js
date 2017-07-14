import React from 'react';
import { Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import { setActiveTab } from '../../../actions';

const menu = [{
    key: 1,
    icon: 'key',
    title: 'Quests'
},{
    key: 2,
    icon: 'flag',
    title: 'Arena'
},{
    key: 3,
    icon: 'shop',
    title: 'Shop'
},{
    key: 4,
    icon: 'logout',
    title: 'Change hero'
}];

class MainMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.show) {
            return null;
        }

        const menuItems = menu.map(item => {
            return <Menu.Item key={item.key}>
                <Icon type={item.icon} />{item.title}
            </Menu.Item>
        });

        return (
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                className="appMenu"
                onClick={this.props.changeTab}
            >
                {menuItems}
            </Menu>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    // changeTab: (tab) => dispatch({type: 'CHANGE_TAB', tab: Number(tab.key)}),
    changeTab: (tab) => dispatch(setActiveTab(Number(tab.key)))
});

export default connect(null, mapDispatchToProps)(MainMenu);
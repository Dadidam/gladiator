import React from 'react';
import { Menu, Icon } from 'antd';

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

export default (props) => {

    const _render = () => {
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
                onClick={props.mainMenuHandler}
            >
                {menuItems}
            </Menu>
        )
    };

    return props.show ? _render() : null;
}

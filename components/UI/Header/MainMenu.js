import React from 'react';
import { Menu, Icon } from 'antd';

export default (props) => {

    const _render = () => {
        return (
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                className="appMenu"
                onClick={props.mainMenuHandler}
            >
                <Menu.Item key="1">
                    <Icon type="flag" />Arena
                </Menu.Item>
                <Menu.Item key="2">
                    <Icon type="key" />Quests
                </Menu.Item>
                <Menu.Item key="3">
                    <Icon type="shop" />Shop
                </Menu.Item>
                <Menu.Item key="4">
                    <Icon type="logout" />Change hero
                </Menu.Item>
            </Menu>
        )
    };

    return props.show ? _render() : null;
}

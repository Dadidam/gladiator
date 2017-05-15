import React from 'react';
import Logo from './Header/Logo'
import MainMenu from './Header/MainMenu'

export default (props) => {
    return (
        <div>
            <Logo />
            <MainMenu
                uiStore={props.uiStore}
                show={props.showMainMenu}
            />
        </div>
    )
}

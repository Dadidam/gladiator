import React from 'react';
import Logo from './Header/Logo'
import MainMenu from './Header/MainMenu'

export default (props) => {
    return (
        <div>
            <Logo />
            <MainMenu
                show={props.showMainMenu}
                mainMenuHandler={props.mainMenuHandler}
            />
        </div>
    )
}

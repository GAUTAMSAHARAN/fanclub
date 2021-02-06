import React from 'react';
import '../styles/sidemenu/sidemenu.css';
import SideMenuOption from '../components/sidemenu/sidemenuOption';
import { Popup } from 'semantic-ui-react'
import CreateGroup from '../components/sidemenu/creategroup';
import ExploreOption from '../components/sidemenu/exploreoption';

const SideMenu = () => {
    return (
        <React.Fragment>
            <div className="sidemenu">
                <div className="sidemenu-home">
                    <SideMenuOption title="Home" />
                </div>
                <div className="line"></div>
                <div className="sidemenu-chatrooms">
                    <SideMenuOption title ="chatroom" />
                    <CreateGroup title = "Create a new group" />
                    <ExploreOption title ="explore public groups" />
                </div>
                <div className="line"></div>
                <div className="sidemenu-setting">
                    <i class="fas fa-cog"></i>
                </div>
            </div>
        </React.Fragment>
    )
}

export default SideMenu;
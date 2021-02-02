import React from 'react';
import '../../styles/sidemenu/sidemenu.css';
import SideMenuOption from './sidemenuoption';

const SideMenu = () => {
    return(
        <React.Fragment>
            <div className="sidemenu">
                <div className="sidemenu-home">
                    <SideMenuOption />
                </div>
                <div className="line"></div>
                <div className="sidemenu-chatrooms">
                <SideMenuOption />
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
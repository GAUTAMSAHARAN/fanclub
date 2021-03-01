import React from 'react';
import '../styles/sidemenu/sidemenu.css';
import SideMenuOption from '../components/sidemenu/sidemenuOption';
import { Popup } from 'semantic-ui-react'
import ExploreOption from '../components/sidemenu/exploreoption';
import Settings from '../components/sidemenu/setting';
import { Link } from "react-router-dom";
import Home from './home';
import { useSelector } from 'react-redux';
import GroupForm from '../components/forms/group';

const SideMenu = () => {
    const user = useSelector(state => state.userReducer.user)
    return (
        <React.Fragment>
            <div className="sidemenu">
                <div className="sidemenu-home">
                    <Home user={user} />
                </div>
                <div className="line"></div>
                <div className="sidemenu-chatrooms">
                    <Link to={{
                        pathname: `/fanclub/id`,
                    }}>
                        <SideMenuOption title="chatroom" />
                    </Link>

                    <GroupForm />

                    <Link to={{
                        pathname: `/fanclub/explore`,
                    }}>
                        <ExploreOption title="explore public groups" />
                    </Link>
                </div>
                <div className="line"></div>
                <div className="sidemenu-setting">
                    <Settings />
                </div>
            </div>
        </React.Fragment>
    )
}

export default SideMenu;
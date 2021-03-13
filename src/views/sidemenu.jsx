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
import ThemeChanger from '../components/sidemenu/theme';

const SideMenu = () => {
    const user = useSelector(state => state.userReducer.user)
    const userGruops = useSelector(state => state.groupReducer.currentUserGroups)

    const UserGroupList = () => {
        let groups = [];
        groups = userGruops.map((group) =>
            <Link to={{
                pathname: `/fanclub/groups/${group.id}`,
            }}
            >
                <SideMenuOption title={group.name} />
            </Link>
        )
        return (
            groups
        )
    }

    return (
        <React.Fragment>
            <div className="sidemenu">
                <div className="sidemenu-home">
                    <Home user={user} childComponent={<SideMenuOption title="Home" />} />
                </div>
                <div className="line"></div>
                <div className="sidemenu-chatrooms">

                    {UserGroupList()}

                    <GroupForm />

                    <Link to={{
                        pathname: `/fanclub/explore`,
                    }}>
                        <ExploreOption title="explore public groups" />
                    </Link>
                </div>
                <div className="line"></div>
                <div className="sidemenu-setting">
                    <ThemeChanger />
                    <Settings />
                </div>
            </div>
        </React.Fragment>
    )
}

export default SideMenu;
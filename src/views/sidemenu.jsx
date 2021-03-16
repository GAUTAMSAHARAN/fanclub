import React, {useState} from 'react';
import '../styles/sidemenu/sidemenu.css';
import SideMenuOption from '../components/sidemenu/sidemenuOption';
import ExploreOption from '../components/sidemenu/exploreoption';
import Settings from '../components/sidemenu/setting';
import { Link } from "react-router-dom";
import Home from './home';
import { useSelector } from 'react-redux';
import GroupForm from '../components/forms/group';
import ThemeChanger from '../components/sidemenu/theme';
import apiClient from '../config/apiClient'
import {get_bio} from '../config/urls'

const SideMenu = () => {
    const user = useSelector(state => state.userReducer.user)
    const userGruops = useSelector(state => state.groupReducer.currentUserGroups)
    const [bio, setBio] = useState({
        bio: '',
        phone_number: '',
        user: user.id,
        id: null,
    })

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

    const getUserBio = () => {
        let url = get_bio + `${user.pk}`;
        apiClient
            .get(url)
            .then(res => {
                setBio(res.data[0])
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <React.Fragment>
            <div className="sidemenu">
                <div className="sidemenu-home" onClick={getUserBio}>
                    <Home user={user} childComponent={<SideMenuOption title="Home" />} bio={bio} />
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
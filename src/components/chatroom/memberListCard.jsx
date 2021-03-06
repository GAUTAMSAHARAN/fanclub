import React, { useEffect, useState } from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from 'react-avatar';
import Home from '../../views/home';
import { Dropdown } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux';
import { makeMember, makeAdmin, currentGroupId } from '../../actions/groupAction';
import { get_bio } from '../../config/urls';
import apiClient from '../../config/apiClient';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: 'transparent',
        color: 'white',
    },
    nested: {
        paddingLeft: '15px',
    },
}));

const MemberListCard = ({user, admin}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const currentGroup = useSelector(state => state.groupReducer.currentGroup)
    const currentUserId = useSelector(state => state.userReducer._id)
    const userRole = useSelector(state => state.groupReducer.userRole)
    const [bio, setBio] = useState({
        bio: '',
        phone_number: '',
        user: user.id,
        id: null,
    })

    const makeMemberHandler = () => {
        let data = []
        currentGroup.members.map((member) =>
            data.push(member.id)
        )
        data.push(user.id)
        let set = new Set(data)
        data = Array.from(set)
        let data2 = []
        currentGroup.admins.map((admin) => {
            if (admin.id != user.id) {
                data2.push(admin.id)
            }
        })
        let set2 = new Set(data2)
        data2 = Array.from(set2)
        dispatch(makeMember({ member_array: data }, currentGroup.id, false))
        dispatch(makeAdmin({ admin_array: data2 }, currentGroup.id, true))
    }

    const makeAdminHandler = () => {
        let data = []
        currentGroup.admins.map((admin) =>
            data.push(admin.id)
        )
        data.push(user.id)
        let set = new Set(data)
        data = Array.from(set)
        let data2 = []
        currentGroup.members.map((member) => {
            if (member.id != user.id) {
                data2.push(member.id)
            }
        })
        let set2 = new Set(data2)
        data2 = Array.from(set2)
        dispatch(makeAdmin({ admin_array: data }, currentGroup.id, false))
        dispatch(makeMember({ member_array: data2 }, currentGroup.id, true))
    }

    const getUserBio = () => {
        let url = get_bio + `${user.id}`;
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
        <>
            <Dropdown
                pointing='right'
                className='item'
                icon={null}
                floating
                labeled
                button
                disabled={user.id == currentUserId ? true : false}
                inverted
                trigger={
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <Avatar size="30" classname="memberCardAvatar" name={user.username} />
                        </ListItemIcon>
                        <ListItemText primary={<Typography style={{ color: '#DCDDDE', fontFamily: 'Mukta, sans-serif' }}>{user.username}</Typography>} />
                        {user.id == currentGroup.creater ? <i class="fas fa-crown"></i> : ''}
                    </ListItem>
                }
            >
                <Dropdown.Menu className="dropdown-user-menu">
                    <Dropdown.Item className="dropdown-user-item" onClick={getUserBio}>
                        <Home
                            childComponent={
                                <span className="dropdown-profile-span">Profile</span>
                            }
                            user={user}
                            bio={bio}
                        />
                    </Dropdown.Item>
                    {(userRole.admin == true || userRole.creater == true) && admin == false
                        ?
                        <Dropdown.Item className="dropdown-user-item" onClick={() => makeAdminHandler()}>Make Admin</Dropdown.Item>
                        :
                        ''
                    }
                    {
                        userRole.creater == true && admin == true
                            ?
                            <Dropdown.Item className="dropdown-user-item" onClick={() => makeMemberHandler()}>Make Member</Dropdown.Item>
                            :
                            ''
                    }
                </Dropdown.Menu>
            </Dropdown>

        </>
    )
}

export default MemberListCard;
import React, { useEffect } from 'react';
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
import { getCurrentProfile } from '../../actions/userAction';

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

const MemberListCard = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const currentGroup = useSelector(state => state.groupReducer.currentGroup)
    const currentUserId = useSelector(state => state.userReducer._id)
    const userRole = useSelector(state => state.groupReducer.userRole)

    useEffect(() => {
        if (props.user.id != undefined) {
            dispatch(getCurrentProfile(props.user.id))
        }
    }, [props.user.id])

    const makeMemberHandler = () => {
        let data = []
        currentGroup.members.map((user) =>
            data.push(user.id)
        )
        data.push(props.user.id)
        let set = new Set(data)
        data = Array.from(set)
        let data2 = []
        currentGroup.admins.map((user) => {
            if (user.pk != props.user.pk) {
                data2.push(user.pk)
            }
        })
        let set2 = new Set(data)
        data2 = Array.from(set2)
        dispatch(makeMember({ member_array: data }, currentGroup.id, false))
        dispatch(makeAdmin({ admin_array: data2 }, currentGroup.id, true))
    }

    const makeAdminHandler = () => {
        let data = []
        currentGroup.admins.map((user) =>
            data.push(user.id)
        )
        data.push(props.user.id)
        let set = new Set(data)
        data = Array.from(set)
        let data2 = []
        currentGroup.members.map((user) => {
            if (user.id != props.user.id) {
                data2.push(user.id)
            }
        })
        let set2 = new Set(data2)
        data2 = Array.from(set2)
        dispatch(makeAdmin({ admin_array: data }, currentGroup.id, false))
        dispatch(makeMember({ member_array: data2 }, currentGroup.id, true))
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
                disabled={props.user.id == currentUserId ? true : false}
                inverted
                trigger={
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <Avatar size="30" classname="memberCardAvatar" name={props.user.username} />
                        </ListItemIcon>
                        <ListItemText primary={<Typography style={{ color: '#DCDDDE', fontFamily: 'Mukta, sans-serif' }}>{props.user.username}</Typography>} />
                        {props.user.id == currentGroup.creater ? <i class="fas fa-crown"></i> : ''}
                    </ListItem>
                }
            >
                <Dropdown.Menu className="dropdown-user-menu">
                    <Dropdown.Item className="dropdown-user-item">
                        <Home
                            childComponent={
                                <span className="dropdown-profile-span">Profile</span>
                            }
                            user={props.user}
                        />

                    </Dropdown.Item>
                    {(userRole.admin == true || userRole.creater == true) && props.admin == false
                        ?
                        <Dropdown.Item className="dropdown-user-item" onClick={() => makeAdminHandler()}>Make Admin</Dropdown.Item>
                        :
                        ''
                    }
                    {
                        userRole.creater == true && props.admin == true
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
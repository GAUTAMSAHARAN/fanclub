import React, { useEffect, useState } from 'react';
import '../../styles/chatroom/member.css';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import MemberListCard from './memberListCard';
import { useDispatch, useSelector } from 'react-redux';
import PlaceHolder from '../placeholder';

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

const Members = () => {
    const classes = useStyles();
    const group = useSelector(state => state.groupReducer.currentGroup)
    const [openOnline, setOpenOnline] = useState(true);
    const [openOffline, setOpenOffline] = useState(true);
    const currentGroupCreater = useSelector(state => state.groupReducer.currentGroupCreater)

    const handleOnlineClick = () => {
        setOpenOnline(!openOnline);
    };

    const handleOfflineClick = () => {
        setOpenOffline(!openOffline);
    }

    const AdminUserList = () => {
        let admin = [];
        if (group.length != 0) {
            admin = group.admins.map((user) =>
                <MemberListCard user={user} admin={true} />
            )
        }
        if(currentGroupCreater != null){
            admin.push(<MemberListCard user={currentGroupCreater} admin={true} />)
        }
        return (
            admin
        )
    }

    const MemberUserList = () => {
        let member = [];
        if (group.length == 0) {
            member = '';
        } else {
            member = group.members.map((user) =>
                <MemberListCard user={user} admin={false} />
            )
        }
        return (
            member
        )
    }

    return (
        <>
            {  group.length == 0 ?
                <PlaceHolder /> :
                <div className="members-box">
                    <List
                        component="nav"
                        className={classes.root}
                    >
                        <ListItem button onClick={handleOnlineClick}>
                            <ListItemText primary={<Typography style={{ color: '#8e9297', fontFamily: 'Mukta, sans-serif' }}>ADMIN-{group.admins.length + 1}</Typography>} />
                            {openOnline ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={openOnline} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {AdminUserList()}
                            </List>
                        </Collapse>
                        <ListItem button onClick={handleOfflineClick}>
                            <ListItemText primary={<Typography style={{ color: '#8e9297', fontFamily: 'Mukta, sans-serif' }}>MEMBERS-{group.members.length}</Typography>} />
                            {openOffline ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={openOffline} timeout="auto" unmountOnExit>
                            {MemberUserList()}
                        </Collapse>
                    </List>
                </div>
            }
        </>
    )
}

export default Members;
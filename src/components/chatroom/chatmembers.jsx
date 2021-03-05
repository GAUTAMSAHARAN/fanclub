import React, { useState } from 'react';
import '../../styles/chatroom/member.css';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography'; import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import FaceIcon from '@material-ui/icons/Face';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Popup } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'


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
    const [openOnline, setOpenOnline] = useState(true);
    const [openOffline, setOpenOffline] = useState(true);

    const handleOnlineClick = () => {
        setOpenOnline(!openOnline);
    };

    const handleOfflineClick = () => {
        setOpenOffline(!openOffline);
    }

    return (
        <>
            <div className="members-box">
                <List
                    component="nav"
                    className={classes.root}
                >
                    <ListItem button onClick={handleOnlineClick}>
                        <ListItemText primary={<Typography style={{ color: '#8e9297', fontFamily: 'Mukta, sans-serif' }}>ADMIN-2</Typography>} />
                        {openOnline ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openOnline} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <Popup
                                trigger={<ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <FaceIcon fontSize='large' color="secondary" />
                                    </ListItemIcon>
                                    <ListItemText primary={<Typography style={{ color: '#DCDDDE', fontFamily: 'Mukta, sans-serif' }}>KK_BHAI</Typography>} />
                                </ListItem>}
                                content={
                                    <div className="group-members-options">
                                        <Button className="member-options" content='Profile' primary />
                                        <Button className="member-options remove-member" content='Remove'  />
                                        <Button className="member-options create-admin" content='Admin'  />
                                    </div>
                                }
                                position='left center'
                                inverted
                                on='click'
                            />
                        </List>
                    </Collapse>
                    <ListItem button onClick={handleOfflineClick}>
                        <ListItemText primary={<Typography style={{ color: '#8e9297', fontFamily: 'Mukta, sans-serif' }}>MEMBERS-0</Typography>} />
                        {openOffline ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openOffline} timeout="auto" unmountOnExit>
                    </Collapse>
                </List>
            </div>
        </>
    )
}

export default Members;
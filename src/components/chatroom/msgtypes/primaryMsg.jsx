import React from 'react';
import '../../../styles/chatroom/msgtypes/primaryMsg.css';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
}));


const PrimaryMsg = () => {
    const classes = useStyles();
    return (
        <>
            <div className="primary-msg-container">
                <div className="primary-msg-avatar">
                    <div className={classes.root}>
                        <Avatar>H</Avatar>
                    </div>
                </div>
                <div className="primary-msg-content">
                    <div className="primary-userinfo">
                        <span className="primary-userinfo-name">saksham katariya</span>
                        <span className="primary-userinfo-date">11/26/2020</span>
                    </div>
                    <div className="primary-main-msg">
                        5
                </div>
                </div>
            </div>
        </>
    )
}

export default PrimaryMsg;
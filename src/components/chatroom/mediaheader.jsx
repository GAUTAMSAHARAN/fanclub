import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import '../../styles/chatroom/mediaheader.css';
import { Image } from 'semantic-ui-react'
import { useSelector } from 'react-redux';
import ImageView from '../chatroom/imageView';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
}));

const MediaHeader = () => {
    const classes = useStyles();
    const currentGroupMessages = useSelector(state => state.groupReducer.currentGroupMessages)

    const showMedia = () => {
        let count = 0;
        let media = currentGroupMessages.map((message) => {
            if (message.imageMsg != null) {
                count++;
                return <ImageView src={message.imageMsg} component = {<img className="media-image" src={message.imageMsg} />} />
            }
        })
        if(count == 0){
            return <p className="media-text">No Media has been shared yet.</p>
        }else{
            return (
                media
            )
        }
    }

    return (
        <>
            <div className={classes.root}>
                <AppBar position="static" className='media-header'>
                    <Toolbar variant="dense">
                        <Typography className={classes.title} variant="h6" noWrap>
                            Media-Files
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className="media-image-list">
                    {showMedia()}
                </div>
            </div>
        </>
    )
}

export default MediaHeader;
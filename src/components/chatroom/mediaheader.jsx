import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import '../../styles/chatroom/mediaheader.css';

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
            </div>
        </>
    )
}

export default MediaHeader;
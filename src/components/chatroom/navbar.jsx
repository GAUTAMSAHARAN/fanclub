import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import "../../styles/chatroom/chatroomnavbar.css";
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useDispatch, useSelector } from 'react-redux';
import { showMembers } from '../../actions/chatAction';
import EditGroupForm from '../forms/chatroom/editGroupInfo';
import DeleteIcon from '@material-ui/icons/Delete';
import AlertDialog from '../chatroom/msgtypes/deleteDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));


const ChatNavbar = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const group = useSelector(state => state.groupReducer.currentGroup)
  const currentUserId = useSelector(state => state.userReducer._id)

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static" className="chatroom-appbar">
          <Toolbar variant="dense">
            <Typography className={classes.title} variant="h6" noWrap>
              <i class="fas fa-hashtag"></i>  {group.name}
            </Typography>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <EditGroupForm group={group} />
            </IconButton>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <AddCircleIcon />
            </IconButton>
            {group.creater == currentUserId ?
              <IconButton
                aria-label="delete-group"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <AlertDialog childComponent={<DeleteIcon />}
                  group={true}
                />
              </IconButton>
              :
              ''
            }

          </Toolbar>
        </AppBar>
      </div>
    </>
  )
}

export default ChatNavbar;
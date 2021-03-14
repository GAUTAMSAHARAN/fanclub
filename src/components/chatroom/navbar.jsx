import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import "../../styles/chatroom/chatroomnavbar.css";
import { useDispatch, useSelector } from 'react-redux';
import EditGroupForm from '../forms/chatroom/editGroupInfo';
import DeleteIcon from '@material-ui/icons/Delete';
import AlertDialog from '../chatroom/msgtypes/deleteDialog';
import AddMembers from '../forms/chatroom/addMembers';

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
  const user = useSelector(state => state.userReducer.user)
  const userRole = useSelector(state => state.groupReducer.userRole)

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static" className="chatroom-appbar">
          <Toolbar variant="dense">
            <Typography className={classes.title} variant="h6" noWrap>
              <i class="fas fa-hashtag"></i>  {group.name}
            </Typography>
            {
              userRole.admin == true || userRole.creater == true 
              ?
                      <>
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
                        <AddMembers />
                      </IconButton>
                      </>
                      :
                      ''
            }
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
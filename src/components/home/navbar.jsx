import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import "../../styles/chatroom/chatroomnavbar.css";
import InboxIcon from "@material-ui/icons/Inbox";
import { Icon, Menu } from "semantic-ui-react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));

const HomeNavbar = () => {
  const [activeItem, setActiveItem] = useState("Home");

  const handleItemClick = (option) => {
    setActiveItem(option);
  };
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <AppBar position="static" className="chatroom-appbar">
          <Toolbar variant="dense" className="navbar-toolbar">
            <Menu secondary style={{ margin: "0" }} className="homeNavbar">
              <Menu.Item name="friends" text="Friends">
                <Icon name="users" className="fw-bold" />
                <span className="fw-bold">Friends</span>
              </Menu.Item>
              <Menu.Item
                name="All"
                active={activeItem === "All"}
                onClick={() => handleItemClick("All")}
              >
                <span>All</span>
              </Menu.Item>
              <Menu.Item
                name="Add Friend"
                active={activeItem === "Add Friend"}
                onClick={() => handleItemClick("Add Friend")}
              >
                <span>Add Friend</span>
              </Menu.Item>
            </Menu>

            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <InboxIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

export default HomeNavbar;

import React, { useState } from "react";
import { Menu, Icon, Input, Segment } from "semantic-ui-react";

const PrivateChannels = () => {
  const [activeItem, setActiveItem] = useState("Home");

  const handleItemClick = (option) => {
    setActiveItem(option);
  };
  return (
    <div
      className="privateChannels"
      style={{
        width: "240px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        padding: "1rem",
      }}
    >
      <Input
        size="mini"
        transparent
        className="searchInput w-100"
        placeholder="Find or start a conversation"
      />
      <div className="w-100 direct-message-heading fw-bold">
        DIRECT MESSAGES
      </div>
      <div className="overflow-scroll">
        <Menu secondary vertical>
          <Menu.Item
            name="Home"
            active={activeItem === "Home"}
            onClick={() => handleItemClick("Home")}
          >
            <Icon name="compass" />
            <span className="exploremenu-option">Home</span>
          </Menu.Item>
          <Menu.Item
            name="Movies"
            active={activeItem === "Movies"}
            onClick={() => handleItemClick("Movies")}
          >
            <Icon name="video" />
            <span className="exploremenu-option">Movies</span>
          </Menu.Item>
          <Menu.Item
            name="Coding"
            active={activeItem === "Coding"}
            onClick={() => handleItemClick("Coding")}
          >
            <Icon name="keyboard" />
            <span className="exploremenu-option">Coding</span>
          </Menu.Item>
          <Menu.Item
            name="Study"
            active={activeItem === "Study"}
            onClick={() => handleItemClick("Study")}
          >
            <Icon name="pencil alternate" />
            <span className="exploremenu-option">Study</span>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

export default PrivateChannels;

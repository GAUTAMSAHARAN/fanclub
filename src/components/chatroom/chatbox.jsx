import React from 'react';
import "../../styles/chatroom/chatbox.css";
import MsgInput from './msginput';
import PrimaryMsg from './msgtypes/primaryMsg';

const ChatBox = () => {
    return(
        <>
        <div className="chatbox-container">
            <div className="chatbox-message-container">
                <PrimaryMsg />
            </div>
            <div className="chatbox-input-container">
                <MsgInput />
            </div>
        </div>
        </>
    )
}

export default ChatBox;
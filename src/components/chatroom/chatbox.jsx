import React from 'react';
import "../../styles/chatroom/chatbox.css";
import MsgInput from './msginput';

const ChatBox = () => {
    return(
        <>
        <div className="chatbox-container">
            <div className="chatbox-message-container"></div>
            <div className="chatbox-input-container">
                <MsgInput />
            </div>
        </div>
        </>
    )
}

export default ChatBox;
import React from 'react';
import ChatBox from '../components/chatroom/chatbox';
import Members from '../components/chatroom/chatmembers';
import MediaHeader from '../components/chatroom/mediaheader';
import ChatNavbar from '../components/chatroom/navbar';
import "../styles/chatroom/chatroomlayout.css";

const Chatroom = () => {
    return (
        <>
        <div className="chatroom-layout">
            <div className="chatroom-media">
                <MediaHeader />
            </div>
            <div className="chatroom-chatbox">
                <div className="chatroom-navbar">
                    <ChatNavbar />
                </div>
                <div className="chatroom-main">
                    <div className="outer-chatbox">
                        <ChatBox />
                    </div>
                    <div className="outer-members">
                        <Members />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Chatroom;
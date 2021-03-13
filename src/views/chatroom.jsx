import React, {useEffect, useState} from 'react';
import ChatBox from '../components/chatroom/chatbox';
import Members from '../components/chatroom/chatmembers';
import MediaHeader from '../components/chatroom/mediaheader';
import ChatNavbar from '../components/chatroom/navbar';
import "../styles/chatroom/chatroomlayout.css";
import { useDispatch, useSelector } from 'react-redux';
import {getCurrentGroup, getCurrentGroupCreater} from '../actions/groupAction';
import WebSocketInstance from '../config/websocket';

const Chatroom = ({match}) => {
    const dispatch = useDispatch();
    const [id, setId ]= useState(parseInt(match.params.id))
    const group = useSelector(state => state.groupReducer.currentGroup)

    useEffect(() => {
        setId(parseInt(match.params.id))
    }, [match])

    useEffect(() => {
        dispatch(getCurrentGroup(id))
        dispatch(getCurrentGroupCreater(group.creater))
    }, [id])

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
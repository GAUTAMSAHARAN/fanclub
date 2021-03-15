import React, { Component, useEffect, useState } from 'react';
import "../../styles/chatroom/chatbox.css";
import PrimaryMsg from './msgtypes/primaryMsg';
import WebSocketInstance from '../../config/websocket';
import MsgInput from '../chatroom/msgInput';
import { useDispatch, useSelector } from 'react-redux';
import { currentGroupMessages, AddMessage } from '../../actions/groupAction';
import DateDivider from './msgtypes/date-divider';
import moment from 'moment';

const ChatBox = () => {
    const dispatch = useDispatch();
    const messages = useSelector(state => state.groupReducer.currentGroupMessages);
    const userId = useSelector(state => state.userReducer._id)
    const currentGroupId = useSelector(state => state.groupReducer.currentGroupId)
    const format = "YYYY-MM-DD"
    
    useEffect(() => {
        if(userId !== null && currentGroupId !== null){
            if(Boolean(WebSocketInstance) && WebSocketInstance.socketRef){
                WebSocketInstance.close();
            }
            WebSocketInstance.connect(`ws://localhost:8000/ws/chat/${currentGroupId}/${userId}`);
            waitForSocketConnection(() => {
                WebSocketInstance.initChatUser(userId);
                WebSocketInstance.addCallbacks(
                    setMessagesHandler,
                    addMessage,
                    addImageMessage,
                );
                WebSocketInstance.fetchMessages(userId);
            });
        }
    }, [currentGroupId, userId])

    const waitForSocketConnection = (callback) => {
        setTimeout(function () {
            // Check if websocket state is OPEN
            if (WebSocketInstance.state() === 1) {
                console.log("Connection is made");
                callback();
                return;
            } else {
                console.log("wait for connection...");
                waitForSocketConnection(callback);
            }
        }, 100); // wait 100 milisecond for the connection...
    }

    const addMessage = (message) => {
        dispatch(AddMessage(message))
    }

    const addImageMessage = (message) => {
        dispatch(AddMessage(message))
    }

    const setMessagesHandler = (messages) => {
        dispatch(
            currentGroupMessages(messages.reverse())
        )
    }

    const sendImageMessageHandler = (id) => {
        WebSocketInstance.newChatImageMessage(id, userId)
    }

    const sendMessageHandler = (message) => {
        const messageObject = {
            text: message.message,
        };
        WebSocketInstance.newChatMessage(messageObject, userId);
    };

    const showMessages = () => {
        let currentDate = '';
        let msg = messages.map((message) => {
            if (currentDate == '' || currentDate != JSON.stringify(moment(message.created_at).format(format))) {
                let date = JSON.stringify(moment(message.created_at).format(format))
                currentDate = date;
                return (
                    <>
                        <DateDivider date={moment(message.created_at).format(format)} />
                        <PrimaryMsg msg={message} />
                    </>
                )
            }
            return <PrimaryMsg msg={message} />;
        }
        )
        return (
            msg
        )
    }

    return (
        <>
            <div className="chatbox-container">
                <div className="chatbox-message-container">
                    {showMessages()}
                </div>
                <div className="chatbox-input-container">
                    <div className="msg-input">
                        <MsgInput parentMethod={sendMessageHandler} imageMethod={sendImageMessageHandler} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatBox;
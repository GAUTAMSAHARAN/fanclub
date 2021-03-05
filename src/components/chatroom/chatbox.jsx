import React, { Component, useEffect } from 'react';
import "../../styles/chatroom/chatbox.css";
import MsgInput from './msginput';
import PrimaryMsg from './msgtypes/primaryMsg';
import WebSocketInstance from '../../config/websocket';

export default class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            hide: false,
        };

        this.waitForSocketConnection(() => {
            WebSocketInstance.initChatUser();
            WebSocketInstance.addCallbacks(
                this.setMessages.bind(this),
                this.addMessage.bind(this)
            );
            WebSocketInstance.fetchMessages();
        });

        this.showMessages = this.showMessages.bind(this);
    }

    waitForSocketConnection(callback) {
        const component = this;
        setTimeout(function () {
            // Check if websocket state is OPEN
            if (WebSocketInstance.state() === 1) {
                console.log("Connection is made");
                callback();
                return;
            } else {
                console.log("wait for connection...");
                component.waitForSocketConnection(callback);
            }
        }, 100); // wait 100 milisecond for the connection...
    }

    addMessage(message) {
        this.setState({ messages: [message, ...this.state.messages] });
    }

    setMessages(messages) {
        this.setState({ messages: messages.reverse() });
    }

    messageChangeHandler = (event) => {
        this.setState({
            message: event.target.value,
        });
    };

    sendMessageHandler = (e, message) => {
        const messageObject = {
            text: message,
        };
        WebSocketInstance.newChatMessage(messageObject);
        this.setState({
            message: "",
        });
        e.preventDefault();
    };

    showMessages() {
        let messages = this.state.messages.map((message) =>
            <PrimaryMsg msg={message} />
        )
        return (
            messages
        )
    }


    render() {
        return (
            <>
                <div className="chatbox-container">
                    <div className="chatbox-message-container">
                        {this.showMessages()}
                    </div>
                    <div className="chatbox-input-container">
                        <MsgInput />
                    </div>
                </div>
            </>
        )
    }
}
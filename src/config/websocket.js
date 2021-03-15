
class WebSocketService {
    static instance = null;
    callbacks = {};

    static getInstance() {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }

    constructor() {
        this.socketRef = null;
    }

    connect(chatroom_url) {
        this.socketRef = new WebSocket(chatroom_url);
        this.socketRef.onopen = () => {
            console.log('websocket open');
        };
        this.socketRef.onmessage = e => {
            this.socketNewMessage(e.data);
        }
        this.socketRef.onerror = e => {
            console.log(e.onerror);
            this.connect();
        }
        this.socketRef.onclose = () => {
            console.log('websockets closed lets reopen');
        }
    }

    close() {
        this.socketRef.close();
    }

    socketNewMessage(data) {
        const parsedData = JSON.parse(data);
        const command = parsedData.command == undefined ? parsedData.message.command : parsedData.command;
        if (Object.keys(this.callbacks).length == 0) {
            return;
        }
        if (command == 'messages') {
            this.callbacks[command](parsedData.messages);
        }
        if (command == 'new_message') {
            this.callbacks[command](parsedData.message.message)
        }
        if (command == 'new_image_message'){
            this.callbacks[command](parsedData.message.message)
        }
    }

    initChatUser(userid) {
        this.sendMessage({ command: 'init_chat', userid: parseInt(userid) });
    }

    fetchMessages(userid) {
        this.sendMessage({ command: 'fetch_messages', userid: parseInt(userid) });
    }

    newChatMessage(message, userid) {
        this.sendMessage({ command: 'new_message', text: message.text, userid: parseInt(userid) });
    }

    newChatImageMessage(id, userid){
        this.sendMessage({ command: 'new_image_message', id: id ,userid: parseInt(userid)})
    }

    addCallbacks(messagesCallback, newMessageCallback, newImageMessageCallback) {
        this.callbacks['messages'] = messagesCallback;
        this.callbacks['new_message'] = newMessageCallback;
        this.callbacks['new_image_message'] = newImageMessageCallback;
    }

    sendMessage(data) {
        try {
            this.socketRef.send(JSON.stringify({ ...data }));
        }
        catch (err) {
            console.log(err.message);
        }
    }

    state() {
        return this.socketRef.readyState;
    }

    waitForSocketConnection(callback) {
        const socket = this.socketRef;
        const recursion = this.waitForSocketConnection;
        setTimeout(
            function () {
                if (socket.readyState === 1) {
                    console.log("Connection is made")
                    if (callback != null) {
                        callback();
                    }
                    return;

                } else {
                    console.log("wait for connection...")
                    recursion(callback);
                }
            }, 1); // wait 5 milisecond for the connection...
    }
}


const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;
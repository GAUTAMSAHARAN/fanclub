import React from 'react';
import '../../styles/chatroom/msginput.css';

const MsgInput = () => {
    return (
        <>
            <div className="msg-input">
                <div className="msg-media-input">
                    <i class="fas fa-plus-circle"></i>
                </div>
                <div className="msg-textarea">
                </div>
                <div className="msg-emoji">
                    <i class="fas fa-kiss-wink-heart"></i>
                </div>
            </div>
        </>
    )
}

export default MsgInput;
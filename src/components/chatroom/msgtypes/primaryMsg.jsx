import React, { useState } from 'react';
import '../../../styles/chatroom/msgtypes/primaryMsg.css';
import moment from 'moment';
import Avatar from 'react-avatar';
import AlertDialog from './deleteDialog';
import EditMsg from '../../forms/chatroom/editMsg';
import { useSelector } from 'react-redux';
import { currentGroupId } from '../../../actions/groupAction';

const PrimaryMsg = (props) => {
    const format = "LT";
    const [openEdit, setOpenEdit] = useState(false)
    const currentUserId = useSelector(state => state.userReducer._id)

    const toggleEditForm = () => {
        setOpenEdit(!openEdit)
    }

    return (
        <>
            <div className="primary-msg-container">
                <div className="primary-msg-avatar">
                    <Avatar size="38" round={true} name={props.msg.username} />
                </div>
                <div className="primary-msg-content">
                    <div className="primary-userinfo">
                        <span className="primary-userinfo-name">{props.msg.username}</span>
                        <span className="primary-userinfo-date">{moment(props.msg.created_at).format(format)}</span>
                    </div>
                    {props.msg.imageMsg != null ?
                        <div className="primary-image-msg">
                            <img src={props.msg.imageMsg} className="image-msg" />
                        </div>
                        :
                        <div className="primary-main-msg">
                            {openEdit == true ? <EditMsg msg={props.msg.message} id={props.msg.id} closeEditForm={toggleEditForm} /> : <p>{props.msg.message}</p>}
                        </div>
                    }
                </div>
                {
                    currentUserId == props.msg.writer ?
                        <div className="msg-options">
                            {props.msg.imageMsg == null ? <i onClick={toggleEditForm} class="fas fa-edit msg-options-icon edit-msg-icon"></i> : ''}
                            <AlertDialog childComponent={<i class="fas fa-trash msg-options-icon delete-msg-icon"></i>} desc="message" heading="Message" id={props.msg.id} group={false} />
                        </div>
                        :
                        ''
                }
            </div>
        </>
    )
}

export default PrimaryMsg;
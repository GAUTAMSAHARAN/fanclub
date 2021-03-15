import React from 'react';
import '../../../styles/chatroom/editMsg.css';
import { useFormik } from 'formik';
import Input from '@material-ui/core/Input';
import { editMessageHandler } from '../../../actions/groupAction';
import { useDispatch, useSelector } from 'react-redux';

const EditMsg = (props) => {
    const dispatch = useDispatch();
    let currentMessages = useSelector(state => state.groupReducer.currentGroupMessages)
    const formik = useFormik({
        initialValues: {
            msg: props.msg,
        },
        onSubmit: values => {
            let data = {
                message: values.msg
            }
            dispatch(editMessageHandler(currentMessages, props.id, data))
            props.closeEditForm()
        }
    })
    return (
        <div className="edit-msg">
            <form className="edit-msg-form" onSubmit={formik.handleSubmit}>
                <Input
                    name="msg"
                    className="edit-msg-input"
                    onChange={formik.handleChange}
                    value={formik.values.msg}
                />
                <div className="edit-msg-send">
                   <button className="msg-submit-button" type="submit"><i class="fas fa-location-arrow"></i></button>
                </div>
            </form>
        </div>
    )
}

export default EditMsg;
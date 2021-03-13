import React from 'react';
import Input from '@material-ui/core/Input';
import '../../styles/chatroom/msginput.css';
import { useFormik } from 'formik';
import ImageMsgInput from './imageMsgInput';

const MsgInput = (props) => {

    const formik = useFormik({
        initialValues: {
            msg: '',
        },

        onSubmit: (values, {resetForm}) => {
            let data = {
                message: values.msg,
            }
            props.parentMethod(data)
            resetForm({})
        },
    });

    return (
        <>
            <div className="msg-media-input">
                <ImageMsgInput parentMethod={props.imageMethod} />
            </div>
            <div className="msg-textarea">
                <form onSubmit={formik.handleSubmit} className={'msg-input-form'}>
                    <Input 
                    onChange={formik.handleChange}
                    value={formik.values.msg}
                    name="msg"
                    placeholder="Message" 
                    className="msg-input-field" 
                    inputProps={{ 'aria-label': 'description' }} 
                    />
                <div className="msg-send">
                   <button className="msg-submit-button" type="submit"><i class="fas fa-location-arrow"></i></button>
                </div>
                </form>
            </div>
            <div className="msg-emoji">
                <i class="fas fa-kiss-wink-heart"></i>
            </div>
        </>
    )
}

export default MsgInput;
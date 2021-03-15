import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetImageMessage, createMessage } from '../../actions/groupAction';

const ImageMsgInput = (props) => {
    const dispatch = useDispatch();
    const [imageMsg, setImageMsg] = useState(null)
    const currentUserId = useSelector(state => state.userReducer._id)
    const currentGroupId = useSelector(state => state.groupReducer.currentGroupId)
    const newImageMessage = useSelector(state => state.groupReducer.newImageMessage)

    useEffect(() => {
        if (newImageMessage != null) {
            props.parentMethod(newImageMessage.id)
            dispatch(resetImageMessage())
        }
    }, [newImageMessage])

    const handleImageMsgChange = (e) => {
        setImageMsg(e.target.files[0])
    }

    const submitImageMsg = () => {
        const formData = new FormData()
        formData.append('message', '')
        formData.append('writer', currentUserId)
        formData.append('room', currentGroupId)
        formData.append('imageMsg', imageMsg, imageMsg.name)
        dispatch(
            createMessage(formData)
        )
        setImageMsg(null)
    }

    return (
        <>
            <form>
                {imageMsg == null ? <label className="cover-upload-label" for="msg-image"><i class="fas fa-plus-circle"></i>
                </label> : ''}
                <input type="file"
                    name="imageMsg"
                    id="msg-image"
                    className="image-cover-field"
                    onChange={handleImageMsgChange}
                    accept="image/png, image/jpeg, image/jpg"
                />
                {imageMsg == null ? '' : <button className="image-submit-button" type="submit" onClick={submitImageMsg}><i class="fas fa-file-upload"></i></button>
                }
            </form>
        </>
    )
}

export default ImageMsgInput;
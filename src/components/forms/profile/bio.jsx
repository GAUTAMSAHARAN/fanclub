import React, { useState } from 'react';
import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { useDispatch, useSelector } from 'react-redux';
import { changeBio } from '../../../actions/userAction';

const BioForm = (props) => {

    const [id, setId] = useState(props.user_id)
    const currentUserId = useSelector(state => state.userReducer._id)
    const dispatch = useDispatch();
    const bio = useSelector(state => state.userReducer.currentUserBio).bio
    const bioId = useSelector(state => state.userReducer.currentUserBio).id

    const formik = useFormik({
        initialValues: {
            bio: bio,
        },
        onSubmit: values => {
            dispatch(
                changeBio(values.bio, bioId)
            )
        }
    });
    return (
        <>
            <form onSubmit={formik.handleSubmit} >
                <div className="data-container">
                    <TextareaAutosize
                        className="profile-textarea"
                        aria-label="minimum height"
                        rowsMin={3}
                        placeholder="Minimum 3 rows"
                        name="bio"
                        value={formik.values.bio}
                        disabled={id == currentUserId ? false : true}
                        onChange={formik.handleChange}
                    />
                    {
                        id == currentUserId ? <Button type="submit" className="save-button-profile" variant="contained" color="primary" disableElevation>
                            Save
                    </Button> : ''
                    }
                </div>
            </form>
        </>
    )
}

export default BioForm;
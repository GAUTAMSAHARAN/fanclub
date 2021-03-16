import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { useDispatch, useSelector } from 'react-redux';
import { changeBio } from '../../../actions/userAction';

const BioForm = (props) => {

    const [id, setId] = useState('')
    const currentUserId = useSelector(state => state.userReducer._id)
    const dispatch = useDispatch();
    const [bioData, setBioData] = useState('')
    const [bioId, setBioId] = useState(null)

    useEffect(() => {
        if(props.user_id != undefined){
            setId(props.user_id)
        }
        if(props.bio != undefined){
            setBioData(props.bio.bio)
            setBioId(props.bio.id)
          }
    }, [])

    const formik = useFormik({
        initialValues: {
            bio: bioData,
        },
        enableReinitialize: true,
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
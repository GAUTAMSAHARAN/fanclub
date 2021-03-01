import React, { useState } from 'react';
import { useFormik } from 'formik';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { changeUsername } from '../../../actions/userAction';

const UsernameForm = (props) => {
    const [id, setId] = useState(props.user_id)
    const currentUserId = useSelector(state => state.userReducer._id)
    const dispatch = useDispatch();
    const username = useSelector(state => state.userReducer.user["username"])

    const formik = useFormik({
        initialValues: {
            username: username,
        },
        onSubmit: (values) => {
            console.log(values.username);
            dispatch(
                changeUsername(JSON.stringify(values.username))
            )
            alert(JSON.stringify(values, null, 2));
        }
    });
    return (
        <>
            <form onSubmit={formik.handleSubmit} >
                <div className="data-container">
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Username"
                        name="username"
                        multiline
                        rowsMax={4}
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        variant="outlined"
                        disabled={id == currentUserId ? false : true}
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

export default UsernameForm;

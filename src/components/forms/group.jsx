import React, { useState } from 'react';
import '../../styles/creategroup.css';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import CreateGroup from '../sidemenu/creategroup';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { createGroup} from "../../actions/groupAction";
import * as Yup from "yup";
import { useDispatch } from 'react-redux';

const styles = (theme) => ({
    root: {
        margin: 0,
    },
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        backgroundColor: '#FAA61A',
        height: 'fit-content',
        width: '568px',
    },
}))(MuiDialogContent);

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    disabledButton: {
        color: 'dark'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        display: 'flex',
        flexDirection: 'row',
    },
    formControl: {
        marginTop: '15px',
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    button: {
        marginTop: '15px',
        width: '100%',
        backgroundColor: 'transparent',
        border: '1px solid rgba(0, 0, 0, 0.27)',
        "&:hover": {
            backgroundColor: 'red',
        }
    },
}));



const GroupForm = (props) => {
    const classes = useStyles();
    const currentUserId = useSelector(state => state.userReducer._id)
    const dispatch = useDispatch();
    const [icon, setIcon] = useState(null)
    const [cover, setCover] = useState(null)

    const [open, setOpen] = React.useState(false);

    const handleIconChange = (e) => {
        setIcon(
            e.target.files[0]
        )
    };

    const handleCoverChange = (e) => {
        setCover(
            e.target.files[0]
        )
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };



    const formik = useFormik({

        initialValues: {
            name: '',
            desc: '',
            type: '',
        },

        validationSchema: Yup.object({
            name: Yup.string().required("Required"),
        }),

        onSubmit: values => {
            const formData = new FormData()
            formData.append('name', formik.values.name)
            formData.append('desc', formik.values.desc)
            formData.append('type', formik.values.type)
            if(icon != null){
                formData.append('icon', icon, icon.name)
            }
            if(cover != null){
                formData.append('cover', cover, cover.name)
            }
            formData.append('creater', currentUserId)
            dispatch(
                createGroup(formData)
            )
            handleClose()
        },

    });

    return (
        <>
            <div>
                <div onClick={handleClickOpen}>
                    <CreateGroup title="Create a new group" />
                </div>
                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                    <DialogContent dividers>
                        <div className="profile-basic">
                            <div className="profile-username">Create a Group</div>
                            <form className={classes.root} onSubmit={formik.handleSubmit} >
                                <div className="form-top">
                                    <div className="group-form-options">
                                        <TextField
                                            id="outlined-basic"
                                            label="name"
                                            color="secondary"
                                            variant="outlined"

                                            name="name"
                                            onChange={formik.handleChange}
                                            value={formik.values.name}
                                        />
                                        <FormControl variant="outlined" className={classes.formControl}>
                                            <InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-outlined-label"
                                                id="demo-simple-select-outlined"

                                                name="type"
                                                value={formik.values.type}
                                                onChange={formik.handleChange}
                                                label="Type"
                                            >
                                                <MenuItem value={"Movies"}>Movies</MenuItem>
                                                <MenuItem value={"Coding"}>Coding</MenuItem>
                                                <MenuItem value={"Study"}>Study</MenuItem>
                                            </Select>
                                        </FormControl>

                                        <div className="group-cover-image">
                                            <label className="cover-upload-label" for="group-cover">Selecte Cover Image</label>
                                            <input type="file"
                                                name="cover"
                                                id="group-cover"
                                                className="image-cover-field"
                                                onChange={handleCoverChange}
                                                accept="image/png, image/jpeg, image/jpg"
                                            />
                                            {cover == null ? '' : <i class="fas fa-check-circle cover-tick"></i>
                                            }
                                        </div>

                                    </div>
                                    <div className="group-profile-image">
                                        <label className="image-upload-label" for="group-icon">Browse Image</label>
                                        <input type="file"
                                            name="icon"
                                            id="group-icon"
                                            className="image-icon-field"
                                            onChange={handleIconChange}
                                            accept="image/png, image/jpeg, image/jpg"
                                        />
                                        {icon == null ? '' : <i class="fas fa-check-circle profile-tick"></i>
                                        }
                                    </div>
                                </div>
                                <TextareaAutosize
                                    className="group-form-textarea"
                                    aria-label="minimum height"
                                    rowsMin={3}
                                    placeholder="Your a short description of your group"
                                    name="desc"
                                    onChange={formik.handleChange}
                                    value={formik.values.desc}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className="group-create-button"
                                    disableElevation
                                >
                                    Create
                                </Button>
                            </form>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}
export default GroupForm;
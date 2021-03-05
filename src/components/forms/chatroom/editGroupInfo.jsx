import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { useFormik } from 'formik';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { updateGroup } from "../../../actions/groupAction";
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import '../../../styles/forms/editgroup.css';

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

const EditGroupForm = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    
    const formik = useFormik({

        initialValues: {
            name: props.group.name,
            desc: props.group.desc,
            type: props.group.type,
        },

        validationSchema: Yup.object({
            name: Yup.string().required("Required"),
        }),

        onSubmit: values => {
            let data = {
                name: formik.values.name,
                type: formik.values.type,
                desc: formik.values.desc,
            }
            data = JSON.stringify(data);
            dispatch(
                updateGroup(data)
            )
            handleClose()
        },

    });

    return (
        <>
            <div>
            <EditIcon onClick={handleClickOpen} />
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                    <DialogContent dividers>
                        <div className="profile-basic">
                            <div className="profile-username">Edit Group Data</div>
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
                                    </div>
                                    <div className="group-profile-image"></div>
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
                                    Save
                                </Button>
                            </form>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}

export default EditGroupForm;
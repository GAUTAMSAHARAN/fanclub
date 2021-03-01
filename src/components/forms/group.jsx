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
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

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
    const [type, setType] = React.useState('');

    const handleChange = (event) => {
        setType(event.target.value);
    };

    const [open, setOpen] = React.useState(false);
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
            creater: '',
            admins: [],
            members: [],
        },

        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
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
                            <form className={classes.root} noValidate autoComplete="off">
                                <div className="form-top">
                                    <div className="group-form-options">
                                        <TextField id="outlined-basic" label="name" color="secondary" variant="outlined" />
                                        <FormControl variant="outlined" className={classes.formControl}>
                                            <InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-outlined-label"
                                                id="demo-simple-select-outlined"
                                                value={type}
                                                onChange={handleChange}
                                                label="Type"
                                            >
                                                <MenuItem value={"Movies"}>Movies</MenuItem>
                                                <MenuItem value={"Coding"}>Coding</MenuItem>
                                                <MenuItem value={"Study"}>Study</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className={classes.button}
                                            startIcon={<AddCircleOutlineIcon />}
                                            disableElevation={true}
                                        >
                                            Add members
                                        </Button>
                                    </div>
                                    <div className="group-profile-image"></div>
                                </div>
                                <TextareaAutosize className="group-form-textarea" aria-label="minimum height" rowsMin={3} placeholder="Your a short description of your group" />
                                <Button type="submit" variant="contained" color="primary" className="group-create-button" disableElevation>
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
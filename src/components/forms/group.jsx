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
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Dropdown } from 'semantic-ui-react'
import { createGroup } from "../../actions/groupAction";
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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const wbcOptions = [
    {
        key:1,
        text: 'Normal',
        value: 'Normal'
    },
    {
        key:2,
        text: 'PLT Clumping',
        value: 'PLT Clumping',
    },
    {
        key:3,
        text: 'Reactive Lymphocytes',
        value: 'Reactive Lymphocytes',
    },
    {
        key:4,
        text: 'Hypersegmented Neutrophils',
        value: 'Hypersegmented Neutrophils',
    }
]



const GroupForm = (props) => {
    const classes = useStyles();
    const currentUserId = useSelector(state => state.userReducer._id)
    const [members, setMembers] = useState([]);
    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);
    const [openAdd, setOpenAdd] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handeClickAdd = () => {
        setOpenAdd(true);
    }

    const handleCloseAdd = () => {
        setOpenAdd(false);
    };

    const handleDropChange = (event, data) => {
        setMembers(data.value);
    }
    
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
            let data = {
                name: formik.values.name,
                type: formik.values.type,
                desc: formik.values.desc,
                creater: currentUserId,
                admins: [],
                members: members,
            }
            data = JSON.stringify(data);
            dispatch(
                createGroup(data)
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

                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className={classes.button}
                                            startIcon={<AddCircleOutlineIcon />}
                                            disableElevation={true}
                                            onClick={handeClickAdd}
                                        >
                                            Add members
                                        </Button>
                                        <Dialog
                                            open={openAdd}
                                            TransitionComponent={Transition}
                                            keepMounted
                                            onClose={handleCloseAdd}
                                            aria-labelledby="alert-dialog-slide-title"
                                            aria-describedby="alert-dialog-slide-description"
                                        >
                                            <DialogTitle id="alert-dialog-slide-title">{"Add Members into the group"}</DialogTitle>
                                            <DialogContent className="add-members-dialog-content">

                                                <Dropdown
                                                    placeholder='USERS'
                                                    fluid
                                                    multiple
                                                    search
                                                    selection
                                                    onChange={handleDropChange}
                                                    options={wbcOptions}
                                                />

                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleCloseAdd} color="primary">
                                                    Close
                                                </Button>
                                            </DialogActions>
                                        </Dialog>

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
import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { Dropdown } from 'semantic-ui-react'
import '../../../styles/chatroom/addMembers.css';
import { useDispatch, useSelector } from 'react-redux';
import { makeMember } from '../../../actions/groupAction';

const styles = (theme) => ({
    root: {
        margin: 0,
    },
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        backgroundColor: '#CSEEE3',
        minHeight: '350px',
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

const AddMembers = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [members, setMembers] = useState([])
    const allUsers = useSelector(state => state.userReducer.AllUsers)
    const [users, setUsers] = useState([])
    const currentGroup = useSelector(state => state.groupReducer.currentGroup)
    const dispatch = useDispatch()
    const handleClickOpen = () => { 
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleDropChange = (event, {value}) => {
        setMembers(value);
    }

    const handleSubmit = () => {
        let data = []
        currentGroup.members.map((user) => 
            data.push(user.id)
        )
        members.map((obj) => 
            data.push(obj)
        )
        let set = new Set(data)
        data = Array.from(set)
        dispatch(
            makeMember({member_array: data}, currentGroup.id)      
        )
    }

    useEffect(() => {
        if(allUsers.length != 0){
            let array = [];
            let temp = allUsers.map((user, index) => {
                let obj = {
                    key: index,
                    text: user.username,
                    value: user.id,
                }
                array.push(obj)
            })
            setUsers(array)
        }
    }, [allUsers])

    return (
        <>
            <div>
                <div onClick={handleClickOpen}>
                    <AddCircleIcon />
                </div>
                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                    <DialogContent dividers>
                        <div className="profile-basic">
                            <div className="form-heading-add-members">ADD MEMBERS</div>
                            <form className={classes.root} >
                                <Dropdown
                                    placeholder='USERS'
                                    fluid
                                    multiple
                                    search
                                    selection
                                    onChange={handleDropChange}
                                    options={users}
                                    className = "dropdown-add-members"
                                />
                                <p className='add-members-desc'>Just select all the users who you want to make them members through this search multiple select dropdown and click on Submit.</p>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className="add-members-button"
                                    disableElevation
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </Button>
                            </form>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}

export default AddMembers;


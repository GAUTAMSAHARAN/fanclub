import React, { useEffect, useState } from 'react';
import '../styles/home.css';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import PhoneIcon from '@material-ui/icons/Phone';
import NotesIcon from '@material-ui/icons/Notes';
import TextField from '@material-ui/core/TextField';

import UsernameForm from '../components/forms/profile/username';
import Phone from '../components/forms/profile/phone';
import BioForm from '../components/forms/profile/bio';
import { useSelector, useStore } from 'react-redux';
import Avatar from 'react-avatar';

const styles = (theme) => ({
    root: {
        margin: 0,
    },
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        backgroundColor: '#000',
        height: 'fit-content',
        width: '568px',
    },
}))(MuiDialogContent);

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
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
}));

const Home = (props) => {
    const classes = useStyles();

    const [id, setId] = useState(props.user.pk)
    const currentUserId = useSelector(state => state.userReducer._id)
    const currentUserBio = useSelector(state => state.userReducer.currentUserBio)

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [value, setValue] = React.useState(props.user.email);
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <>
            <div>
                <div onClick={handleClickOpen}>
                    {props.childComponent}
                </div>
                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                    <DialogContent dividers>
                        <div className="profile-basic">
                            <div className="profile-avatar"><Avatar size="80" name={props.user.username} /></div>
                            <div className="profile-username">{props.user.username}</div>
                            <div className="profile-bio">
                                {currentUserBio.bio}
                            </div>
                        </div>
                        <div className="profile-primary">
                            <div className={classes.root}>
                                <Accordion className="option-1">
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography className={classes.heading}><EmailIcon className="profile-icons" /> Email</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className="data-container">
                                            <form className={classes.root} noValidate autoComplete="off">
                                                <TextField
                                                    id="outlined-multiline-flexible"
                                                    label="Email"
                                                    className={{ disabled: classes.disabledButton }}
                                                    multiline
                                                    rowsMax={4}
                                                    value={value}
                                                    onChange={handleChange}
                                                    variant="outlined"
                                                    disabled={true}
                                                />
                                            </form>
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion className="option-2">
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                    >
                                        <Typography className={classes.heading}><PersonIcon className="profile-icons" /> Username</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className={classes.root} >
                                            <UsernameForm user_id={props.user.pk} user={props.user} />
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                                {
                                    id == currentUserId ? <Accordion className="option-3">
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2a-content"
                                            id="panel2a-header"
                                        >
                                            <Typography className={classes.heading}><LockIcon className="profile-icons" /> Password</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        </AccordionDetails>
                                    </Accordion> : ''
                                }
                                <Accordion className="option-4">
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                    >
                                        <Typography className={classes.heading}><PhoneIcon className="profile-icons" /> Phone</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className={classes.root} >
                                            <Phone user_id = {props.user.pk} />
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion className="option-5">
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                    >
                                        <Typography className={classes.heading}><NotesIcon className="profile-icons" /> Bio</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className={classes.root} >
                                            <BioForm user_id={props.user.pk} />
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}
export default Home
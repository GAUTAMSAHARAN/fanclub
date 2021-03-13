import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Dropdown } from 'semantic-ui-react';

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
        key: 1,
        text: 'Normal',
        value: 'Normal'
    },
    {
        key: 2,
        text: 'PLT Clumping',
        value: 'PLT Clumping',
    },
    {
        key: 3,
        text: 'Reactive Lymphocytes',
        value: 'Reactive Lymphocytes',
    },
    {
        key: 4,
        text: 'Hypersegmented Neutrophils',
        value: 'Hypersegmented Neutrophils',
    }
]

const AddMembers = () => {
    const [openAdd, setOpenAdd] = React.useState(false);
    const [members, setMembers] = useState([]);


    const handeClickAdd = () => {
        setOpenAdd(true);
    }

    const handleCloseAdd = () => {
        setOpenAdd(false);
    };

    const handleDropChange = (event, data) => {
        setMembers(data.value);
    }
    return (
        <>
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
        </>
    )
}

export default AddMembers;
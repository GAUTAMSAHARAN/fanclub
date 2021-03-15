import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import '../../../styles/deleteDialog.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMessage, deleteGroup } from '../../../actions/groupAction';
import { useHistory } from "react-router-dom";

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);
  const currentGroupMessage = useSelector(state => state.groupReducer.currentGroupMessages)
  const currentGroupId = useSelector(state => state.groupReducer.currentGroupId)
  const group = useSelector(state => state.groupReducer.currentGroup)
  const currentUserGroups = useSelector(state => state.groupReducer.currentUserGroups)
  const dispatch = useDispatch();
  let history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const groupDelete = () => {
    let data =  currentUserGroups.filter((group) => group.id !== currentGroupId)
    dispatch(deleteGroup(currentGroupId, data))
    history.push({
      pathname: `/fanclub/explore`,
    });
  }

  const deleteElement = () => {
    dispatch(deleteMessage(currentGroupMessage, props.id));
    setOpen(false);
  }

  return (
    <div>
      <div onClick={handleClickOpen}>
        {props.childComponent}
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {props.group == true ?
          <DialogTitle className="delete-dialog delete-dialog-header" id="alert-dialog-title">{`Group Delete Confirmation?`}</DialogTitle>
          :
          <DialogTitle className="delete-dialog delete-dialog-header" id="alert-dialog-title">{`${props.heading} Delete Confirmation?`}</DialogTitle>
        }
        <DialogContent className="delete-dialog">
          {props.group == true ?
            <DialogContentText className="delete-dialog-desc" id="alert-dialog-description">
              This action cannot be undone. This will permanently delete this {group.name} group.<br></br>
                    If you sure about it, Press Agree.
                  </DialogContentText>
            :
            <DialogContentText className="delete-dialog-desc" id="alert-dialog-description">
              This action cannot be undone. This will permanently delete this {props.desc}.<br></br>
        If you sure about it, Press Agree.
      </DialogContentText>
          }
        </DialogContent>
        <DialogActions className="delete-dialog">
          <Button onClick={handleClose} className="delete-disagree-button">
            Disagree
          </Button>
          {props.group == true ?
            <Button onClick={groupDelete} className="delete-agree-button" autoFocus>
              Agree
            </Button> :
            <Button onClick={deleteElement} className="delete-agree-button" autoFocus>
              Agree
            </Button>
          }
        </DialogActions>
      </Dialog>
    </div>
  );
}
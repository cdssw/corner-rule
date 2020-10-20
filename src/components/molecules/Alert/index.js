import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';

export default function Alert(props) {
  return (
    <Dialog
      open={props.state}
      onClose={props.onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary" autoFocus>
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
}

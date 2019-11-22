import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface IProps {
  open?: boolean;
  title: string;
  children?: React.ReactNode;
  showContentText?: boolean;
  contentText?: string;
  showCloseButton?: boolean;
  closeButtonName?: string;
  confirmButtonName?: string;
  handleConfirm: () => void;
  handleClose?: () => void;
}

export default function Modal(props: IProps): JSX.Element {
  const {
    open,
    title,
    children,
    showContentText,
    contentText,
    showCloseButton,
    closeButtonName,
    confirmButtonName,
    handleConfirm,
    handleClose
  } = props;

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          {showContentText && (
            <DialogContentText id="alert-dialog-description">
              {contentText}
            </DialogContentText>
          )}
          {children}
        </DialogContent>
        <DialogActions>
          {showCloseButton && (
            <Button onClick={handleClose} color="primary">
              {closeButtonName}
            </Button>
          )}
          <Button onClick={handleConfirm} color="primary" autoFocus>
            {confirmButtonName}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

Modal.defaultProps = {
  open: false,
  children: null,
  showContentText: false,
  contentText: '',
  showCloseButton: true,
  closeButtonName: 'Close',
  confirmButtonName: 'OK',
  handleClose: () => false
};

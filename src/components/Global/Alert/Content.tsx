import React from 'react';
import clsx from 'clsx';

import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import { useStyles, variantIcon } from './styles';

interface IProps {
  className?: string;
  message: string;
  variant: 'error' | 'info' | 'success' | 'warning';
  onClick: (event: React.SyntheticEvent<any, Event>, reason: string) => void;
}

export default function Content(props: IProps) {
  const classes = useStyles(props);
  const { className, message, onClick, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={onClick as any}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
}

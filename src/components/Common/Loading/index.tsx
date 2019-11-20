import React from 'react';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

interface IProps {
  show: boolean;
  classes?: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2)
      }
    }
  })
);

export default function Loading(props: IProps): JSX.Element {
  const classes = useStyles(props);
  const { show } = props;

  return (
    show && (
      <div className={classes.root}>
        <LinearProgress />
      </div>
    )
  );
}

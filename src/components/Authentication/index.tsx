import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { checkAuthentication } from 'redux/ducks/authentication';

import IStore from 'interfaces/store';
import { IAuthenticationState, ICredentials } from 'interfaces/authentication';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import FormValidation from '@react-form-fields/material-ui/components/FormValidation';
import FieldText from '@react-form-fields/material-ui/components/Text';

interface IProps {
  classes?: any;
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function Authentication(props: IProps): JSX.Element {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const dispatch = useDispatch<any>();
  const authentication = useSelector<IStore, IAuthenticationState>(
    state => state.authentication
  );
  const { fetch, authorized } = authentication;

  const classes = useStyles(props);

  async function authenticate(isValid: boolean): Promise<void> {
    if (!isValid) return;

    const credentials: ICredentials = { email, password };
    dispatch(checkAuthentication(credentials));
  }

  if (authorized) return <Redirect to="/dashboard/user" />;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>

        <FormValidation onSubmit={isValid => authenticate(isValid)}>
          <FieldText
            variant="outlined"
            margin="normal"
            validation="required|email"
            type="email"
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            value={email}
            onChange={email => setEmail(email)}
            autoFocus
          />

          <FieldText
            variant="outlined"
            margin="normal"
            validation="required"
            fullWidth
            name="password"
            value={password}
            label="Senha"
            type="password"
            id="password"
            onChange={password => setPassword(password)}
            autoComplete="current-password"
          />

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Lembrar"
          />

          <Button
            type="submit"
            fullWidth
            disabled={fetch}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {!fetch ? 'Logar' : 'Carregando...'}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Esqueceu a senha?
              </Link>
            </Grid>
          </Grid>
        </FormValidation>
      </div>
    </Container>
  );
}

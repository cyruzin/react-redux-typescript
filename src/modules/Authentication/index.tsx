import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { checkAuthentication } from 'redux/ducks/authentication'

import IStore from 'interfaces/store'
import { IAuthenticationState, ICredentials } from 'interfaces/authentication'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'

import { useStyles } from './styles'

export default function Authentication(): JSX.Element {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const authentication = useSelector<IStore, IAuthenticationState>(
    (state) => state.authentication
  )
  const { fetch, authorized } = authentication

  const classes = useStyles()

  async function authenticate(): Promise<void> {
    const credentials: ICredentials = { email, password }
    dispatch(checkAuthentication(credentials))
  }

  if (authorized) return <Redirect to="/dashboard/user" />

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

        <TextField
          variant="outlined"
          margin="normal"
          type="email"
          fullWidth
          id="email"
          label="E-mail"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoFocus
        />

        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="password"
          value={password}
          label="Senha"
          type="password"
          id="password"
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
        />

        <Button
          type="submit"
          onClick={authenticate}
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
      </div>
    </Container>
  )
}

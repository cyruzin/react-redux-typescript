import { useSelector, useDispatch } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

import IStore from 'interfaces/store'
import { IAuthenticationState } from 'interfaces/authentication'

import { resetAuthentication } from 'redux/ducks/authentication'

export default function PrivateRoute(
  { component: Component }: any,
  { ...rest }
): JSX.Element {
  const dispatch = useDispatch()
  const authentication = useSelector<IStore, IAuthenticationState>(
    (state) => state.authentication
  )
  const { authorized } = authentication

  if (authorized) {
    const { exp } = authentication
    if (exp < new Date().getTime() / 1000) {
      dispatch(resetAuthentication())
      return <Redirect to={{ pathname: '/' }} />
    }
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        authorized ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  )
}

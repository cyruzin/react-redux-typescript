import React from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { resetAuthentication } from '../../redux/ducks/authentication'

function Logout(): JSX.Element {
  const dispatch = useDispatch<any>()
  dispatch(resetAuthentication())
  return <Redirect to="/" />
}

export default Logout

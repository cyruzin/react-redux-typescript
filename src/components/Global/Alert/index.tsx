import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { resetAlert } from '../../../redux/ducks/alert'

import IStore from '../../../interfaces/store'
import { IAlertState } from '../../../interfaces/alert'

import Snackbar from '@material-ui/core/Snackbar'

import Content from './Content'

export default function Alert() {
  const alert = useSelector<IStore, IAlertState>(state => state.alert)
  const { show, duration, message, variant } = alert

  const dispatch = useDispatch<any>()

  const [open, setOpen] = React.useState(false)

  function handleClick(show: boolean): void {
    setOpen(show)
  }

  function handleClose(
    event: React.SyntheticEvent<any, Event>,
    reason: string
  ): void {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
    dispatch(resetAlert())
  }

  useEffect(() => {
    handleClick(show)
  }, [show])

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={open}
        autoHideDuration={duration}
        onClose={handleClose}
      >
        <Content onClick={handleClose} variant={variant} message={message} />
      </Snackbar>
    </div>
  )
}

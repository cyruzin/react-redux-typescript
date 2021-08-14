import LinearProgress from '@material-ui/core/LinearProgress'

import { useStyles } from './styles'

interface IProps {
  show: boolean
}

export default function Loading(props: IProps): JSX.Element {
  const classes = useStyles()
  const { show } = props

  return (
    show && (
      <div className={classes.root}>
        <LinearProgress />
      </div>
    )
  )
}

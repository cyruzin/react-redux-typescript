import { useState } from 'react'

import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Fade from '@material-ui/core/Fade'

type Item = {
  name: string
  callback: () => any
}

interface IProps {
  items: Array<Item>
}

export default function Actions(props: IProps): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const openMenu = Boolean(anchorEl)
  const { items } = props

  function handleClick(event: React.MouseEvent<HTMLElement>): void {
    setAnchorEl(event.currentTarget)
  }

  function handleClose(): void {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={openMenu}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {items.map((item) => (
          <MenuItem key={item.name} onClick={item.callback}>
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

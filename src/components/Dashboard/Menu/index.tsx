import { Link } from 'react-router-dom'

import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import PeopleIcon from '@material-ui/icons/People'
import LogoutIcon from '@material-ui/icons/ArrowBackIosOutlined'

export default (
  <>
    <Link to="/dashboard/user" style={{ textDecoration: 'none' }}>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Usuários" />
      </ListItem>
    </Link>
    <Link to="/dashboard/logout" style={{ textDecoration: 'none' }}>
      <ListItem button>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Sair" />
      </ListItem>
    </Link>
  </>
)

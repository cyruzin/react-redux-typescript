import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Content from '../Dashboard/Content'
import Logout from '../Authentication/Logout'

export default function Routes() {
  return (
    <Content>
      <Switch>
        <Route path="/dashboard/user" component={() => <h1>User</h1>} />
        <Route path="/dashboard/logout" component={Logout} />
      </Switch>
    </Content>
  )
}

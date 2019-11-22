import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Content from '../Dashboard/Content';
import Logout from '../Authentication/Logout';
import User from '../User';

export default function Routes() {
  return (
    <Content>
      <Switch>
        <Route path="/dashboard/user" component={User} />
        <Route path="/dashboard/logout" component={Logout} />
      </Switch>
    </Content>
  );
}

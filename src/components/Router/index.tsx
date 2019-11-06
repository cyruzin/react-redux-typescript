import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Logout from '../Authentication/Logout';

import Content from '../Dashboard/Content';

export default function Routes() {
  return (
    <Content>
      <Switch>
        <Route path="/dashboard/users" component={() => <h1>Usuários</h1>} />
        <Route path="/dashboard/logout" component={Logout} />
      </Switch>
    </Content>
  );
}

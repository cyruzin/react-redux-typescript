import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Content from './Content';

export default function Dashboard() {
  return (
    <Content>
      <Switch>
        <Route path="/dashboard/users" component={() => <h1>Usuários</h1>} />
      </Switch>
    </Content>
  );
}

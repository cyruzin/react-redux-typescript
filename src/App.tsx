import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import store from './redux/';

import Routes from './components/Router';
import PrivateRoute from './components/Router/PrivateRoute';
import Authentication from './components/Authentication';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact component={Authentication} />
          <PrivateRoute path="/dashboard" component={Routes} />
          <Route
            render={() => (
              <>
                <h3 className="text-center">Page Not Found</h3>
              </>
            )}
          />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;

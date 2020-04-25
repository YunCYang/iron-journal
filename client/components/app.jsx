import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Landing from './landing';

const App = () => {
  return (
    <Router>
      <Switch>
        <>
          <Route exact path="/" render={() => <Landing />} />
        </>
      </Switch>
    </Router>
  );
};

export default App;

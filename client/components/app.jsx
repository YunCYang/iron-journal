import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './login';
import Signup from './signup';
import ForgetPwd from './forgetPwd';
import Main from './main';

const App = () => {
  return (
    <Router>
      <Switch>
        <>
          <div className="main">
            <Route exact path="/" render={() => <Login />} />
            <Route exact path="/signup" render={() => <Signup />} />
            <Route exact path="/forgetPassword" render={() => <ForgetPwd />} />
            <Route exact path="/main" render={() => <Main />} />
          </div>
        </>
      </Switch>
    </Router>
  );
};

export default App;

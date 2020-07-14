import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './login';
import Signup from './signup';
import ForgetPwd from './forgetPwd';
import Main from './main';

export const IdContext = React.createContext(null);

const App = () => {
  const [id, setId] = React.useState(
    sessionStorage.getItem('id') || null
  );

  return (
    <IdContext.Provider value={{ id, setId }}>
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
    </IdContext.Provider>
  );
};

export default App;

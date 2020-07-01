import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { IdContext } from './app';

const Login = props => {
  const [isLogin, setIsLogin] = React.useState(true);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const id = React.useContext(IdContext);

  const loginHandler = () => {
    const inputUsername = document.getElementById('input-username');
    const inputPassword = document.getElementById('input-password');
    const emptyFeedback = document.getElementById('login-feedback__empty');
    const invalidFeedback = document.getElementById('login-feedback__invalid');
    if (!inputUsername.checkValidity() || !inputPassword.checkValidity()) {
      emptyFeedback.classList.remove('hide');
    } else {
      invalidFeedback.classList.add('hide');
      emptyFeedback.classList.add('hide');
      const init = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password
        })
      };
      fetch('/api/auth/login', init)
        .then(res => res.json())
        .then(res => {
          if (res.status === 401) invalidFeedback.classList.remove('hide');
          else if (res.status === 200) {
            sessionStorage.setItem('id', res.userId);
            id.setId(res.userId);
            props.history.push('/main');
          } else invalidFeedback.classList.remove('hide');
        });
    }
  };

  const validateInput = () => {
    const inputUsername = document.getElementById('input-username');
    const inputPassword = document.getElementById('input-password');
    const emptyFeedback = document.getElementById('login-feedback__empty');
    if (inputUsername.checkValidity() && inputPassword.checkValidity()) {
      emptyFeedback.classList.add('hide');
    }
  };

  const usernameInputHandler = () => {
    const inputUsername = document.getElementById('input-username');
    validateInput();
    if (inputUsername.checkValidity()) setUsername(inputUsername.value);
  };

  const passwordInputHandler = () => {
    const inputPassword = document.getElementById('input-password');
    validateInput();
    if (inputPassword.checkValidity()) setPassword(inputPassword.value);
  };

  const guestLoginHandler = () => {
    sessionStorage.setItem('id', '0');
    id.setId('0');
    props.history.push('/main');
  };

  const switchLogin = () => setIsLogin(!isLogin);

  const switchAction = () => {
    if (isLogin) {
      return (
        <>
          <div className="landing-action__userName">
            <input type="text" name="usename" id="input-username" required onChange={usernameInputHandler} />
            <span className="bar"></span>
            <label className="landing-action__label">Username</label>
          </div>
          <div className="landing-action__password">
            <input type="password" name="password" id="input-password" required onChange={passwordInputHandler} />
            <span className="bar"></span>
            <label className="landing-action__label">Password</label>
          </div>
          <div className="landing-action__feedback">
            <span id='login-feedback__empty' className="empty hide">Username &amp; password are required.</span>
            <span id='login-feedback__invalid' className="wrongCredential hide">Incorrect username or password.</span>
            <span id='login-feedback__error' className="loginError hide">Unknown error happened.</span>
          </div>
          <div className="landing-action__forgetPwd">
            <Link to='/forgetpassword' className='forgetPwd'>Forget password?</Link>
          </div>
          <div className="landing-action__login">
            <button className="landing-action__login__button" type="button" onClick={loginHandler}>Log in</button>
          </div>
          <div className="landing-action__signUpLink">
            <span className='left' onClick={switchLogin}>Use as a guest</span>
            <Link to='/signup' className='right'>Sign up</Link>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="landing-action__container">
            <button type='button' onClick={guestLoginHandler}>Use as a guest</button>
            <button type='button' onClick={switchLogin}>I want to log in</button>
          </div>
        </>
      );
    }
  };

  return (
    <div className='landing'>
      <div className="landing-logo">
        <div className="landing-logo__circle">
          <div className="landing-logo__head"></div>
          <div className="landing-logo__handle"></div>
          <div className="landing-logo__guard__left"></div>
          <div className="landing-logo__guard__right"></div>
          <div className="landing-logo__shade__left shade"></div>
          <div className="landing-logo__shade__right shade"></div>
          <div className="landing-logo__blade"></div>
        </div>
      </div>
      <div className="landing-title">
        <div className="landing-title__main">
          <span>Iron Journal</span>
        </div>
        <div className="landing-title__secondary">
          <span>A journal for Ironsworn RPG</span>
        </div>
      </div>
      <div className="landing-action">
        {switchAction()}
      </div>
    </div>
  );
};

export default withRouter(Login);

import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Login = props => {
  const buttonHandler = () => {
    const inputUsername = document.getElementById('input-username');
    const inputPassword = document.getElementById('input-password');
    const emptyFeedback = document.getElementById('login-feedback__empty');
    // const invalidFeedback = document.getElementById('login-feedback__invalid');
    if (!inputUsername.checkValidity() || !inputPassword.checkValidity()) {
      emptyFeedback.classList.remove('hide');
    } else {
      emptyFeedback.classList.add('hide');
      props.history.push('/main');
    }
  };

  const usernameInputHandler = () => {
    validateInput();
  };
  const passwordInputHandler = () => {
    validateInput();
  };

  const validateInput = () => {
    const inputUsername = document.getElementById('input-username');
    const inputPassword = document.getElementById('input-password');
    const emptyFeedback = document.getElementById('login-feedback__empty');
    if (inputUsername.checkValidity() && inputPassword.checkValidity()) {
      emptyFeedback.classList.add('hide');
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
        <div className="landing-action__userName">
          <input type="text" name="usename" id="input-username" required onChange={usernameInputHandler}/>
          <span className="bar"></span>
          <label className="landing-action__label">Username</label>
        </div>
        <div className="landing-action__password">
          <input type="password" name="password" id="input-password" required onChange={passwordInputHandler}/>
          <span className="bar"></span>
          <label className="landing-action__label">Password</label>
        </div>
        <div className="landing-action__feedback">
          <span id='login-feedback__empty' className="empty hide">Username &amp; password are required.</span>
          <span id='login-feedback__invalid' className="wrongCredential hide">Incorrect username or password.</span>
        </div>
        <div className="landing-action__forgetPwd">
          <Link to='/forgetpassword' className='forgetPwd'>Forget password?</Link>
        </div>
        <div className="landing-action__login">
          <button className="landing-action__login__button" type="button" onClick={buttonHandler}>Log in</button>
        </div>
        <div className="landing-action__signUpLink">
          <Link to='/signup' className='left'>Don&apos;t have an account?</Link>
          <Link to='/signup' className='right'>Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);

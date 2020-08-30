import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Signup = props => {
  const [isNameValid, setIsNameValid] = React.useState(null);
  const [isEmailValid, setIsEmailValid] = React.useState(null);
  const [isPasswordValid, setIsPasswordValid] = React.useState(null);
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const specialCharCheck = /\W/;
  const usernameLengthCheck = /^.{6,30}/;
  const passwordLengthCheck = /^.{8,32}/;
  const passwordNumberCheck = /(?=.*[0-9])/;
  const passwordUppercaseCheck = /(?=.*[A-Z])/;
  const passwordLowercaseCheck = /(?=.*[a-z])/;
  const passwordSpecialCheck = /(?=.*[!@#$%^&*_=+-])/;

  const invalidDisplay = state => {
    if (state === null) return 'hide';
    else if (!state) return '';
    else return 'hide';
  };

  const validDisplay = state => {
    if (!state) return 'hide';
    else return '';
  };

  const nameInputHandler = () => {
    const nameInput = document.getElementById('input-signup__username');
    const nameLengthFeedback = document.getElementsByClassName('username-feedback__length')[0];
    const nameSpecialFeedback = document.getElementsByClassName('username-feedback__special')[0];
    if (nameInput.checkValidity()) {
      setIsNameValid(true);
      nameLengthFeedback.classList.add('hide');
      nameSpecialFeedback.classList.add('hide');
      setUsername(nameInput.value);
    }
  };

  const nameInputWarning = () => {
    const nameInput = document.getElementById('input-signup__username');
    const nameLengthFeedback = document.getElementsByClassName('username-feedback__length')[0];
    const nameSpecialFeedback = document.getElementsByClassName('username-feedback__special')[0];
    if (!nameInput.checkValidity()) {
      setIsNameValid(false);
      if (specialCharCheck.test(nameInput.value)) {
        nameSpecialFeedback.classList.remove('hide');
      } else nameSpecialFeedback.classList.add('hide');
      if (!usernameLengthCheck.test(nameInput.value)) {
        nameLengthFeedback.classList.remove('hide');
      } else nameLengthFeedback.classList.add('hide');
    }
  };

  const emailInputHandler = () => {
    const emailInput = document.getElementById('input-signup__email');
    const emailFormatFeedback = document.getElementsByClassName('email-feedback__format')[0];
    if (emailInput.checkValidity()) {
      setIsEmailValid(true);
      emailFormatFeedback.classList.add('hide');
      setEmail(emailInput.value);
    }
  };

  const emailInputWarning = () => {
    const emailInput = document.getElementById('input-signup__email');
    const emailFormatFeedback = document.getElementsByClassName('email-feedback__format')[0];
    if (!emailInput.checkValidity()) {
      setIsEmailValid(false);
      emailFormatFeedback.classList.remove('hide');
    }
  };

  const passwordInputHandler = () => {
    const passwordInput = document.getElementById('input-signup__password');
    const passwordLengthFeedback = document.getElementsByClassName('password-feedback__length')[0];
    const passwordUppercaseFeedback = document.getElementsByClassName('password-feedback__uppercase')[0];
    const passwordLowercaseFeedback = document.getElementsByClassName('password-feedback__lowercase')[0];
    const passwordNumberFeedback = document.getElementsByClassName('password-feedback__number')[0];
    const passwordSpecialFeedback = document.getElementsByClassName('password-feedback__special')[0];
    if (passwordInput.checkValidity()) {
      setIsPasswordValid(true);
      passwordLengthFeedback.classList.add('hide');
      passwordUppercaseFeedback.classList.add('hide');
      passwordLowercaseFeedback.classList.add('hide');
      passwordNumberFeedback.classList.add('hide');
      passwordSpecialFeedback.classList.add('hide');
      setPassword(passwordInput.value);
    }
  };

  const passwordInputWarning = () => {
    const passwordInput = document.getElementById('input-signup__password');
    const passwordLengthFeedback = document.getElementsByClassName('password-feedback__length')[0];
    const passwordUppercaseFeedback = document.getElementsByClassName('password-feedback__uppercase')[0];
    const passwordLowercaseFeedback = document.getElementsByClassName('password-feedback__lowercase')[0];
    const passwordNumberFeedback = document.getElementsByClassName('password-feedback__number')[0];
    const passwordSpecialFeedback = document.getElementsByClassName('password-feedback__special')[0];
    if (!passwordInput.checkValidity()) {
      setIsPasswordValid(false);
      if (!passwordLengthCheck.test(passwordInput.value)) {
        passwordLengthFeedback.classList.remove('hide');
      } else passwordLengthFeedback.classList.add('hide');
      if (!passwordNumberCheck.test(passwordInput.value)) {
        passwordNumberFeedback.classList.remove('hide');
      } else passwordNumberFeedback.classList.add('hide');
      if (!passwordUppercaseCheck.test(passwordInput.value)) {
        passwordUppercaseFeedback.classList.remove('hide');
      } else passwordUppercaseFeedback.classList.add('hide');
      if (!passwordLowercaseCheck.test(passwordInput.value)) {
        passwordLowercaseFeedback.classList.remove('hide');
      } else passwordLowercaseFeedback.classList.add('hide');
      if (!passwordSpecialCheck.test(passwordInput.value)) {
        passwordSpecialFeedback.classList.remove('hide');
      } else passwordSpecialFeedback.classList.add('hide');
    }
  };

  const submitHandler = () => {
    const nameInput = document.getElementById('input-signup__username');
    const nameLengthFeedback = document.getElementsByClassName('username-feedback__length')[0];
    const nameSpecialFeedback = document.getElementsByClassName('username-feedback__special')[0];
    const emailInput = document.getElementById('input-signup__email');
    const emailFormatFeedback = document.getElementsByClassName('email-feedback__format')[0];
    const passwordInput = document.getElementById('input-signup__password');
    const passwordLengthFeedback = document.getElementsByClassName('password-feedback__length')[0];
    const passwordUppercaseFeedback = document.getElementsByClassName('password-feedback__uppercase')[0];
    const passwordLowercaseFeedback = document.getElementsByClassName('password-feedback__lowercase')[0];
    const passwordNumberFeedback = document.getElementsByClassName('password-feedback__number')[0];
    const passwordSpecialFeedback = document.getElementsByClassName('password-feedback__special')[0];
    if (nameInput.checkValidity()) {
      nameLengthFeedback.classList.add('hide');
      nameSpecialFeedback.classList.add('hide');
    } else {
      if (specialCharCheck.test(nameInput.value)) {
        nameSpecialFeedback.classList.remove('hide');
      } else nameSpecialFeedback.classList.add('hide');
      if (!usernameLengthCheck.test(nameInput.value)) {
        nameLengthFeedback.classList.remove('hide');
      } else nameLengthFeedback.classList.add('hide');
    }
    if (emailInput.checkValidity()) {
      emailFormatFeedback.classList.add('hide');
    } else emailFormatFeedback.classList.remove('hide');
    if (passwordInput.checkValidity()) {
      passwordLengthFeedback.classList.add('hide');
      passwordUppercaseFeedback.classList.add('hide');
      passwordLowercaseFeedback.classList.add('hide');
      passwordNumberFeedback.classList.add('hide');
      passwordSpecialFeedback.classList.add('hide');
    } else {
      if (!passwordLengthCheck.test(passwordInput.value)) {
        passwordLengthFeedback.classList.remove('hide');
      } else passwordLengthFeedback.classList.add('hide');
      if (!passwordNumberCheck.test(passwordInput.value)) {
        passwordNumberFeedback.classList.remove('hide');
      } else passwordNumberFeedback.classList.add('hide');
      if (!passwordUppercaseCheck.test(passwordInput.value)) {
        passwordUppercaseFeedback.classList.remove('hide');
      } else passwordUppercaseFeedback.classList.add('hide');
      if (!passwordLowercaseCheck.test(passwordInput.value)) {
        passwordLowercaseFeedback.classList.remove('hide');
      } else passwordLowercaseFeedback.classList.add('hide');
      if (!passwordSpecialCheck.test(passwordInput.value)) {
        passwordSpecialFeedback.classList.remove('hide');
      } else passwordSpecialFeedback.classList.add('hide');
    }
    if (nameInput.checkValidity() && emailInput.checkValidity() && passwordInput.checkValidity()) {
      const init = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password
        })
      };
      fetch('/api/auth/signup', init)
        .then(res => res.json())
        .then(res => {
          props.history.push('/');
        });
    }
  };

  return (
    <>
      <div className="signup-container">
        <div className="signup-container__title">
          <span>Sign Up</span>
        </div>
        <div className="signup-container__username">
          <div className="signup-container__left">
            <label htmlFor="input-signup__username">Username</label>
          </div>
          <div className="signup-container__right">
            <div className="signup__input">
              <input type="text" name="input-signup__username" id="input-signup__username"
                pattern="^[\w]{6,30}" onChange={nameInputHandler} required onKeyPress={
                  e => {
                    if (e.key === 'Enter') submitHandler();
                  }
                } onBlur={nameInputWarning}/>
              <i className={`fas fa-check-circle ${validDisplay(isNameValid)}`}></i>
              <i className={`fas fa-times-circle ${invalidDisplay(isNameValid)}`}></i>
            </div>
          </div>
          <div className="signup-container__feedback">
            <span className="username-feedback__length hide">Username should be 6-30 characters long.</span>
            <span className="username-feedback__special hide">Username should not contain special symbol.</span>
          </div>
        </div>
        <div className="signup-container__email">
          <div className="signup-container__left">
            <label htmlFor="input-signup__email">Email</label>
          </div>
          <div className="signup-container__right">
            <div className="signup__input">
              <input type="email" name="input-signup__email" id="input-signup__email"
                onChange={emailInputHandler} required onKeyPress={
                  e => {
                    if (e.key === 'Enter') submitHandler();
                  }
                } onBlur={emailInputWarning}/>
              <i className={`fas fa-check-circle ${validDisplay(isEmailValid)}`}></i>
              <i className={`fas fa-times-circle ${invalidDisplay(isEmailValid)}`}></i>
            </div>
          </div>
          <div className="signup-container__feedback">
            <span className="email-feedback__format hide">Email format is incorrect.</span>
          </div>
        </div>
        <div className="signup-container__password">
          <div className="signup-container__left">
            <label htmlFor="input-signup__password">Password</label>
          </div>
          <div className="signup-container__right">
            <div className="signup__input">
              <input type="password" name="input-signup__password" id="input-signup__password"
                pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,32}$"
                onChange={passwordInputHandler} required onKeyPress={
                  e => {
                    if (e.key === 'Enter') submitHandler();
                  }
                } onBlur={passwordInputWarning}/>
              <i className={`fas fa-check-circle ${validDisplay(isPasswordValid)}`}></i>
              <i className={`fas fa-times-circle ${invalidDisplay(isPasswordValid)}`}></i>
            </div>
          </div>
          <div className="signup-container__feedback">
            <span className="password-feedback__length hide">Password needs at least 8 characters.</span>
            <span className="password-feedback__uppercase hide">Password needs at least 1 uppercase letter.</span>
            <span className="password-feedback__lowercase hide">Password needs at least 1 lowercase letter.</span>
            <span className="password-feedback__number hide">Password needs at least 1 number.</span>
            <span className="password-feedback__special hide">Password needs at least 1 special symbol.</span>
          </div>
        </div>
        <div className="signup-container__submit">
          <button type="button" onClick={submitHandler}>Sign Up</button>
        </div>
        <div className="signup-container__loginLink">
          <Link to='/' className='right'>Back to log in</Link>
        </div>
      </div>
    </>
  );
};

export default withRouter(Signup);

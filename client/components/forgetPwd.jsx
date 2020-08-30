import React from 'react';
import { Link } from 'react-router-dom';

const ForgetPwd = () => {
  const [email, setEmail] = React.useState('');

  const checkIsValid = () => {
    const emailInput = document.getElementById('email');
    const emailEmpty = document.getElementsByClassName('email-feedback__empty')[0];
    const emailFormat = document.getElementsByClassName('email-feedback__format')[0];
    const emailSent = document.getElementsByClassName('email-feedback__sent')[0];
    if (!email) {
      emailEmpty.classList.remove('hide');
      emailFormat.classList.add('hide');
      emailSent.classList.add('hide');
      return false;
    } else if (!emailInput.checkValidity()) {
      emailEmpty.classList.add('hide');
      emailFormat.classList.remove('hide');
      emailSent.classList.add('hide');
      return false;
    } else {
      emailEmpty.classList.add('hide');
      emailFormat.classList.add('hide');
      return true;
    }
  };

  const submitHandler = e => {
    e.preventDefault();
    if (checkIsValid()) {
      const init = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email
        })
      };
      fetch('/api/auth/reset', init)
        .then(res => res.json())
        .then(res => {
          document.getElementsByClassName('email-feedback__sent')[0].classList.remove('hide');
        });
    }
  };

  return (
    <div className='forgetPwd-container'>
      <div className="forgetPwd-container__title">
        <span>Reset Password</span>
      </div>
      <form noValidate onSubmit={submitHandler}>
        <div className="forgetPwd-container__main">
          <label htmlFor="email">Send a Email to Reset Password</label>
          <input type="email" id='email' name='email' required
            placeholder="Email address" onChange={
              e => setEmail(e.target.value)
            }
            onBlur={
              () => checkIsValid()
            }
            onKeyPress={
              e => {
                if (e.key === 'Enter') checkIsValid();
              }
            } />
          <div className="forgetPwd-container__feedback">
            <span className="email-feedback__empty hide">Email is required</span>
            <span className="email-feedback__format hide">Email format is invalid</span>
          </div>
          <div className="forgetPwd-container__sent">
            <span className="email-feedback__sent hide">Email sent to the provided address!</span>
          </div>
        </div>
        <div className='forgetPwd-container__submit'>
          <button type='submit'>Send Reset Email</button>
        </div>
        <div className="forgetPwd-container__loginLink">
          <Link to='/'>Back to Log In</Link>
        </div>
      </form>
    </div>
  );
};

export default ForgetPwd;

import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
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
              <input type="text" name="input-signup__username" id="input-signup__username" />
              <i className="fas fa-check-circle hide"></i>
              <i className="fas fa-times-circle hide"></i>
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
              <input type="text" name="input-signup__email" id="input-signup__email" />
              <i className="fas fa-check-circle hide"></i>
              <i className="fas fa-times-circle hide"></i>
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
              <input type="password" name="input-signup__password" id="input-signup__password" />
              <i className="fas fa-check-circle hide"></i>
              <i className="fas fa-times-circle hide"></i>
            </div>
          </div>
          <div className="signup-container__feedback">
            <span className="pwd-feedback__length hide">Password needs at least 8 characters.</span>
            <span className="pwd-feedback__uppercase hide">Password needs at least 1 uppercase letter.</span>
            <span className="pwd-feedback__lowercase hide">Password needs at least 1 lowercase letter.</span>
            <span className="pwd-feedback__number hide">Password needs at least 1 number.</span>
            <span className="pwd-feedback__special hide">Password needs at least 1 special symbol.</span>
          </div>
        </div>
        <div className="signup-container__submit">
          <button type="button">Sign Up</button>
        </div>
        <div className="signup-container__loginLink">
          <Link to='/' className='right'>Back to log in</Link>
        </div>
      </div>
    </>
  );
};

export default Signup;

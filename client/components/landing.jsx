import React from 'react';

const Landing = () => {
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
          <input type="text" name="userName" id="userName"/>
          <span className="landing-action__highlight"></span>
          <span className="landing-action__bar"></span>
          <label className="landing-action__label">Username</label>
        </div>
        <div className="landing-action__password">
          <input type="password" name="password" id="password"/>
          <span className="landing-action__highlight"></span>
          <span className="landing-action__bar"></span>
          <label className="landing-action__label">Password</label>
        </div>
        <div className="landing-action__forgetPwd">
          <span className="landing-action__forgetPwd__link">Forget password?</span>
        </div>
        <div className="landing-action__login">
          <button className="landing-action__login__button" type="button">Log in</button>
        </div>
        <div className="landing-action__signUpLink">
          <span className="landing-action__signUpLink__link">Don&apos;t have an account?</span>
          <span className="landing-action__signUpLink__link">Sign up</span>
        </div>
      </div>
    </div>
  );
};

export default Landing;

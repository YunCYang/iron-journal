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
          <span>An journal for RPG Ironsworn</span>
        </div>
      </div>
      <div className="landing-action"></div>
    </div>
  );
};

export default Landing;

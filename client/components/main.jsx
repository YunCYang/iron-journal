import React from 'react';
import { withRouter } from 'react-router-dom';

const Main = props => {
  const [isPage, setIsPage] = React.useState('game');

  const createPage = () => {
    if (isPage === 'game') {
      return (
        <>
          <div className="main-container__game__title sub-title">
            <span>New Game</span>
          </div>
          <div className="main-container__game__content">
            <div className="main-container__game__content__newBlock game-block">
              <i className="fas fa-plus"></i>
            </div>
          </div>
          <div className="main-container__game__title sub-title">
            <span>Existing Game</span>
          </div>
          <div className="main-container__game__content"></div>
        </>
      );
    } else if (isPage === 'resource') {
      return (
        <></>
      );
    } else if (isPage === 'option') {
      return (
        <>
          <div className="main-container__account">
            <div className="main-container__account__title sub-title">
              <span>Account</span>
            </div>
            <div className="main-container__account__content">
              <div className="main-container__account__content__left">
                <div className="account-email">
                  <span>Email</span>
                </div>
                <div className="account-password">
                  <span>Password</span>
                </div>
              </div>
              <div className="main-container__account__content__right">
                <div className="account-email"></div>
                <div className="account-password"></div>
              </div>
            </div>
          </div>
        </>
      );
    } else if (isPage === 'new') {
      return null;
    } else return null;
  };

  return (
    <div className="main-page">
      <div className="main-title">
        <span>Iron Journal</span>
      </div>
      <div className="main-menu">
        <div className="main-menu__game" onClick={() => setIsPage('game')}>
          <span>Game</span>
          <span className="bar"></span>
        </div>
        <div className="main-menu__resource" onClick={() => setIsPage('resource')}>
          <span>Resource</span>
          <span className="bar"></span>
        </div>
        <div className="main-menu__option" onClick={() => setIsPage('option')}>
          <span>Option</span>
          <span className="bar"></span>
        </div>
      </div>
      <div className="main-container">
        {createPage()}
      </div>
    </div>
  );
};

export default withRouter(Main);

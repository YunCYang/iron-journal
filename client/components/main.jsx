import React from 'react';
import { withRouter } from 'react-router-dom';

const Main = props => {
  const [isPage, setIsPage] = React.useState('game');

  const createNewGame = () => setIsPage('new');
  const returnGamePage = () => setIsPage('game');

  const createPage = () => {
    if (isPage === 'game') {
      return (
        <>
          <div className="main-container__game__title sub-title">
            <span>Game List</span>
          </div>
          <div className="main-container__game__content">
            <div className="main-container__game__content__container">
              <div className="main-container__game__content__newBlock game-block"
                onClick={
                  () => createNewGame()
                }>
                <i className="fas fa-plus"></i>
                <div className="main-container__game__content__newTag game-tag">
                  <span>New Game</span>
                </div>
              </div>
            </div>
          </div>
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
      return (
        <>
          <div className="main-container__newGame">
            <div className="main-container__newGame__title sub-title">
              <span>New Game</span>
            </div>
            <div className="main-container__newGame__backLink" onClick={
              () => returnGamePage()
            }>
              <i className="fas fa-long-arrow-alt-left"></i>
            </div>
            <div className="main-container__newGame__content">
              <div className="main-container__newGame__content__form">
                <div className="left">
                  <div className="Character">
                    <span>Character</span>
                  </div>
                  <div className="Experience">
                    <span>Experience</span>
                  </div>
                  <div className="Stats">
                    <span>Stats</span>
                  </div>
                  <div className="Bonds">
                    <span>Bonds</span>
                  </div>
                  <div className="Momentum">
                    <span>Momentum</span>
                  </div>
                  <div className="Health">
                    <span>Health</span>
                  </div>
                  <div className="Spirit">
                    <span>Spirit</span>
                  </div>
                  <div className="Supply">
                    <span>Supply</span>
                  </div>
                  <div className="Vows">
                    <span>Vows</span>
                  </div>
                  <div className="Debilities">
                    <span>Debilities</span>
                  </div>
                </div>
                <div className="right">
                  <div className="Character">
                    <input type="text" name="characterName" id="characterName"/>
                  </div>
                  <div className="Experience">
                    <input type="number" name="characterExperience" id="characterExperience"/>
                  </div>
                  <div className="Stats">
                    <input type="number" name="characterEdge" id="characterEdge"/>
                    <input type="number" name="characterHeart" id="characterHeart" />
                    <input type="number" name="characterIron" id="characterIron" />
                    <input type="number" name="characterShadow" id="characterShadow" />
                    <input type="number" name="characterWits" id="characterWits" />
                  </div>
                  <div className="Bonds">
                    <span>Bonds</span>
                  </div>
                  <div className="Momentum">
                    <span>Momentum</span>
                  </div>
                  <div className="Health">
                    <span>Health</span>
                  </div>
                  <div className="Spirit">
                    <span>Spirit</span>
                  </div>
                  <div className="Supply">
                    <span>Supply</span>
                  </div>
                  <div className="Vows">
                    <span>Vows</span>
                  </div>
                  <div className="Debilities">
                    <span>Debilities</span>
                  </div>
                </div>
              </div>
              <div className="main-container__newGame__content__confirm">
                <button>Create</button>
              </div>
            </div>
          </div>
        </>
      );
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

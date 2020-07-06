import React from 'react';
import { withRouter } from 'react-router-dom';
import NewCharacter from './newCharacter';
import Character from './character';
import { IdContext } from './app';

export const CharacterContext = React.createContext([]);

const Main = props => {
  // const [isPage, setIsPage] = React.useState('game');
  const [isPage, setIsPage] = React.useState('character');
  const id = React.useContext(IdContext);
  const [characterList, setCharacterList] = React.useState(
    sessionStorage.getItem('character') || []
  );

  React.useEffect(
    () => {
      const sessionId = sessionStorage.getItem('id');
      if ((!id.id && parseInt(id.id) !== 0) && (!sessionId && parseInt(sessionId) !== 0)) {
        props.history.push('/');
      }
    }
  );

  const createNewGame = () => setIsPage('new');
  const returnGamePage = () => setIsPage('game');
  const characterPage = () => setIsPage('character');

  const createPage = () => {
    if (isPage === 'game') {
      return (
        <>
          <div className="main-container__game__title sub-title">
            <span>Character List</span>
          </div>
          <div className="main-container__game__content">
            <div className="main-container__game__content__container">
              <div className="main-container__game__content__newBlock game-block"
                onClick={
                  () => createNewGame()
                }>
                <i className="fas fa-plus"></i>
                <div className="main-container__game__content__newTag game-tag">
                  <span>New Character</span>
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
          <NewCharacter returnGamePage={returnGamePage} characterPage={characterPage} />
        </>
      );
    } else if (isPage === 'character') {
      return (
        <>
          <Character />
        </>
      );
    } else return null;
  };

  return (
    <CharacterContext.Provider value={{ characterList, setCharacterList }}>
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
    </CharacterContext.Provider>
  );
};

export default withRouter(Main);

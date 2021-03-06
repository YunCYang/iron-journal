import React from 'react';
import { withRouter } from 'react-router-dom';
import NewCharacter from './newCharacter';
import Character from './character';
import { IdContext } from './app';
import AssetModal from './assetModal';

export const CharacterContext = React.createContext([]);

const Main = props => {
  const [isPage, setIsPage] = React.useState('game');
  const id = React.useContext(IdContext);
  const [characterList, setCharacterList] = React.useState([]);
  const [modalShown, setModalShown] = React.useState(false);
  const [selectedChar, setSelectedChar] = React.useState({});
  const [charListIndex, setCharListIndex] = React.useState(0);

  React.useEffect(
    () => {
      const sessionId = sessionStorage.getItem('id');
      if ((!id.id && parseInt(id.id) !== 0) && (!sessionId && parseInt(sessionId) !== 0)) {
        props.history.push('/');
      }
    }
  );

  React.useEffect(
    () => {
      if (parseInt(id.id) === 0 && parseInt(sessionStorage.getItem('id')) === 0) {
        setCharacterList(JSON.parse(sessionStorage.getItem('character')));
      } else {
        let tempId = 0;
        if (parseInt(id.id) !== 0) tempId = parseInt(id.id);
        else tempId = parseInt(sessionStorage.getItem('id'));
        fetch(`/api/character/all/${tempId}`)
          .then(res => res.json())
          .then(res => setCharacterList(res));
      }
    }, [isPage]
  );

  const showCharBlock = () => {
    // console.log(characterList);
    if (!characterList) {
      return null;
    } else {
      return (
        characterList.map((char, index) => {
          return (
            <div className="main-container__game__content__oldBlock game-block"
              key={`${char.characterName}-${index}`} onClick={
                () => {
                  characterPage();
                  setModalShown(false);
                  setSelectedChar(characterList[index]);
                  setCharListIndex(index);
                }
              }>
              <span>{char.characterName[0].toUpperCase()}</span>
              <div className="main-container__game__content__oldTag game-tag">
                <span>{char.characterName}</span>
              </div>
            </div>
          );
        })
      );
    }
  };

  const createNewGame = () => setIsPage('new');
  const returnGamePage = () => setIsPage('game');
  const characterPage = () => setIsPage('character');

  const displayShadow = () => {
    if (modalShown) return '';
    else return 'hide';
  };

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
                  () => {
                    if (!characterList) {
                      createNewGame();
                      setModalShown(false);
                    } else if (characterList.length >= 8) {
                      setModalShown(true);
                    } else {
                      createNewGame();
                      setModalShown(false);
                    }
                  }
                }>
                <i className="fas fa-plus"></i>
                <div className="main-container__game__content__newTag game-tag">
                  <span>New Character</span>
                </div>
              </div>
              {showCharBlock()}
              <div className={`modal-shadow ${displayShadow()}`} onClick={
                e => {
                  if (e.target.contains(document.getElementsByClassName('modal-shadow')[0])) {
                    setModalShown(false);
                  }
                }
              }>
                <AssetModal modalType="full" modalShown={modalShown}
                  setModalShown={setModalShown} activeAsset=''
                  assetState={{}}/>
              </div>
            </div>
          </div>
        </>
      );
    } else if (isPage === 'resource') {
      return (
        <>
          <div className="main-container__resource">
            <p>To learn more information, please check out the official website for Ironsworn.</p>
            <a href="https://www.ironswornrpg.com/">Ironsworn</a>
          </div>
        </>
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
          <NewCharacter returnGamePage={returnGamePage} characterPage={characterPage}
            modalShown={modalShown} setModalShown={setModalShown}/>
        </>
      );
    } else if (isPage === 'character') {
      return (
        <>
          <Character selectedChar={selectedChar} charListIndex={charListIndex}
            returnGamePage={returnGamePage} setCharacterList={setCharacterList}
            setSelectedChar={setSelectedChar}/>
        </>
      );
    } else return null;
  };

  return (
    <CharacterContext.Provider value={{ characterList, setCharacterList }}>
      <div className="main-page" onClick={
        e => {
          if (e.target.contains(document.getElementsByClassName('modal-shadow')[0])) {
            setModalShown(false);
          }
        }
      }>
        <div className="main-title">
          <span>Iron Journal</span>
        </div>
        <div className="main-menu">
          <div className="main-menu__game" onClick={() => {
            setIsPage('game');
            setModalShown(false);
          }}>
            <span>Game</span>
            <span className="bar"></span>
          </div>
          <div className="main-menu__resource" onClick={() => {
            setIsPage('resource');
            setModalShown(false);
          }}>
            <span>Resource</span>
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

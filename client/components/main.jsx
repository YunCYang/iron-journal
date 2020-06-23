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
          <div className="main-container__newGame">
            <div className="main-container__newGame__title sub-title">
              <span>New Character</span>
            </div>
            <div className="main-container__newGame__backLink" onClick={
              () => returnGamePage()
            }>
              <i className="fas fa-long-arrow-alt-left"></i>
            </div>
            <div className="main-container__newGame__content">
              <div className="main-container__newGame__content__form">
                <div className="character">
                  <div className="character-title subtitle">
                    <span>Character</span>
                  </div>
                  <div className="character-input__container input__container">
                    <div className="character-input__container__name">
                      <div className="input__container__left">
                        <span>Name</span>
                      </div>
                      <div className="input__container__right">
                        <input type="text" name="characterName" id="characterName" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="divider"></div>
                <div className="stats">
                  <div className="stats-title subtitle">
                    <span>Stats</span>
                  </div>
                  <div className="stats-input__container input__container">
                    <div className="stats-input__container__edge">
                      <div className="input__container__left">
                        <span>Edge</span>
                      </div>
                      <div className="input__container__right">
                        <input className="radio-stat__edge" type="radio" name="stat__edge-radio" id="stat__edge-1" />
                        <label className="label-stat__edge" htmlFor="stat__edge-1">
                          <span>1</span>
                        </label>
                        <input className="radio-stat__edge" type="radio" name="stat__edge-radio" id="stat__edge-2" />
                        <label className="label-stat__edge" htmlFor="stat__edge-2">
                          <span>2</span>
                        </label>
                        <input className="radio-stat__edge" type="radio" name="stat__edge-radio" id="stat__edge-3" />
                        <label className="label-stat__edge" htmlFor="stat__edge-3">
                          <span>3</span>
                        </label>
                      </div>
                    </div>
                    <div className="stats-input__container__heart">
                      <div className="input__container__left">
                        <span>Heart</span>
                      </div>
                      <div className="input__container__right">
                        <input className="radio-stat__heart" type="radio" name="stat__heart-radio" id="stat__heart-1" />
                        <label className="label-stat__heart" htmlFor="stat__heart-1">
                          <span>1</span>
                        </label>
                        <input className="radio-stat__heart" type="radio" name="stat__heart-radio" id="stat__heart-2" />
                        <label className="label-stat__heart" htmlFor="stat__heart-2">
                          <span>2</span>
                        </label>
                        <input className="radio-stat__heart" type="radio" name="stat__heart-radio" id="stat__heart-3" />
                        <label className="label-stat__heart" htmlFor="stat__heart-3">
                          <span>3</span>
                        </label>
                      </div>
                    </div>
                    <div className="stats-input__container__iron">
                      <div className="input__container__left">
                        <span>Iron</span>
                      </div>
                      <div className="input__container__right">
                        <input className="radio-stat__iron" type="radio" name="stat__iron-radio" id="stat__iron-1" />
                        <label className="label-stat__iron" htmlFor="stat__iron-1">
                          <span>1</span>
                        </label>
                        <input className="radio-stat__iron" type="radio" name="stat__iron-radio" id="stat__iron-2" />
                        <label className="label-stat__iron" htmlFor="stat__iron-2">
                          <span>2</span>
                        </label>
                        <input className="radio-stat__iron" type="radio" name="stat__iron-radio" id="stat__iron-3" />
                        <label className="label-stat__iron" htmlFor="stat__iron-3">
                          <span>3</span>
                        </label>
                      </div>
                    </div>
                    <div className="stats-input__container__shadow">
                      <div className="input__container__left">
                        <span>Shadow</span>
                      </div>
                      <div className="input__container__right">
                        <input className="radio-stat__shadow" type="radio" name="stat__shadow-radio" id="stat__shadow-1" />
                        <label className="label-stat__shadow" htmlFor="stat__shadow-1">
                          <span>1</span>
                        </label>
                        <input className="radio-stat__shadow" type="radio" name="stat__shadow-radio" id="stat__shadow-2" />
                        <label className="label-stat__shadow" htmlFor="stat__shadow-2">
                          <span>2</span>
                        </label>
                        <input className="radio-stat__shadow" type="radio" name="stat__shadow-radio" id="stat__shadow-3" />
                        <label className="label-stat__shadow" htmlFor="stat__shadow-3">
                          <span>3</span>
                        </label>
                      </div>
                    </div>
                    <div className="stats-input__container__wits">
                      <div className="input__container__left">
                        <span>Wits</span>
                      </div>
                      <div className="input__container__right">
                        <input className="radio-stat__wits" type="radio" name="stat__wits-radio" id="stat__wits-1" />
                        <label className="label-stat__wits" htmlFor="stat__wits-1">
                          <span>1</span>
                        </label>
                        <input className="radio-stat__wits" type="radio" name="stat__wits-radio" id="stat__wits-2" />
                        <label className="label-stat__wits" htmlFor="stat__wits-2">
                          <span>2</span>
                        </label>
                        <input className="radio-stat__wits" type="radio" name="stat__wits-radio" id="stat__wits-3" />
                        <label className="label-stat__wits" htmlFor="stat__wits-3">
                          <span>3</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="divider"></div>
                <div className="bonds">
                  <div className="bonds-title subtitle">
                    <span>Bonds</span>
                  </div>
                  <div className="bonds-input__container input__container">
                    <div className="bonds-input__container__name">
                      <div className="input__container__left">
                        <span>Name</span>
                      </div>
                      <div className="input__container__right">
                        <input type="text" name="bondName1" id="bondName1" />
                      </div>
                    </div>
                    <div className="bonds-input__container__name">
                      <div className="input__container__left">
                        <span>Name</span>
                      </div>
                      <div className="input__container__right">
                        <input type="text" name="bondName2" id="bondName2" />
                      </div>
                    </div>
                    <div className="bonds-input__container__name">
                      <div className="input__container__left">
                        <span>Name</span>
                      </div>
                      <div className="input__container__right">
                        <input type="text" name="bondName3" id="bondName3" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="divider"></div>
                <div className="vows">
                  <div className="vows-title subtitle">
                    <span>Vows</span>
                  </div>
                  <div className="vows-input__container input__container">
                    <div className="vows-input__container__name">
                      <div className="input__container__left">
                        <span>Name</span>
                      </div>
                      <div className="input__container__right">
                        <input type="text" name="vowName1" id="vowName1" />
                      </div>
                    </div>
                    <div className="vows-input__container__rank">
                      <div className="input__container__left">
                        <span>Rank</span>
                      </div>
                      <div className="input__container__right">
                        <input className="radio-vow1" type="radio" name="rank1-radio" id="rank1-troublesome"/>
                        <label className="label-vow1" htmlFor="rank1-troublesome">
                          <span>Troublesome</span>
                        </label>
                        <input className="radio-vow1" type="radio" name="rank1-radio" id="rank1-dangerous" />
                        <label className="label-vow1" htmlFor="rank1-dangerous">
                          <span>Dangerous</span>
                        </label>
                        <input className="radio-vow1" type="radio" name="rank1-radio" id="rank1-formidable" />
                        <label className="label-vow1" htmlFor="rank1-formidable">
                          <span>Formidable</span>
                        </label>
                        <input className="radio-vow1" type="radio" name="rank1-radio" id="rank1-extreme" />
                        <label className="label-vow1" htmlFor="rank1-extreme">
                          <span>Extreme</span>
                        </label>
                        <input className="radio-vow1" type="radio" name="rank1-radio" id="rank1-epic" />
                        <label className="label-vow1" htmlFor="rank1-epic">
                          <span>Epic</span>
                        </label>
                      </div>
                    </div>
                    <div className="vows-input__container__name">
                      <div className="input__container__left">
                        <span>Name</span>
                      </div>
                      <div className="input__container__right">
                        <input type="text" name="vowName2" id="vowName2" />
                      </div>
                    </div>
                    <div className="vows-input__container__rank">
                      <div className="input__container__left">
                        <span>Rank</span>
                      </div>
                      <div className="input__container__right">
                        <input className="radio-vow2" type="radio" name="rank2-radio" id="rank2-troublesome" />
                        <label className="label-vow2" htmlFor="rank2-troublesome">
                          <span>Troublesome</span>
                        </label>
                        <input className="radio-vow2" type="radio" name="rank2-radio" id="rank2-dangerous" />
                        <label className="label-vow2" htmlFor="rank2-dangerous">
                          <span>Dangerous</span>
                        </label>
                        <input className="radio-vow2" type="radio" name="rank2-radio" id="rank2-formidable" />
                        <label className="label-vow2" htmlFor="rank2-formidable">
                          <span>Formidable</span>
                        </label>
                        <input className="radio-vow2" type="radio" name="rank2-radio" id="rank2-extreme"/>
                        <label className="label-vow2" htmlFor="rank2-extreme">
                          <span>Extreme</span>
                        </label>
                        <input className="radio-vow2" type="radio" name="rank2-radio" id="rank2-epic" />
                        <label className="label-vow2" htmlFor="rank2-epic">
                          <span>Epic</span>
                        </label>
                      </div>
                    </div>
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

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
                        <input type="radio" name="statsEdge" id="statsEdge__1" value="1"/>
                        <label htmlFor="statsEdge__1">1</label>
                        <input type="radio" name="statsEdge" id="statsEdge__2" value="2"/>
                        <label htmlFor="statsEdge__2">2</label>
                        <input type="radio" name="statsEdge" id="statsEdge__3" value="3"/>
                        <label htmlFor="statsEdge__3">3</label>
                      </div>
                    </div>
                    <div className="stats-input__container__heart">
                      <div className="input__container__left">
                        <span>Heart</span>
                      </div>
                      <div className="input__container__right">
                        <input type="radio" name="statsHeart" id="statsHeart__1" value="1"/>
                        <label htmlFor="statsHeart__1">1</label>
                        <input type="radio" name="statsHeart" id="statsHeart__2" value="2"/>
                        <label htmlFor="statsHeart__2">2</label>
                        <input type="radio" name="statsHeart" id="statsHeart__3" value="3"/>
                        <label htmlFor="statsHeart__3">3</label>
                      </div>
                    </div>
                    <div className="stats-input__container__iron">
                      <div className="input__container__left">
                        <span>Iron</span>
                      </div>
                      <div className="input__container__right">
                        <input type="radio" name="statsIron" id="statsIron__1" value="1"/>
                        <label htmlFor="statsIron__1">1</label>
                        <input type="radio" name="statsIron" id="statsIron__2" value="2"/>
                        <label htmlFor="statsIron__2">2</label>
                        <input type="radio" name="statsIron" id="statsIron__3" value="3"/>
                        <label htmlFor="statsIron__3">3</label>
                      </div>
                    </div>
                    <div className="stats-input__container__shadow">
                      <div className="input__container__left">
                        <span>Shadow</span>
                      </div>
                      <div className="input__container__right">
                        <input type="radio" name="statsShadow" id="statsShadow__1" value="1"/>
                        <label htmlFor="statsShadow__1">1</label>
                        <input type="radio" name="statsShadow" id="statsShadow__2" value="2"/>
                        <label htmlFor="statsShadow__2">2</label>
                        <input type="radio" name="statsShadow" id="statsShadow__3" value="3"/>
                        <label htmlFor="statsShadow__3">3</label>
                      </div>
                    </div>
                    <div className="stats-input__container__wits">
                      <div className="input__container__left">
                        <span>Wits</span>
                      </div>
                      <div className="input__container__right">
                        <input type="radio" name="statsWits" id="statsWits__1" value="1"/>
                        <label htmlFor="statsWits__1">1</label>
                        <input type="radio" name="statsWits" id="statsWits__2" value="2"/>
                        <label htmlFor="statsWits__2">2</label>
                        <input type="radio" name="statsWits" id="statsWits__3" value="3"/>
                        <label htmlFor="statsWits__3">3</label>
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
                        <input className="radio-vow1" type="radio" name="rank1-troublesome" id="rank1-troublesome" />
                        <label className="label-vow1" htmlFor="rank1-troublesome">Troublesome</label>
                        <input className="radio-vow1" type="radio" name="rank1-dangerous" id="rank1-dangerous" />
                        <label className="label-vow1" htmlFor="rank1-dangerous">Dangerous</label>
                        <input className="radio-vow1" type="radio" name="rank1-formidable" id="rank1-formidable" />
                        <label className="label-vow1" htmlFor="rank1-formidable">Formidable</label>
                        <input className="radio-vow1" type="radio" name="rank1-extreme" id="rank1-extreme" />
                        <label className="label-vow1" htmlFor="rank1-extreme">Extreme</label>
                        <input className="radio-vow1" type="radio" name="rank1-epic" id="rank1-epic" />
                        <label className="label-vow1" htmlFor="rank1-epic">Epic</label>
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
                        <input className="radio-vow2" type="radio" name="rank2-troublesome" id="rank2-troublesome" />
                        <label className="label-vow2" htmlFor="rank2-troublesome">Troublesome</label>
                        <input className="radio-vow2" type="radio" name="rank2-dangerous" id="rank2-dangerous" />
                        <label className="label-vow2" htmlFor="rank2-dangerous">Dangerous</label>
                        <input className="radio-vow2" type="radio" name="rank2-formidable" id="rank2-formidable" />
                        <label className="label-vow2" htmlFor="rank2-formidable">Formidable</label>
                        <input className="radio-vow2" type="radio" name="rank2-extreme" id="rank2-extreme" />
                        <label className="label-vow2" htmlFor="rank2-extreme">Extreme</label>
                        <input className="radio-vow2" type="radio" name="rank2-epic" id="rank2-epic" />
                        <label className="label-vow2" htmlFor="rank2-epic">Epic</label>
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

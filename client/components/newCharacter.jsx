import React from 'react';

const NewCharacter = props => {
  const validateInput = () => {
    const inputCharName = document.getElementById('input-characterName');
    const inputVowName1 = document.getElementById('input-vowName1');
    const inputVowName2 = document.getElementById('input-vowName2');
    if (inputCharName.checkValidity() && inputVowName1.checkValidity() && inputVowName2.checkValidity()) {
      return true;
    } else {
      return false;
    }
  };
  const createHandler = () => {
    validateInput();
    return null;
  };

  return (
    <>
      <div className="main-container__newGame">
        <div className="main-container__newGame__title sub-title">
          <span>New Character</span>
        </div>
        <div className="main-container__newGame__backLink" onClick={
          () => props.returnGamePage()
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
                    <input type="text" name="characterName" id="input-characterName" required />
                    <div className="newGame-character__feedback">
                      <span id='character-feedback__empty' className="empty hide">Character name is required.</span>
                    </div>
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
                    <input className="radio-stat__edge" type="radio" name="stat__edge-radio" id="radio-stat__edge__1" />
                    <label className="label-stat__edge" htmlFor="radio-stat__edge__1">
                      <span>1</span>
                    </label>
                    <input className="radio-stat__edge" type="radio" name="stat__edge-radio" id="radio-stat__edge__2" />
                    <label className="label-stat__edge" htmlFor="radio-stat__edge__2">
                      <span>2</span>
                    </label>
                    <input className="radio-stat__edge" type="radio" name="stat__edge-radio" id="radio-stat__edge__3" />
                    <label className="label-stat__edge" htmlFor="radio-stat__edge__3">
                      <span>3</span>
                    </label>
                  </div>
                </div>
                <div className="stats-input__container__heart">
                  <div className="input__container__left">
                    <span>Heart</span>
                  </div>
                  <div className="input__container__right">
                    <input className="radio-stat__heart" type="radio" name="stat__heart-radio" id="radio-stat__heart__1" />
                    <label className="label-stat__heart" htmlFor="radio-stat__heart__1">
                      <span>1</span>
                    </label>
                    <input className="radio-stat__heart" type="radio" name="stat__heart-radio" id="radio-stat__heart__2" />
                    <label className="label-stat__heart" htmlFor="radio-stat__heart__2">
                      <span>2</span>
                    </label>
                    <input className="radio-stat__heart" type="radio" name="stat__heart-radio" id="radio-stat__heart__3" />
                    <label className="label-stat__heart" htmlFor="radio-stat__heart__3">
                      <span>3</span>
                    </label>
                  </div>
                </div>
                <div className="stats-input__container__iron">
                  <div className="input__container__left">
                    <span>Iron</span>
                  </div>
                  <div className="input__container__right">
                    <input className="radio-stat__iron" type="radio" name="stat__iron-radio" id="radio-stat__iron__1" />
                    <label className="label-stat__iron" htmlFor="radio-stat__iron__1">
                      <span>1</span>
                    </label>
                    <input className="radio-stat__iron" type="radio" name="stat__iron-radio" id="radio-stat__iron__2" />
                    <label className="label-stat__iron" htmlFor="radio-stat__iron__2">
                      <span>2</span>
                    </label>
                    <input className="radio-stat__iron" type="radio" name="stat__iron-radio" id="radio-stat__iron__3" />
                    <label className="label-stat__iron" htmlFor="radio-stat__iron__3">
                      <span>3</span>
                    </label>
                  </div>
                </div>
                <div className="stats-input__container__shadow">
                  <div className="input__container__left">
                    <span>Shadow</span>
                  </div>
                  <div className="input__container__right">
                    <input className="radio-stat__shadow" type="radio" name="stat__shadow-radio" id="radio-stat__shadow__1" />
                    <label className="label-stat__shadow" htmlFor="radio-stat__shadow__1">
                      <span>1</span>
                    </label>
                    <input className="radio-stat__shadow" type="radio" name="stat__shadow-radio" id="radio-stat__shadow__2" />
                    <label className="label-stat__shadow" htmlFor="radio-stat__shadow__2">
                      <span>2</span>
                    </label>
                    <input className="radio-stat__shadow" type="radio" name="stat__shadow-radio" id="radio-stat__shadow__3" />
                    <label className="label-stat__shadow" htmlFor="radio-stat__shadow__3">
                      <span>3</span>
                    </label>
                  </div>
                </div>
                <div className="stats-input__container__wits">
                  <div className="input__container__left">
                    <span>Wits</span>
                  </div>
                  <div className="input__container__right">
                    <input className="radio-stat__wits" type="radio" name="stat__wits-radio" id="radio-stat__wits__1" />
                    <label className="label-stat__wits" htmlFor="radio-stat__wits__1">
                      <span>1</span>
                    </label>
                    <input className="radio-stat__wits" type="radio" name="stat__wits-radio" id="radio-stat__wits__2" />
                    <label className="label-stat__wits" htmlFor="radio-stat__wits__2">
                      <span>2</span>
                    </label>
                    <input className="radio-stat__wits" type="radio" name="stat__wits-radio" id="radio-stat__wits__3" />
                    <label className="label-stat__wits" htmlFor="radio-stat__wits__3">
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
                    <span>1st Bond</span>
                  </div>
                  <div className="input__container__right">
                    <input type="text" name="bondName1" id="input-bondName1" />
                  </div>
                </div>
                <div className="bonds-input__container__name">
                  <div className="input__container__left">
                    <span>2nd Bond</span>
                  </div>
                  <div className="input__container__right">
                    <input type="text" name="bondName2" id="input-bondName2" />
                  </div>
                </div>
                <div className="bonds-input__container__name">
                  <div className="input__container__left">
                    <span>3rd Bond</span>
                  </div>
                  <div className="input__container__right">
                    <input type="text" name="bondName3" id="input-bondName3" />
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
                    <span>1st Vow</span>
                  </div>
                  <div className="input__container__right">
                    <input type="text" name="vowName1" id="input-vowName1" required/>
                  </div>
                </div>
                <div className="vows-input__container__rank">
                  <div className="input__container__left">
                    <span>Rank</span>
                  </div>
                  <div className="input__container__right">
                    <input className="radio-vow1" type="radio" name="rank1-radio" id="radio-rank__trouble__1" />
                    <label className="label-vow1" htmlFor="radio-rank__trouble__1">
                      <span>Troublesome</span>
                    </label>
                    <input className="radio-vow1" type="radio" name="rank1-radio" id="radio-rank__dangerous__1" />
                    <label className="label-vow1" htmlFor="radio-rank__dangerous__1">
                      <span>Dangerous</span>
                    </label>
                    <input className="radio-vow1" type="radio" name="rank1-radio" id="radio-rank__formidable__1" />
                    <label className="label-vow1" htmlFor="radio-rank__formidable__1">
                      <span>Formidable</span>
                    </label>
                    <input className="radio-vow1" type="radio" name="rank1-radio" id="radio-rank__extreme__1" />
                    <label className="label-vow1" htmlFor="radio-rank__extreme__1">
                      <span>Extreme</span>
                    </label>
                    <input className="radio-vow1" type="radio" name="rank1-radio" id="radio-rank__epic__1" />
                    <label className="label-vow1" htmlFor="radio-rank__epic__1">
                      <span>Epic</span>
                    </label>
                  </div>
                </div>
                <div className="vows-input__container__name">
                  <div className="input__container__left">
                    <span>2nd Vow</span>
                  </div>
                  <div className="input__container__right">
                    <input type="text" name="vowName2" id="input-vowName2" required/>
                  </div>
                </div>
                <div className="vows-input__container__rank">
                  <div className="input__container__left">
                    <span>Rank</span>
                  </div>
                  <div className="input__container__right">
                    <input className="radio-vow2" type="radio" name="rank2-radio" id="radio-rank__troublesome__2" />
                    <label className="label-vow2" htmlFor="radio-rank__troublesome__2">
                      <span>Troublesome</span>
                    </label>
                    <input className="radio-vow2" type="radio" name="rank2-radio" id="radio-rank__dangerous__2" />
                    <label className="label-vow2" htmlFor="radio-rank__dangerous__2">
                      <span>Dangerous</span>
                    </label>
                    <input className="radio-vow2" type="radio" name="rank2-radio" id="radio-rank__formidable__2" />
                    <label className="label-vow2" htmlFor="radio-rank__formidable__2">
                      <span>Formidable</span>
                    </label>
                    <input className="radio-vow2" type="radio" name="rank2-radio" id="radio-rank__extreme__2" />
                    <label className="label-vow2" htmlFor="radio-rank__extreme__2">
                      <span>Extreme</span>
                    </label>
                    <input className="radio-vow2" type="radio" name="rank2-radio" id="radio-rank__epic__2" />
                    <label className="label-vow2" htmlFor="radio-rank__epic__2">
                      <span>Epic</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-container__newGame__content__confirm">
            <button type="button" onClick={createHandler}>Create</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewCharacter;

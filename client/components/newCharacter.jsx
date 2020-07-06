import React from 'react';
import { IdContext } from './app';
import { CharacterContext } from './main';

const NewCharacter = props => {
  const id = React.useContext(IdContext);
  const charList = React.useContext(CharacterContext);

  const [nameState, setNameState] = React.useState('');
  const [statState, setStatState] = React.useState({
    edge: 0,
    heart: 0,
    iron: 0,
    shadow: 0,
    wits: 0
  });
  const [bondState, setBondState] = React.useState({
    bond1: '',
    bond2: '',
    bond3: ''
  });
  const [vowState, setVowState] = React.useState({
    vow1Name: '',
    vow1Rank: 0,
    vow2Name: '',
    vow2Rank: 0
  });

  const rankEdgeCheck = () => {
    const radioEdge1 = document.getElementById('radio-stat__edge__1');
    const radioEdge2 = document.getElementById('radio-stat__edge__2');
    const radioEdge3 = document.getElementById('radio-stat__edge__3');
    if (radioEdge1.checked || radioEdge2.checked || radioEdge3.checked) {
      return true;
    } else return false;
  };

  const rankHeartCheck = () => {
    const radioHeart1 = document.getElementById('radio-stat__heart__1');
    const radioHeart2 = document.getElementById('radio-stat__heart__2');
    const radioHeart3 = document.getElementById('radio-stat__heart__3');
    if (radioHeart1.checked || radioHeart2.checked || radioHeart3.checked) {
      return true;
    } else return false;
  };

  const rankIronCheck = () => {
    const radioIron1 = document.getElementById('radio-stat__iron__1');
    const radioIron2 = document.getElementById('radio-stat__iron__2');
    const radioIron3 = document.getElementById('radio-stat__iron__3');
    if (radioIron1.checked || radioIron2.checked || radioIron3.checked) {
      return true;
    } else return false;
  };

  const rankShadowCheck = () => {
    const radioShadow1 = document.getElementById('radio-stat__shadow__1');
    const radioShadow2 = document.getElementById('radio-stat__shadow__2');
    const radioShadow3 = document.getElementById('radio-stat__shadow__3');
    if (radioShadow1.checked || radioShadow2.checked || radioShadow3.checked) {
      return true;
    } else return false;
  };

  const rankWitsCheck = () => {
    const radioWits1 = document.getElementById('radio-stat__wits__1');
    const radioWits2 = document.getElementById('radio-stat__wits__2');
    const radioWits3 = document.getElementById('radio-stat__wits__3');
    if (radioWits1.checked || radioWits2.checked || radioWits3.checked) {
      return true;
    } else return false;
  };

  const vow1Check = () => {
    const radioTroublesome1 = document.getElementById('radio-rank__troublesome__1');
    const radioDangerous1 = document.getElementById('radio-rank__dangerous__1');
    const radioFormidable1 = document.getElementById('radio-rank__formidable__1');
    const radioExtreme1 = document.getElementById('radio-rank__extreme__1');
    const radioEpic1 = document.getElementById('radio-rank__epic__1');
    if (radioTroublesome1.checked || radioDangerous1.checked || radioFormidable1.checked ||
      radioExtreme1.checked || radioEpic1.checked) {
      return true;
    } else return false;
  };

  const vow2Check = () => {
    const radioTroublesome2 = document.getElementById('radio-rank__troublesome__2');
    const radioDangerous2 = document.getElementById('radio-rank__dangerous__2');
    const radioFormidable2 = document.getElementById('radio-rank__formidable__2');
    const radioExtreme2 = document.getElementById('radio-rank__extreme__2');
    const radioEpic2 = document.getElementById('radio-rank__epic__2');
    if (radioTroublesome2.checked || radioDangerous2.checked || radioFormidable2.checked ||
      radioExtreme2.checked || radioEpic2.checked) {
      return true;
    } else return false;
  };

  const validateInput = () => {
    const inputCharName = document.getElementById('input-characterName');
    const inputVowName1 = document.getElementById('input-vowName1');
    const inputVowName2 = document.getElementById('input-vowName2');
    if (inputCharName.checkValidity() && inputVowName1.checkValidity() &&
      (rankEdgeCheck() && rankHeartCheck() && rankIronCheck() && rankShadowCheck() && rankWitsCheck()) &&
      inputVowName2.checkValidity() && vow1Check() && vow2Check()) {
      return true;
    } else {
      return false;
    }
  };

  const createHandler = () => {
    const inputCharName = document.getElementById('input-characterName');
    const inputVow1Name = document.getElementById('input-vowName1');
    const inputVow2Name = document.getElementById('input-vowName2');
    const emptyCharName = document.getElementById('character-feedback__empty');
    const emptyVow1Name = document.getElementById('vowName1-feedback__empty');
    const emptyVow2Name = document.getElementById('vowName2-feedback__empty');
    const emptyStatsEdge = document.getElementById('statsEdge-feedback__empty');
    const emptyStatsHeart = document.getElementById('statsHeart-feedback__empty');
    const emptyStatsIron = document.getElementById('statsIron-feedback__empty');
    const emptyStatsShadow = document.getElementById('statsShadow-feedback__empty');
    const emptyStatsWits = document.getElementById('statsWits-feedback__empty');
    const emptyVow1Rank = document.getElementById('vowRank1-feedback__empty');
    const emptyVow2Rank = document.getElementById('vowRank2-feedback__empty');
    if (validateInput()) {
      if (id.id === '0') {
        sessionStorage.setItem('character', null);
        charList.setCharacterList(null);
        if (nameState) return null; // just so I can commit
      } else {
        return null;
      }
      props.characterPage();
    } else {
      if (!inputCharName.checkValidity()) emptyCharName.classList.remove('hide');
      if (!inputVow1Name.checkValidity()) emptyVow1Name.classList.remove('hide');
      if (!inputVow2Name.checkValidity()) emptyVow2Name.classList.remove('hide');
      if (!rankEdgeCheck()) emptyStatsEdge.classList.remove('hide');
      if (!rankHeartCheck()) emptyStatsHeart.classList.remove('hide');
      if (!rankIronCheck()) emptyStatsIron.classList.remove('hide');
      if (!rankShadowCheck()) emptyStatsShadow.classList.remove('hide');
      if (!rankWitsCheck()) emptyStatsWits.classList.remove('hide');
      if (!vow1Check()) emptyVow1Rank.classList.remove('hide');
      if (!vow2Check()) emptyVow2Rank.classList.remove('hide');
    }
  };

  const inputFeedbackHandler = (feedbackId, inputId) => {
    const emptyStatsEdge = document.getElementById('statsEdge-feedback__empty');
    const emptyStatsHeart = document.getElementById('statsHeart-feedback__empty');
    const emptyStatsIron = document.getElementById('statsIron-feedback__empty');
    const emptyStatsShadow = document.getElementById('statsShadow-feedback__empty');
    const emptyStatsWits = document.getElementById('statsWits-feedback__empty');
    const emptyVow1Rank = document.getElementById('vowRank1-feedback__empty');
    const emptyVow2Rank = document.getElementById('vowRank2-feedback__empty');
    if (inputId) {
      if (document.getElementById(inputId).checkValidity()) {
        document.getElementById(feedbackId).classList.add('hide');
      }
    } else {
      if (rankEdgeCheck()) emptyStatsEdge.classList.add('hide');
      if (rankHeartCheck()) emptyStatsHeart.classList.add('hide');
      if (rankIronCheck()) emptyStatsIron.classList.add('hide');
      if (rankShadowCheck()) emptyStatsShadow.classList.add('hide');
      if (rankWitsCheck()) emptyStatsWits.classList.add('hide');
      if (vow1Check()) emptyVow1Rank.classList.add('hide');
      if (vow2Check()) emptyVow2Rank.classList.add('hide');
    }
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
                    <input type="text" name="characterName" id="input-characterName" required
                      onChange={
                        e => {
                          setNameState(e.target.value);
                          inputFeedbackHandler('character-feedback__empty', 'input-characterName');
                        }
                      }/>
                    <div className="newGame__feedback">
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
                    <input className="radio-stat__edge" type="radio" name="stat__edge-radio" id="radio-stat__edge__1"
                      onChange={
                        e => {
                          if (e.target.value === 'on') {
                            setStatState({
                              ...statState,
                              edge: 1
                            });
                          }
                          inputFeedbackHandler('statsEdge-feedback__empty');
                        }
                      }/>
                    <label className="label-stat__edge" htmlFor="radio-stat__edge__1">
                      <span>1</span>
                    </label>
                    <input className="radio-stat__edge" type="radio" name="stat__edge-radio" id="radio-stat__edge__2"
                      onChange={
                        e => {
                          if (e.target.value === 'on') {
                            setStatState({
                              ...statState,
                              edge: 2
                            });
                          }
                          inputFeedbackHandler('statsEdge-feedback__empty');
                        }
                      }/>
                    <label className="label-stat__edge" htmlFor="radio-stat__edge__2">
                      <span>2</span>
                    </label>
                    <input className="radio-stat__edge" type="radio" name="stat__edge-radio" id="radio-stat__edge__3"
                      onChange={
                        e => {
                          if (e.target.value === 'on') {
                            setStatState({
                              ...statState,
                              edge: 3
                            });
                          }
                          inputFeedbackHandler('statsEdge-feedback__empty');
                        }
                      }/>
                    <label className="label-stat__edge" htmlFor="radio-stat__edge__3">
                      <span>3</span>
                    </label>
                    <div className="newGame__feedback">
                      <span id='statsEdge-feedback__empty' className="empty hide">Stat for Edge is required.</span>
                    </div>
                  </div>
                </div>
                <div className="stats-input__container__heart">
                  <div className="input__container__left">
                    <span>Heart</span>
                  </div>
                  <div className="input__container__right">
                    <input className="radio-stat__heart" type="radio" name="stat__heart-radio" id="radio-stat__heart__1"
                      onChange={
                        e => {
                          if (e.target.value === 'on') {
                            setStatState({
                              ...statState,
                              heart: 1
                            });
                          }
                          inputFeedbackHandler('statsHeart-feedback__empty');
                        }
                      }/>
                    <label className="label-stat__heart" htmlFor="radio-stat__heart__1">
                      <span>1</span>
                    </label>
                    <input className="radio-stat__heart" type="radio" name="stat__heart-radio" id="radio-stat__heart__2"
                      onChange={
                        e => {
                          if (e.target.value === 'on') {
                            setStatState({
                              ...statState,
                              heart: 2
                            });
                          }
                          inputFeedbackHandler('statsHeart-feedback__empty');
                        }
                      }/>
                    <label className="label-stat__heart" htmlFor="radio-stat__heart__2">
                      <span>2</span>
                    </label>
                    <input className="radio-stat__heart" type="radio" name="stat__heart-radio" id="radio-stat__heart__3"
                      onChange={
                        e => {
                          if (e.target.value === 'on') {
                            setStatState({
                              ...statState,
                              heart: 3
                            });
                          }
                          inputFeedbackHandler('statsHeart-feedback__empty');
                        }
                      }/>
                    <label className="label-stat__heart" htmlFor="radio-stat__heart__3">
                      <span>3</span>
                    </label>
                    <div className="newGame__feedback">
                      <span id='statsHeart-feedback__empty' className="empty hide">Stat for Heart is required.</span>
                    </div>
                  </div>
                </div>
                <div className="stats-input__container__iron">
                  <div className="input__container__left">
                    <span>Iron</span>
                  </div>
                  <div className="input__container__right">
                    <input className="radio-stat__iron" type="radio" name="stat__iron-radio" id="radio-stat__iron__1"
                      onChange={
                        e => {
                          if (e.target.value === 'on') {
                            setStatState({
                              ...statState,
                              iron: 1
                            });
                          }
                          inputFeedbackHandler('statsHeart-feedback__empty');
                        }
                      }/>
                    <label className="label-stat__iron" htmlFor="radio-stat__iron__1">
                      <span>1</span>
                    </label>
                    <input className="radio-stat__iron" type="radio" name="stat__iron-radio" id="radio-stat__iron__2"
                      onChange={
                        e => {
                          if (e.target.value === 'on') {
                            setStatState({
                              ...statState,
                              iron: 2
                            });
                          }
                          inputFeedbackHandler('statsHeart-feedback__empty');
                        }
                      }/>
                    <label className="label-stat__iron" htmlFor="radio-stat__iron__2">
                      <span>2</span>
                    </label>
                    <input className="radio-stat__iron" type="radio" name="stat__iron-radio" id="radio-stat__iron__3"
                      onChange={
                        e => {
                          if (e.target.value === 'on') {
                            setStatState({
                              ...statState,
                              iron: 3
                            });
                          }
                          inputFeedbackHandler('statsHeart-feedback__empty');
                        }
                      }/>
                    <label className="label-stat__iron" htmlFor="radio-stat__iron__3">
                      <span>3</span>
                    </label>
                    <div className="newGame__feedback">
                      <span id='statsIron-feedback__empty' className="empty hide">Stat for Iron is required.</span>
                    </div>
                  </div>
                </div>
                <div className="stats-input__container__shadow">
                  <div className="input__container__left">
                    <span>Shadow</span>
                  </div>
                  <div className="input__container__right">
                    <input className="radio-stat__shadow" type="radio" name="stat__shadow-radio" id="radio-stat__shadow__1"
                      onChange={
                        e => {
                          if (e.target.value === 'on') {
                            setStatState({
                              ...statState,
                              shadow: 1
                            });
                          }
                          inputFeedbackHandler('statsHeart-feedback__empty');
                        }
                      }/>
                    <label className="label-stat__shadow" htmlFor="radio-stat__shadow__1">
                      <span>1</span>
                    </label>
                    <input className="radio-stat__shadow" type="radio" name="stat__shadow-radio" id="radio-stat__shadow__2"
                      onChange={
                        e => {
                          if (e.target.value === 'on') {
                            setStatState({
                              ...statState,
                              shadow: 2
                            });
                          }
                          inputFeedbackHandler('statsHeart-feedback__empty');
                        }
                      }/>
                    <label className="label-stat__shadow" htmlFor="radio-stat__shadow__2">
                      <span>2</span>
                    </label>
                    <input className="radio-stat__shadow" type="radio" name="stat__shadow-radio" id="radio-stat__shadow__3"
                      onChange={
                        e => {
                          if (e.target.value === 'on') {
                            setStatState({
                              ...statState,
                              shadow: 3
                            });
                          }
                          inputFeedbackHandler('statsHeart-feedback__empty');
                        }
                      }/>
                    <label className="label-stat__shadow" htmlFor="radio-stat__shadow__3">
                      <span>3</span>
                    </label>
                    <div className="newGame__feedback">
                      <span id='statsShadow-feedback__empty' className="empty hide">Stat for Shadow is required.</span>
                    </div>
                  </div>
                </div>
                <div className="stats-input__container__wits">
                  <div className="input__container__left">
                    <span>Wits</span>
                  </div>
                  <div className="input__container__right">
                    <input className="radio-stat__wits" type="radio" name="stat__wits-radio" id="radio-stat__wits__1"
                      onChange={
                        e => {
                          if (e.target.value === 'on') {
                            setStatState({
                              ...statState,
                              wits: 1
                            });
                          }
                          inputFeedbackHandler('statsHeart-feedback__empty');
                        }
                      }/>
                    <label className="label-stat__wits" htmlFor="radio-stat__wits__1">
                      <span>1</span>
                    </label>
                    <input className="radio-stat__wits" type="radio" name="stat__wits-radio" id="radio-stat__wits__2"
                      onChange={
                        e => {
                          if (e.target.value === 'on') {
                            setStatState({
                              ...statState,
                              wits: 2
                            });
                          }
                          inputFeedbackHandler('statsHeart-feedback__empty');
                        }
                      }/>
                    <label className="label-stat__wits" htmlFor="radio-stat__wits__2">
                      <span>2</span>
                    </label>
                    <input className="radio-stat__wits" type="radio" name="stat__wits-radio" id="radio-stat__wits__3"
                      onChange={
                        e => {
                          if (e.target.value === 'on') {
                            setStatState({
                              ...statState,
                              wits: 3
                            });
                          }
                          inputFeedbackHandler('statsHeart-feedback__empty');
                        }
                      }/>
                    <label className="label-stat__wits" htmlFor="radio-stat__wits__3">
                      <span>3</span>
                    </label>
                    <div className="newGame__feedback">
                      <span id='statsWits-feedback__empty' className="empty hide">Stat for Wits is required.</span>
                    </div>
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
                    <input type="text" name="bondName1" id="input-bondName1"
                      onChange={
                        e => {
                          setBondState({
                            ...bondState,
                            bond1: e.target.value
                          });
                        }
                      }/>
                  </div>
                </div>
                <div className="bonds-input__container__name">
                  <div className="input__container__left">
                    <span>2nd Bond</span>
                  </div>
                  <div className="input__container__right">
                    <input type="text" name="bondName2" id="input-bondName2"
                      onChange={
                        e => {
                          setBondState({
                            ...bondState,
                            bond2: e.target.value
                          });
                        }
                      }/>
                  </div>
                </div>
                <div className="bonds-input__container__name">
                  <div className="input__container__left">
                    <span>3rd Bond</span>
                  </div>
                  <div className="input__container__right">
                    <input type="text" name="bondName3" id="input-bondName3"
                      onChange={
                        e => {
                          setBondState({
                            ...bondState,
                            bond3: e.target.value
                          });
                        }
                      }/>
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
                    <input type="text" name="vowName1" id="input-vowName1" required
                      onChange={
                        e => {
                          setVowState({
                            ...vowState,
                            vow1Name: e.target.value
                          });
                          inputFeedbackHandler('vowName1-feedback__empty', 'input-vowName1');
                        }
                      }/>
                    <div className="newGame__feedback">
                      <span id='vowName1-feedback__empty' className="empty hide">1st vow name is required.</span>
                    </div>
                  </div>
                </div>
                <div className="vows-input__container__rank">
                  <div className="input__container__left">
                    <span>Rank</span>
                  </div>
                  <div className="input__container__right">
                    <input className="radio-vow1" type="radio" name="rank1-radio" id="radio-rank__troublesome__1"
                      onChange={
                        e => {
                          if (e.target.value === 'on') {
                            setVowState({
                              ...vowState,
                              vow1Rank: 1
                            });
                          }
                          inputFeedbackHandler('vowRank1-feedback__empty');
                        }
                      }/>
                    <label className="label-vow1" htmlFor="radio-rank__troublesome__1">
                      <span>Troublesome</span>
                    </label>
                    <input className="radio-vow1" type="radio" name="rank1-radio" id="radio-rank__dangerous__1"
                      onChange={
                        e => {
                          if (e.target.value === 'on') {
                            setVowState({
                              ...vowState,
                              vow1Rank: 2
                            });
                          }
                          inputFeedbackHandler('vowRank1-feedback__empty');
                        }
                      }/>
                    <label className="label-vow1" htmlFor="radio-rank__dangerous__1">
                      <span>Dangerous</span>
                    </label>
                    <input className="radio-vow1" type="radio" name="rank1-radio" id="radio-rank__formidable__1"
                      onChange={
                        e => {
                          if (e.target.value === 'on') {
                            setVowState({
                              ...vowState,
                              vow1Rank: 3
                            });
                          }
                          inputFeedbackHandler('vowRank1-feedback__empty');
                        }
                      }/>
                    <label className="label-vow1" htmlFor="radio-rank__formidable__1">
                      <span>Formidable</span>
                    </label>
                    <input className="radio-vow1" type="radio" name="rank1-radio" id="radio-rank__extreme__1"
                      onChange={
                        e => {
                          if (e.target.value === 'on') {
                            setVowState({
                              ...vowState,
                              vow1Rank: 4
                            });
                          }
                          inputFeedbackHandler('vowRank1-feedback__empty');
                        }
                      }/>
                    <label className="label-vow1" htmlFor="radio-rank__extreme__1">
                      <span>Extreme</span>
                    </label>
                    <input className="radio-vow1" type="radio" name="rank1-radio" id="radio-rank__epic__1"
                      onChange={
                        e => {
                          if (e.target.value === 'on') {
                            setVowState({
                              ...vowState,
                              vow1Rank: 5
                            });
                          }
                          inputFeedbackHandler('vowRank1-feedback__empty');
                        }
                      }/>
                    <label className="label-vow1" htmlFor="radio-rank__epic__1">
                      <span>Epic</span>
                    </label>
                    <div className="newGame__feedback">
                      <span id='vowRank1-feedback__empty' className="empty hide">Rank for the 1st vow is required.</span>
                    </div>
                  </div>
                </div>
                <div className="vows-input__container__name">
                  <div className="input__container__left">
                    <span>2nd Vow</span>
                  </div>
                  <div className="input__container__right">
                    <input type="text" name="vowName2" id="input-vowName2" required
                      onChange={
                        e => {
                          setVowState({
                            ...vowState,
                            vow2Name: e.target.value
                          });
                          inputFeedbackHandler('vowName2-feedback__empty', 'input-vowName2');
                        }
                      }/>
                    <div className="newGame__feedback">
                      <span id='vowName2-feedback__empty' className="empty hide">2nd vow name is required.</span>
                    </div>
                  </div>
                </div>
                <div className="vows-input__container__rank">
                  <div className="input__container__left">
                    <span>Rank</span>
                  </div>
                  <div className="input__container__right">
                    <input className="radio-vow2" type="radio" name="rank2-radio" id="radio-rank__troublesome__2"
                      onChange={
                        e => {
                          if (e.target.value === 'on') {
                            setVowState({
                              ...vowState,
                              vow2Rank: 1
                            });
                          }
                          inputFeedbackHandler('vowRank2-feedback__empty');
                        }
                      }/>
                    <label className="label-vow2" htmlFor="radio-rank__troublesome__2">
                      <span>Troublesome</span>
                    </label>
                    <input className="radio-vow2" type="radio" name="rank2-radio" id="radio-rank__dangerous__2"
                      onChange={
                        e => {
                          if (e.target.value === 'on') {
                            setVowState({
                              ...vowState,
                              vow2Rank: 2
                            });
                          }
                          inputFeedbackHandler('vowRank2-feedback__empty');
                        }
                      }/>
                    <label className="label-vow2" htmlFor="radio-rank__dangerous__2">
                      <span>Dangerous</span>
                    </label>
                    <input className="radio-vow2" type="radio" name="rank2-radio" id="radio-rank__formidable__2"
                      onChange={
                        e => {
                          if (e.target.value === 'on') {
                            setVowState({
                              ...vowState,
                              vow2Rank: 3
                            });
                          }
                          inputFeedbackHandler('vowRank2-feedback__empty');
                        }
                      }/>
                    <label className="label-vow2" htmlFor="radio-rank__formidable__2">
                      <span>Formidable</span>
                    </label>
                    <input className="radio-vow2" type="radio" name="rank2-radio" id="radio-rank__extreme__2"
                      onChange={
                        e => {
                          if (e.target.value === 'on') {
                            setVowState({
                              ...vowState,
                              vow2Rank: 4
                            });
                          }
                          inputFeedbackHandler('vowRank2-feedback__empty');
                        }
                      }/>
                    <label className="label-vow2" htmlFor="radio-rank__extreme__2">
                      <span>Extreme</span>
                    </label>
                    <input className="radio-vow2" type="radio" name="rank2-radio" id="radio-rank__epic__2"
                      onChange={
                        e => {
                          if (e.target.value === 'on') {
                            setVowState({
                              ...vowState,
                              vow2Rank: 5
                            });
                          }
                          inputFeedbackHandler('vowRank2-feedback__empty');
                        }
                      }/>
                    <label className="label-vow2" htmlFor="radio-rank__epic__2">
                      <span>Epic</span>
                    </label>
                    <div className="newGame__feedback">
                      <span id='vowRank2-feedback__empty' className="empty hide">Rank for the 2nd vow is required.</span>
                    </div>
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

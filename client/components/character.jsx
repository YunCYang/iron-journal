import React from 'react';
import AssetModal from './assetModal';
import CharacterVow from './characterVow';
// import CharacterAsset from './characterAsset';
import { IdContext } from './app';
import { CharacterContext } from './main';
import deepCopy from '../tools/deepCopy';

const Character = props => {
  const id = React.useContext(IdContext);
  const charList = React.useContext(CharacterContext);

  const [editTarget, setEditTarget] = React.useState({
    name: '',
    content: null
  });

  const [modalShown, setModalShown] = React.useState({
    display: false,
    modal: ''
  });

  const [deleteVow, setDeleteVow] = React.useState({
    id: 0,
    name: '',
    index: 0,
    charIndex: 0
  });

  const displayShadow = () => {
    if (modalShown.display) return '';
    else return 'hide';
  };

  const modalBg = () => {
    if (modalShown.modal === 'deleteChar') {
      return '';
    } else return 'transparent';
  };

  const signDisplay = num => {
    if (num > 0) return '+';
    else return '';
  };

  const bondExpandHandler = () => {
    const bondContainer = document.getElementsByClassName('main-container__character__bonds')[0];
    const bondExpand = document.getElementById('bond-expand');
    const bondShrink = document.getElementById('bond-shrink');
    if (bondContainer.classList.contains('height-double-half')) {
      bondContainer.classList.add('height-single');
      bondContainer.classList.remove('height-double-half');
      bondShrink.classList.add('hide');
      bondExpand.classList.remove('hide');
    } else {
      bondContainer.classList.add('height-double-half');
      bondContainer.classList.remove('height-single');
      bondExpand.classList.add('hide');
      bondShrink.classList.remove('hide');
    }
  };

  const debExpandHandler = () => {
    const debContainer = document.getElementsByClassName('main-container__character__debilities')[0];
    const debExpand = document.getElementById('deb-expand');
    const debShrink = document.getElementById('deb-shrink');
    if (debContainer.classList.contains('height-deb-container')) {
      debContainer.classList.add('height-single');
      debContainer.classList.remove('height-deb-container');
      debShrink.classList.add('hide');
      debExpand.classList.remove('hide');
    } else {
      debContainer.classList.add('height-deb-container');
      debContainer.classList.remove('height-single');
      debExpand.classList.add('hide');
      debShrink.classList.remove('hide');
    }
  };

  const editData = (charKey, charValue) => {
    if (parseInt(id.id) === 0 && parseInt(sessionStorage.getItem('id')) === 0) {
      const sessionCharList = (Array.isArray(JSON.parse(sessionStorage.getItem('character')))) || [];
      let newCharList = [];
      if (sessionCharList.length > 0) {
        if (charList.characterList) {
          if (charList.characterList.length === 0) newCharList = deepCopy(sessionCharList);
          else newCharList = deepCopy(charList.characterList);
        } else newCharList = deepCopy(sessionCharList);
      } else if (charList.characterList) newCharList = deepCopy(charList.characterList);
      newCharList[props.charListIndex][charKey] = charValue;
      charList.setCharacterList(newCharList);
      sessionStorage.setItem('character', JSON.stringify(newCharList));
      const tempChar = deepCopy(props.selectedChar);
      tempChar[charKey] = charValue;
      props.setSelectedChar(tempChar);
      if (charKey === 'experience' || charKey === 'edge' || charKey === 'heart' ||
        charKey === 'iron' || charKey === 'shadow' || charKey === 'wits' ||
        charKey === 'health' || charKey === 'spirit' || charKey === 'supply' ||
        charKey === 'momentum' || charKey === 'maxMomentum' || charKey === 'resetMomentum') {
        setEditTarget({
          name: charKey,
          content: charValue
        });
      } else {
        setEditTarget({
          name: '',
          content: null
        });
      }
    } else {
      const newChar = {};
      newChar[charKey] = charValue;
      const tempChar = deepCopy(props.selectedChar);
      tempChar[charKey] = charValue;
      const characterInit = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newChar)
      };
      fetch(`/api/character/${props.selectedChar.characterId}`, characterInit)
        .then(res => res.json())
        .then(editRes => {
          props.setSelectedChar(tempChar);
          if (charKey === 'experience' || charKey === 'edge' || charKey === 'heart' ||
            charKey === 'iron' || charKey === 'shadow' || charKey === 'wits' ||
            charKey === 'health' || charKey === 'spirit' || charKey === 'supply' ||
            charKey === 'momentum' || charKey === 'maxMomentum' || charKey === 'resetMomentum') {
            setEditTarget({
              name: charKey,
              content: charValue
            });
          } else {
            setEditTarget({
              name: '',
              content: null
            });
          }
        });
    }
  };

  const createName = () => {
    const switchName = () => {
      if (editTarget.name === 'characterName') {
        return (
          <>
            <input type="text" name="characterInput__name" id="characterInput__name"
              placeholder={props.selectedChar.characterName} maxLength={32} onChange={
                e => {
                  setEditTarget({
                    ...editTarget,
                    content: e.target.value
                  });
                }
              } value={editTarget.content}/>
            <i className='fas fa-check-circle' onClick={
              () => editData('characterName', editTarget.content)
            }></i>
            <i className='fas fa-times-circle' onClick={
              () => {
                setEditTarget({
                  name: '',
                  content: null
                });
              }
            }></i>
          </>
        );
      } else {
        return (
          <>
            <span className="content">{props.selectedChar.characterName}</span>
          </>
        );
      }
    };
    return (
      <div className="name-container" onClick={
        () => {
          if (editTarget.name !== 'characterName') {
            setEditTarget({
              name: 'characterName',
              content: props.selectedChar.characterName
            });
          }
        }
      }>
        {switchName()}
      </div>
    );
  };

  const createExp = () => {
    const switchExp = () => {
      if (editTarget.name === 'experience') {
        return (
          <>
            <button type="button" className="active dec" onClick={
              () => {
                if (parseInt(editTarget.content) >= 1) {
                  editData('experience', parseInt(editTarget.content) - 1);
                }
              }
            }>
              <i className="fas fa-long-arrow-alt-down active" ></i>
            </button>
            <button type="button" className="active inc" onClick={
              () => {
                if (parseInt(editTarget.content) <= 29) {
                  editData('experience', parseInt(editTarget.content) + 1);
                }
              }
            }>
              <i className="fas fa-long-arrow-alt-up active" ></i>
            </button>
          </>
        );
      }
    };
    return (
      <div className="exp-container" onClick={
        e => {
          if (editTarget.name !== 'experience') {
            setEditTarget({
              name: 'experience',
              content: props.selectedChar.experience
            });
          } else {
            if (!Object.values(e.target.classList).includes('active')) {
              setEditTarget({
                name: '',
                content: ''
              });
            }
          }
        }
      }>
        <span className="label">Exp</span>
        <span className="content">{props.selectedChar.experience}</span>
        {switchExp()}
      </div>
    );
  };

  const create5stats = () => {
    const switchStats = stat => {
      if ((editTarget.name === 'edge' || editTarget.name === 'heart' || editTarget.name === 'iron' ||
        editTarget.name === 'shadow' || editTarget.name === 'wits') && editTarget.name === stat) {
        return (
          <>
            <button type="button" className="active dec" onClick={
              () => {
                if (parseInt(editTarget.content) >= 2) {
                  editData(editTarget.name, parseInt(editTarget.content) - 1);
                }
              }
            }>
              <i className="fas fa-long-arrow-alt-down active"></i>
            </button>
            <button type="button" className="active inc" onClick={
              () => {
                if (parseInt(editTarget.content) <= 4) {
                  editData(editTarget.name, parseInt(editTarget.content) + 1);
                }
              }
            }>
              <i className="fas fa-long-arrow-alt-up active"></i>
            </button>
          </>
        );
      }
    };
    return (
      <>
        <div className="stats5-container edge width-1-5" onClick={
          e => {
            if (editTarget.name !== 'edge') {
              setEditTarget({
                name: 'edge',
                content: props.selectedChar.edge
              });
            } else {
              if (!Object.values(e.target.classList).includes('active')) {
                setEditTarget({
                  name: '',
                  content: ''
                });
              }
            }
          }
        }>
          <span className="label">Edge</span>
          <span className="content">{props.selectedChar.edge}</span>
          {switchStats('edge')}
        </div>
        <div className="stats5-container heart width-1-5" onClick={
          e => {
            if (editTarget.name !== 'heart') {
              setEditTarget({
                name: 'heart',
                content: props.selectedChar.heart
              });
            } else {
              if (!Object.values(e.target.classList).includes('active')) {
                setEditTarget({
                  name: '',
                  content: ''
                });
              }
            }
          }
        }>
          <span className="label">Heart</span>
          <span className="content">{props.selectedChar.heart}</span>
          {switchStats('heart')}
        </div>
        <div className="stats5-container iron width-1-5" onClick={
          e => {
            if (editTarget.name !== 'iron') {
              setEditTarget({
                name: 'iron',
                content: props.selectedChar.iron
              });
            } else {
              if (!Object.values(e.target.classList).includes('active')) {
                setEditTarget({
                  name: '',
                  content: ''
                });
              }
            }
          }
        }>
          <span className="label">Iron</span>
          <span className="content">{props.selectedChar.iron}</span>
          {switchStats('iron')}
        </div>
        <div className="stats5-container shadow width-1-5" onClick={
          e => {
            if (editTarget.name !== 'shadow') {
              setEditTarget({
                name: 'shadow',
                content: props.selectedChar.shadow
              });
            } else {
              if (!Object.values(e.target.classList).includes('active')) {
                setEditTarget({
                  name: '',
                  content: ''
                });
              }
            }
          }
        }>
          <span className="label">Shadow</span>
          <span className="content">{props.selectedChar.shadow}</span>
          {switchStats('shadow')}
        </div>
        <div className="stats5-container wits width-1-5" onClick={
          e => {
            if (editTarget.name !== 'wits') {
              setEditTarget({
                name: 'wits',
                content: props.selectedChar.wits
              });
            } else {
              if (!Object.values(e.target.classList).includes('active')) {
                setEditTarget({
                  name: '',
                  content: ''
                });
              }
            }
          }
        }>
          <span className="label">Wits</span>
          <span className="content">{props.selectedChar.wits}</span>
          {switchStats('wits')}
        </div>
      </>
    );
  };

  const createStatus = () => {
    const switchStatus = status => {
      if ((editTarget.name === 'health' || editTarget.name === 'spirit' || editTarget.name === 'supply') &&
        editTarget.name === status) {
        return (
          <>
            <button type="button" className="active dec" onClick={
              () => {
                if (parseInt(editTarget.content) >= 1) {
                  editData(editTarget.name, parseInt(editTarget.content) - 1);
                }
              }
            }>
              <i className="fas fa-long-arrow-alt-down active"></i>
            </button>
            <button type="button" className="active inc" onClick={
              () => {
                if (parseInt(editTarget.content) <= 4) {
                  editData(editTarget.name, parseInt(editTarget.content) + 1);
                }
              }
            }>
              <i className="fas fa-long-arrow-alt-up active"></i>
            </button>
          </>
        );
      }
    };
    return (
      <>
        <div className="status-container health width-1-3" onClick={
          e => {
            if (editTarget.name !== 'health') {
              setEditTarget({
                name: 'health',
                content: props.selectedChar.health
              });
            } else {
              if (!Object.values(e.target.classList).includes('active')) {
                setEditTarget({
                  name: '',
                  content: ''
                });
              }
            }
          }
        }>
          <span className="label">Health</span>
          <span className="content">{`${signDisplay(props.selectedChar.health)}${props.selectedChar.health}`}</span>
          {switchStatus('health')}
        </div>
        <div className="status-container spirit width-1-3" onClick={
          e => {
            if (editTarget.name !== 'spirit') {
              setEditTarget({
                name: 'spirit',
                content: props.selectedChar.spirit
              });
            } else {
              if (!Object.values(e.target.classList).includes('active')) {
                setEditTarget({
                  name: '',
                  content: ''
                });
              }
            }
          }
        }>
          <span className="label">Spirit</span>
          <span className="content">{`${signDisplay(props.selectedChar.spirit)}${props.selectedChar.spirit}`}</span>
          {switchStatus('spirit')}
        </div>
        <div className="status-container supply width-1-3" onClick={
          e => {
            if (editTarget.name !== 'supply') {
              setEditTarget({
                name: 'supply',
                content: props.selectedChar.supply
              });
            } else {
              if (!Object.values(e.target.classList).includes('active')) {
                setEditTarget({
                  name: '',
                  content: ''
                });
              }
            }
          }
        }>
          <span className="label">Supply</span>
          <span className="content">{`${signDisplay(props.selectedChar.supply)}${props.selectedChar.supply}`}</span>
          {switchStatus('supply')}
        </div>
      </>
    );
  };

  const createMomentum = () => {
    const switchMomentum = momentum => {
      if ((editTarget.name === 'momentum' || editTarget.name === 'maxMomentum' ||
        editTarget.name === 'resetMomentum') && editTarget.name === momentum) {
        return (
          <>
            <button type="button" className="active dec" onClick={
              () => {
                if (parseInt(editTarget.content) >= -5) {
                  editData(editTarget.name, parseInt(editTarget.content) - 1);
                }
              }
            }>
              <i className="fas fa-long-arrow-alt-down active"></i>
            </button>
            <button type="button" className="active inc" onClick={
              () => {
                if (parseInt(editTarget.content) <= 9) {
                  editData(editTarget.name, parseInt(editTarget.content) + 1);
                }
              }
            }>
              <i className="fas fa-long-arrow-alt-up active"></i>
            </button>
          </>
        );
      }
    };
    return (
      <>
        <div className="momentum-container momentum width-1-3" onClick={
          e => {
            if (editTarget.name !== 'momentum') {
              setEditTarget({
                name: 'momentum',
                content: props.selectedChar.momentum
              });
            } else {
              if (!Object.values(e.target.classList).includes('active')) {
                setEditTarget({
                  name: '',
                  content: ''
                });
              }
            }
          }
        }>
          <span className="label">Momentum</span>
          <span className="content">{`${signDisplay(props.selectedChar.momentum)}${props.selectedChar.momentum}`}</span>
          {switchMomentum('momentum')}
        </div>
        <div className="momentum-container max width-1-3" onClick={
          e => {
            if (editTarget.name !== 'maxMomentum') {
              setEditTarget({
                name: 'maxMomentum',
                content: props.selectedChar.maxMomentum
              });
            } else {
              if (!Object.values(e.target.classList).includes('active')) {
                setEditTarget({
                  name: '',
                  content: ''
                });
              }
            }
          }
        }>
          <span className="label">Max</span>
          <span className="content">{`${signDisplay(props.selectedChar.maxMomentum)}${props.selectedChar.maxMomentum}`}</span>
          {switchMomentum('maxMomentum')}
        </div>
        <div className="momentum-container reset width-1-3" onClick={
          e => {
            if (editTarget.name !== 'resetMomentum') {
              setEditTarget({
                name: 'resetMomentum',
                content: props.selectedChar.resetMomentum
              });
            } else {
              if (!Object.values(e.target.classList).includes('active')) {
                setEditTarget({
                  name: '',
                  content: ''
                });
              }
            }
          }
        }>
          <span className="label">Reset</span>
          <span className="content">{`${signDisplay(props.selectedChar.resetMomentum)}${props.selectedChar.resetMomentum}`}</span>
          {switchMomentum('resetMomentum')}
        </div>
      </>
    );
  };

  const createBonds = () => {
    const bondDisplay = seq => parseInt(props.selectedChar.bond) >= seq ? '' : 'hide';
    const bondSwitch = seq => {
      if (Math.ceil(parseInt(props.selectedChar.bond) / 4) === seq) {
        if (Math.ceil(parseInt(props.selectedChar.bond) / 4) * 4 > parseInt(props.selectedChar.bond)) {
          editData('bond', parseInt(props.selectedChar.bond) + 1);
        } else {
          editData('bond', parseInt(props.selectedChar.bond) - 4);
        }
      } else if (Math.ceil(parseInt(props.selectedChar.bond) / 4) === seq - 1 &&
        parseInt(props.selectedChar.bond) % 4 === 0) {
        editData('bond', parseInt(props.selectedChar.bond) + 1);
      }
    };
    return (
      <>
        <div className="bonds-container title width-1-34">
          <span>Bonds</span>
        </div>
        <div className="bonds-container expand width-1-3" onClick={bondExpandHandler}>
          <i id="bond-expand" className="fas fa-caret-down"></i>
          <i id="bond-shrink" className="fas fa-caret-up hide"></i>
        </div>
        <div className="bonds-container score width-1-3">
          <span className="label">Score</span>
          <span className="score">{Math.floor(parseInt(props.selectedChar.bond) / 4)}</span>
        </div>
        <div className="bonds-container counter">
          <div className="counter-container height-3-4 width-1-1">
            <div className="counter-block" onClick={
              () => bondSwitch(1)
            }>
              <div className={`counter-block__square square-1 ${bondDisplay(1)}`}></div>
              <div className={`counter-block__square square-2 ${bondDisplay(2)}`}></div>
              <div className={`counter-block__square square-3 ${bondDisplay(3)}`}></div>
              <div className={`counter-block__square square-4 ${bondDisplay(4)}`}></div>
            </div>
            <div className="counter-block" onClick={
              () => bondSwitch(2)
            }>
              <div className={`counter-block__square square-1 ${bondDisplay(5)}`}></div>
              <div className={`counter-block__square square-2 ${bondDisplay(6)}`}></div>
              <div className={`counter-block__square square-3 ${bondDisplay(7)}`}></div>
              <div className={`counter-block__square square-4 ${bondDisplay(8)}`}></div>
            </div>
            <div className="counter-block" onClick={
              () => bondSwitch(3)
            }>
              <div className={`counter-block__square square-1 ${bondDisplay(9)}`}></div>
              <div className={`counter-block__square square-2 ${bondDisplay(10)}`}></div>
              <div className={`counter-block__square square-3 ${bondDisplay(11)}`}></div>
              <div className={`counter-block__square square-4 ${bondDisplay(12)}`}></div>
            </div>
            <div className="counter-block" onClick={
              () => bondSwitch(4)
            }>
              <div className={`counter-block__square square-1 ${bondDisplay(13)}`}></div>
              <div className={`counter-block__square square-2 ${bondDisplay(14)}`}></div>
              <div className={`counter-block__square square-3 ${bondDisplay(15)}`}></div>
              <div className={`counter-block__square square-4 ${bondDisplay(16)}`}></div>
            </div>
            <div className="counter-block" onClick={
              () => bondSwitch(5)
            }>
              <div className={`counter-block__square square-1 ${bondDisplay(17)}`}></div>
              <div className={`counter-block__square square-2 ${bondDisplay(18)}`}></div>
              <div className={`counter-block__square square-3 ${bondDisplay(19)}`}></div>
              <div className={`counter-block__square square-4 ${bondDisplay(20)}`}></div>
            </div>
          </div>
          <div className="counter-container height-3-4 width-1-1">
            <div className="counter-block" onClick={
              () => bondSwitch(6)
            }>
              <div className={`counter-block__square square-1 ${bondDisplay(21)}`}></div>
              <div className={`counter-block__square square-2 ${bondDisplay(22)}`}></div>
              <div className={`counter-block__square square-3 ${bondDisplay(23)}`}></div>
              <div className={`counter-block__square square-4 ${bondDisplay(24)}`}></div>
            </div>
            <div className="counter-block" onClick={
              () => bondSwitch(7)
            }>
              <div className={`counter-block__square square-1 ${bondDisplay(25)}`}></div>
              <div className={`counter-block__square square-2 ${bondDisplay(26)}`}></div>
              <div className={`counter-block__square square-3 ${bondDisplay(27)}`}></div>
              <div className={`counter-block__square square-4 ${bondDisplay(28)}`}></div>
            </div>
            <div className="counter-block" onClick={
              () => bondSwitch(8)
            }>
              <div className={`counter-block__square square-1 ${bondDisplay(29)}`}></div>
              <div className={`counter-block__square square-2 ${bondDisplay(30)}`}></div>
              <div className={`counter-block__square square-3 ${bondDisplay(31)}`}></div>
              <div className={`counter-block__square square-4 ${bondDisplay(32)}`}></div>
            </div>
            <div className="counter-block" onClick={
              () => bondSwitch(9)
            }>
              <div className={`counter-block__square square-1 ${bondDisplay(33)}`}></div>
              <div className={`counter-block__square square-2 ${bondDisplay(34)}`}></div>
              <div className={`counter-block__square square-3 ${bondDisplay(35)}`}></div>
              <div className={`counter-block__square square-4 ${bondDisplay(36)}`}></div>
            </div>
            <div className="counter-block" onClick={
              () => bondSwitch(10)
            }>
              <div className={`counter-block__square square-1 ${bondDisplay(37)}`}></div>
              <div className={`counter-block__square square-2 ${bondDisplay(38)}`}></div>
              <div className={`counter-block__square square-3 ${bondDisplay(39)}`}></div>
              <div className={`counter-block__square square-4 ${bondDisplay(40)}`}></div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const createVows = () => {
    return (
      <>
        <CharacterVow selectedChar={props.selectedChar} charListIndex={props.charListIndex}
          setSelectedChar={props.setSelectedChar} setEditTarget={setEditTarget}
          setDeleteVow={setDeleteVow} setModalShown={setModalShown}/>
      </>
    );
  };

  const createDebilities = () => {
    const debList = ['wounded', 'shaken', 'unprepared', 'encumbered', 'maimed',
      'corrupted', 'cursed', 'tormented'];
    const debCount = () => {
      let count = 0;
      for (const deb of debList) {
        if (props.selectedChar[deb]) count++;
      }
      return count;
    };
    return (
      <>
        <div className="debilities-container title width-1-3">
          <span>Debilities</span>
        </div>
        <div className="debilities-container expand width-1-3" onClick={debExpandHandler}>
          <i id="deb-expand" className="fas fa-caret-down"></i>
          <i id="deb-shrink" className="fas fa-caret-up hide"></i>
        </div>
        <div className="debilities-container score width-1-3">
          <span className="label">Count</span>
          <span className="score">{`${debCount()} / 8`}</span>
        </div>
        <div className="debilities-container__conditions">
          <div className="debilities-container__conditions title-s height-3-4 width-1-1">
            <span>Conditions</span>
          </div>
          <div className="cb-container height-double width-1-1">
            <input className="cb-conditions__wounded" type="checkbox" name="cb-conditions__wounded"
              id="cb-conditions__wounded" checked={props.selectedChar.wounded} onChange={
                () => editData('wounded', !props.selectedChar.wounded)
              }/>
            <label className="label-conditions__wounded" htmlFor="cb-conditions__wounded">
              <span>Wounded</span>
            </label>
            <input className="cb-conditions__shaken" type="checkbox" name="cb-conditions__shaken"
              id="cb-conditions__shaken" checked={props.selectedChar.shaken} onChange={
                () => editData('shaken', !props.selectedChar.shaken)
              }/>
            <label className="label-conditions__shaken" htmlFor="cb-conditions__shaken">
              <span>Shaken</span>
            </label>
            <input className="cb-conditions__unprepared" type="checkbox" name="cb-conditions__unprepared"
              id="cb-conditions__unprepared" checked={props.selectedChar.unprepared} onChange={
                () => editData('unprepared', !props.selectedChar.unprepared)
              }/>
            <label className="label-conditions__unprepared" htmlFor="cb-conditions__unprepared">
              <span>Unprepared</span>
            </label>
            <input className="cb-conditions__encumbered" type="checkbox" name="cb-conditions__encumbered"
              id="cb-conditions__encumbered" checked={props.selectedChar.encumbered} onChange={
                () => editData('encumbered', !props.selectedChar.encumbered)
              }/>
            <label className="label-conditions__encumbered" htmlFor="cb-conditions__encumbered">
              <span>Encumbered</span>
            </label>
          </div>
        </div>
        <div className="debilities-container__banes">
          <div className="debilities-container__banes title-s height-3-4 width-1-1">
            <span>Banes</span>
          </div>
          <div className="cb-container height-single width-1-1">
            <input className="cb-banes__maimed" type="checkbox" name="cb-banes__maimed"
              id="cb-banes__maimed" checked={props.selectedChar.maimed} onChange={
                () => editData('maimed', !props.selectedChar.maimed)
              }/>
            <label className="label-banes__maimed" htmlFor="cb-banes__maimed">
              <span>Maimed</span>
            </label>
            <input className="cb-banes__corrupted" type="checkbox" name="cb-banes__corrupted"
              id="cb-banes__corrupted" checked={props.selectedChar.corrupted} onChange={
                () => editData('corrupted', !props.selectedChar.corrupted)
              }/>
            <label className="label-banes__corrupted" htmlFor="cb-banes__corrupted">
              <span>Corrupted</span>
            </label>
          </div>
        </div>
        <div className="debilities-container__burdens">
          <div className="debilities-container__burdens title-s height-3-4 width-1-1">
            <span>Burdens</span>
          </div>
          <div className="cb-container height-single width-1-1">
            <input className="cb-burdens__cursed" type="checkbox" name="cb-burdens__cursed"
              id="cb-burdens__cursed" checked={props.selectedChar.cursed} onChange={
                () => editData('cursed', !props.selectedChar.cursed)
              }/>
            <label className="label-burdens__cursed" htmlFor="cb-burdens__cursed">
              <span>Cursed</span>
            </label>
            <input className="cb-burdens__tormented" type="checkbox" name="cb-burdens__tormented"
              id="cb-burdens__tormented" checked={props.selectedChar.tormented} onChange={
                () => editData('tormented', !props.selectedChar.tormented)
              }/>
            <label className="label-burdens__tormented" htmlFor="cb-burdens__tormented">
              <span>Tormented</span>
            </label>
          </div>
        </div>
      </>
    );
  };

  // const createAsset = () => {
  //   return (
  //     <>
  //       <CharacterAsset selectedChar={props.selectedChar}/>
  //     </>
  //   );
  // };

  return (
    <>
      <div className="main-container__character">
        <div className="main-container__character__name width-2-3 height-single">
          {createName()}
        </div>
        <div className="main-container__character__exp width-1-3 height-single">
          {createExp()}
        </div>
        <div className="main-container__character__5stats height-single">
          {create5stats()}
        </div>
        <div className="main-container__character__status height-single">
          {createStatus()}
        </div>
        <div className="main-container__character__momentum height-single">
          {createMomentum()}
        </div>
        <div className="main-container__character__bonds height-single">
          {createBonds()}
        </div>
        <div className="main-container__character__vows height-single hide-overflow">
          {createVows()}
        </div>
        <div className="main-container__character__debilities height-single">
          {createDebilities()}
        </div>
        <div className="main-container__character__actions width-1-1">
          <div className="main-container__character__actions__back height-single-half"
            onClick={
              () => props.returnGamePage()
            }>
            <i className="fas fa-long-arrow-alt-left"></i>
            <span className="label">Back</span>
          </div>
          <div className="main-container__character__actions__delete height-single-half"
            onClick={
              () => {
                setModalShown({
                  display: true,
                  modal: 'deleteChar'
                });
              }
            }>
            <i className="fas fa-times"></i>
            <span className="label">Delete</span>
          </div>
        </div>
      </div>
      <div className={`modal-shadow ${displayShadow()} ${modalBg()}`} onClick={
        e => {
          if (e.target.contains(document.getElementsByClassName('modal-shadow')[0])) {
            setModalShown({
              display: false,
              modal: ''
            });
          }
        }
      }>
        <AssetModal modalType={modalShown.modal} activeAsset=''
          modalShown={modalShown.display} setModalShown={setModalShown}
          assetState={{}} characterName={props.selectedChar.characterName}
          characterId={props.selectedChar.characterId} returnGamePage={props.returnGamePage}
          deleteVow={deleteVow} selectedChar={props.selectedChar} setSelectedChar={props.setSelectedChar}
          setEditTarget={setEditTarget}/>
      </div>
    </>
  );
};

export default Character;

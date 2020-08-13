import React from 'react';
import AssetModal from './assetModal';
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
    else if (num < 0) return '-';
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

  const vowExpandHandler = () => {
    const vowContainer = document.getElementsByClassName('main-container__character__vows')[0];
    const vowExpand = document.getElementById('vow-expand');
    const vowShrink = document.getElementById('vow-shrink');
    if (vowContainer.classList.contains('height-vows-container')) {
      vowContainer.classList.add('height-single');
      vowContainer.classList.remove('height-vows-container');
      vowShrink.classList.add('hide');
      vowExpand.classList.remove('hide');
    } else {
      vowContainer.classList.add('height-vows-container');
      vowContainer.classList.remove('height-single');
      vowExpand.classList.add('hide');
      vowShrink.classList.remove('hide');
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
      setEditTarget({
        name: '',
        content: null
      });
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
          setEditTarget({
            name: '',
            content: null
          });
        });
    }
  };

  const createName = () => {
    const switchName = () => {
      if (editTarget.name === 'name') {
        return (
          <>
            <input type="text" name="characterInput__name" id="characterInput__name"
              placeholder={props.selectedChar.characterName} onChange={
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
          if (editTarget.name !== 'name') {
            setEditTarget({
              name: 'name',
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
      if (editTarget.name === 'exp') {
        return (
          <>
            <button type="button" className="active dec">
              <i className="fas fa-long-arrow-alt-down active"></i>
            </button>
            <button type="button" className="active inc">
              <i className="fas fa-long-arrow-alt-up active"></i>
            </button>
          </>
        );
      }
    };
    return (
      <div className="exp-container" onClick={
        e => {
          if (editTarget.name !== 'exp') {
            setEditTarget({
              name: 'exp',
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
            <button type="button" className="active dec">
              <i className="fas fa-long-arrow-alt-down active"></i>
            </button>
            <button type="button" className="active inc">
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
            <button type="button" className="active dec">
              <i className="fas fa-long-arrow-alt-down active"></i>
            </button>
            <button type="button" className="active inc">
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
            <button type="button" className="active dec">
              <i className="fas fa-long-arrow-alt-down active"></i>
            </button>
            <button type="button" className="active inc">
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
          <span className="score">10</span>
        </div>
        <div className="bonds-container counter">
          <div className="counter-container height-3-4 width-1-1">
            <div className="counter-block">
              <div className="counter-block__square square-1"></div>
              <div className="counter-block__square square-2"></div>
              <div className="counter-block__square square-3"></div>
              <div className="counter-block__square square-4"></div>
            </div>
            <div className="counter-block">
              <div className="counter-block__square square-1"></div>
              <div className="counter-block__square square-2"></div>
              <div className="counter-block__square square-3"></div>
              <div className="counter-block__square square-4"></div>
            </div>
            <div className="counter-block">
              <div className="counter-block__square square-1"></div>
              <div className="counter-block__square square-2"></div>
              <div className="counter-block__square square-3"></div>
              <div className="counter-block__square square-4"></div>
            </div>
            <div className="counter-block">
              <div className="counter-block__square square-1"></div>
              <div className="counter-block__square square-2"></div>
              <div className="counter-block__square square-3"></div>
              <div className="counter-block__square square-4"></div>
            </div>
            <div className="counter-block">
              <div className="counter-block__square square-1"></div>
              <div className="counter-block__square square-2"></div>
              <div className="counter-block__square square-3"></div>
              <div className="counter-block__square square-4"></div>
            </div>
          </div>
          <div className="counter-container height-3-4 width-1-1">
            <div className="counter-block">
              <div className="counter-block__square square-1"></div>
              <div className="counter-block__square square-2"></div>
              <div className="counter-block__square square-3"></div>
              <div className="counter-block__square square-4"></div>
            </div>
            <div className="counter-block">
              <div className="counter-block__square square-1"></div>
              <div className="counter-block__square square-2"></div>
              <div className="counter-block__square square-3"></div>
              <div className="counter-block__square square-4"></div>
            </div>
            <div className="counter-block">
              <div className="counter-block__square square-1"></div>
              <div className="counter-block__square square-2"></div>
              <div className="counter-block__square square-3"></div>
              <div className="counter-block__square square-4"></div>
            </div>
            <div className="counter-block">
              <div className="counter-block__square square-1"></div>
              <div className="counter-block__square square-2"></div>
              <div className="counter-block__square square-3"></div>
              <div className="counter-block__square square-4"></div>
            </div>
            <div className="counter-block">
              <div className="counter-block__square square-1"></div>
              <div className="counter-block__square square-2"></div>
              <div className="counter-block__square square-3"></div>
              <div className="counter-block__square square-4"></div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const createVows = () => {
    return (
      <>
        <div className="vows-container title width-1-3">
          <span>Vows</span>
        </div>
        <div className="vows-container expand width-1-3" onClick={vowExpandHandler}>
          <i id="vow-expand" className="fas fa-caret-down"></i>
          <i id="vow-shrink" className="fas fa-caret-up hide"></i>
        </div>
        <div className="vows-container score width-1-3">
          <span className="label">Count</span>
          <span className="score">0 / 5</span>
        </div>
        <div className="vows-container vow">
          <div className="vows-container name height-3-4 width-1-1">
            <span className="vowName">Something I want to do</span>
          </div>
          <div className="vows-container rank height-half width-1-1">
            <span className="vowRank">Troublesome</span>
          </div>
          <div className="vows-container counter">
            <div className="counter-container height-3-4 width-1-1">
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
            </div>
            <div className="counter-container height-3-4 width-1-1">
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="vows-container vow">
          <div className="vows-container name height-3-4 width-1-1">
            <span className="vowName">Something I want to do</span>
          </div>
          <div className="vows-container rank height-half width-1-1">
            <span className="vowRank">Troublesome</span>
          </div>
          <div className="vows-container counter">
            <div className="counter-container height-3-4 width-1-1">
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
            </div>
            <div className="counter-container height-3-4 width-1-1">
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="vows-container vow">
          <div className="vows-container name height-3-4 width-1-1">
            <span className="vowName">Something I want to do</span>
          </div>
          <div className="vows-container rank height-half width-1-1">
            <span className="vowRank">Troublesome</span>
          </div>
          <div className="vows-container counter">
            <div className="counter-container height-3-4 width-1-1">
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
            </div>
            <div className="counter-container height-3-4 width-1-1">
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="vows-container vow">
          <div className="vows-container name height-3-4 width-1-1">
            <span className="vowName">Something I want to do</span>
          </div>
          <div className="vows-container rank height-half width-1-1">
            <span className="vowRank">Troublesome</span>
          </div>
          <div className="vows-container counter">
            <div className="counter-container height-3-4 width-1-1">
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
            </div>
            <div className="counter-container height-3-4 width-1-1">
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="vows-container vow">
          <div className="vows-container name height-3-4 width-1-1">
            <span className="vowName">Something I want to do</span>
          </div>
          <div className="vows-container rank height-half width-1-1">
            <span className="vowRank">Troublesome</span>
          </div>
          <div className="vows-container counter">
            <div className="counter-container height-3-4 width-1-1">
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
            </div>
            <div className="counter-container height-3-4 width-1-1">
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
              <div className="counter-block">
                <div className="counter-block__square square-1"></div>
                <div className="counter-block__square square-2"></div>
                <div className="counter-block__square square-3"></div>
                <div className="counter-block__square square-4"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const createDebilities = () => {
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
          <span className="score">0 / 8</span>
        </div>
        <div className="debilities-container__conditions">
          <div className="debilities-container__conditions title-s height-3-4 width-1-1">
            <span>Conditions</span>
          </div>
          <div className="radio-container height-double width-1-1">
            <input className="radio-conditions__wounded" type="radio" name="radio-conditions__wounded"
              id="radio-conditions__wounded" />
            <label className="label-conditions__wounded" htmlFor="radio-conditions__wounded">
              <span>Wounded</span>
            </label>
            <input className="radio-conditions__shaken" type="radio" name="radio-conditions__shaken"
              id="radio-conditions__shaken" />
            <label className="label-conditions__shaken" htmlFor="radio-conditions__shaken">
              <span>Shaken</span>
            </label>
            <input className="radio-conditions__unprepared" type="radio" name="radio-conditions__unprepared"
              id="radio-conditions__unprepared" />
            <label className="label-conditions__unprepared" htmlFor="radio-conditions__unprepared">
              <span>Unprepared</span>
            </label>
            <input className="radio-conditions__encumbered" type="radio" name="radio-conditions__encumbered"
              id="radio-conditions__encumbered" />
            <label className="label-conditions__encumbered" htmlFor="radio-conditions__encumbered">
              <span>Encumbered</span>
            </label>
          </div>
        </div>
        <div className="debilities-container__banes">
          <div className="debilities-container__banes title-s height-3-4 width-1-1">
            <span>Banes</span>
          </div>
          <div className="radio-container height-single width-1-1">
            <input className="radio-banes__maimed" type="radio" name="radio-banes__maimed"
              id="radio-banes__maimed" />
            <label className="label-banes__maimed" htmlFor="radio-banes__maimed">
              <span>Maimed</span>
            </label>
            <input className="radio-banes__corrupted" type="radio" name="radio-banes__corrupted"
              id="radio-banes__corrupted" />
            <label className="label-banes__corrupted" htmlFor="radio-banes__corrupted">
              <span>Corrupted</span>
            </label>
          </div>
        </div>
        <div className="debilities-container__burdens">
          <div className="debilities-container__burdens title-s height-3-4 width-1-1">
            <span>Burdens</span>
          </div>
          <div className="radio-container height-single width-1-1">
            <input className="radio-burdens__cursed" type="radio" name="radio-burdens__cursed"
              id="radio-burdens__cursed" />
            <label className="label-burdens__cursed" htmlFor="radio-burdens__cursed">
              <span>Cursed</span>
            </label>
            <input className="radio-burdens__tormented" type="radio" name="radio-burdens__tormented"
              id="radio-burdens__tormented" />
            <label className="label-burdens__tormented" htmlFor="radio-burdens__tormented">
              <span>Tormented</span>
            </label>
          </div>
        </div>
      </>
    );
  };

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
        <div className="main-container__character__vows height-single">
          {createVows()}
        </div>
        <div className="main-container__character__debilities height-single">
          {createDebilities()}
        </div>
        <div className="main-container__character__actions width-1-1">
          <div className="main-container__character__actions__back height-single-half width-1-4">
            <i className="fas fa-long-arrow-alt-left"></i>
            <span className="label">Back</span>
          </div>
          <div className="main-container__character__actions__roll height-single-half width-1-4">
            <i className="fas fa-dice-d6"></i>
            <span className="label">Roll</span>
          </div>
          <div className="main-container__character__actions__save height-single-half width-1-4">
            <i className="fas fa-save"></i>
            <span className="label">Save</span>
          </div>
          <div className="main-container__character__actions__delete height-single-half width-1-4"
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
          characterId={props.selectedChar.characterId} returnGamePage={props.returnGamePage}/>
      </div>
    </>
  );
};

export default Character;

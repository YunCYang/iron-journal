import React from 'react';
// import AssetModal from './assetModal';
import { IdContext } from './app';
import { CharacterContext } from './main';
import deepCopy from '../tools/deepCopy';

const CharacterVow = props => {
  const id = React.useContext(IdContext);
  const charList = React.useContext(CharacterContext);
  const [characterVow, setCharacterVow] = React.useState([]);
  const [addVow, setAddVow] = React.useState(0);
  const [dropdown, setDropdown] = React.useState({
    show: false,
    selected: 0
  });
  const [vowName, setVowName] = React.useState('');

  const rankArray = ['Troublesome', 'Dangerous', 'Formidable', 'Extreme', 'Epic'];

  React.useEffect(
    () => {
      if (parseInt(id.id) === 0 && parseInt(sessionStorage.getItem('id')) === 0) {
        setCharacterVow(props.selectedChar.vows);
      } else {
        fetch(`/api/vow/all/${props.selectedChar.characterId}`)
          .then(res => res.json())
          .then(res => {
            setCharacterVow(res);
          });
      }
    }
  );

  const editVow = (index, progress, vowId) => {
    if (parseInt(id.id) === 0 && parseInt(sessionStorage.getItem('id')) === 0) {
      const sessionCharList = (Array.isArray(JSON.parse(sessionStorage.getItem('character')))) || [];
      let newCharList = [];
      if (sessionCharList.length > 0) {
        if (charList.characterList) {
          if (charList.characterList.length === 0) newCharList = deepCopy(sessionCharList);
          else newCharList = deepCopy(charList.characterList);
        } else newCharList = deepCopy(sessionCharList);
      } else if (charList.characterList) newCharList = deepCopy(charList.characterList);
      newCharList[props.charListIndex].vows[index].progress = progress;
      charList.setCharacterList(newCharList);
      sessionStorage.setItem('character', JSON.stringify(newCharList));
      const tempChar = deepCopy(props.selectedChar);
      tempChar.vows[index].progress = progress;
      props.setSelectedChar(tempChar);
      props.setEditTarget({
        name: '',
        content: null
      });
    } else {
      const vowInit = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vowProgress: progress
        })
      };
      fetch(`/api/vow/${vowId}`, vowInit)
        .then(res => res.json())
        .then(editRes => {
          setAddVow(0);
          setDropdown({
            show: false,
            selected: 0
          });
          setVowName('');
        });
    }
  };

  const vowExpandHandler = () => {
    const vowContainer = document.getElementsByClassName('main-container__character__vows')[0];
    const vowExpand = document.getElementById('vow-expand');
    const vowShrink = document.getElementById('vow-shrink');
    if (vowContainer.classList.contains('height-vows-container')) {
      vowContainer.classList.add('height-single');
      vowContainer.classList.add('hide-overflow');
      vowContainer.classList.remove('height-vows-container');
      vowShrink.classList.add('hide');
      vowExpand.classList.remove('hide');
    } else {
      vowContainer.classList.add('height-vows-container');
      vowContainer.classList.remove('hide-overflow');
      vowContainer.classList.remove('height-single');
      vowExpand.classList.add('hide');
      vowShrink.classList.remove('hide');
    }
  };

  const displayRank = num => rankArray[num - 1];

  const showVows = () => {
    const tempVow = deepCopy(characterVow);
    if (tempVow.length < 5) {
      const loopCount = 5 - tempVow.length;
      for (let i = 0; i < loopCount; i++) {
        tempVow.push({ vowId: 0 });
      }
    }
    return (
      tempVow.map(
        (vow, index) => {
          const dropdownDisplay = () => {
            if (!dropdown.show) {
              return (
                <div className="input__rank__container" onClick={
                  () => setDropdown({
                    ...dropdown,
                    show: true
                  })
                }>
                  <span>{rankArray[dropdown.selected]}</span>
                </div>
              );
            } else {
              return (
                <div className="input__rank__container">
                  <div className="rank__dropdown" onClick={
                    () => {
                      setDropdown({
                        show: false,
                        selected: 0
                      });
                    }
                  }>
                    <span>Troublesome</span>
                  </div>
                  <div className="rank__dropdown" onClick={
                    () => {
                      setDropdown({
                        show: false,
                        selected: 1
                      });
                    }
                  }>
                    <span>Dangerous</span>
                  </div>
                  <div className="rank__dropdown" onClick={
                    () => {
                      setDropdown({
                        show: false,
                        selected: 2
                      });
                    }
                  }>
                    <span>Formidable</span>
                  </div>
                  <div className="rank__dropdown" onClick={
                    () => {
                      setDropdown({
                        show: false,
                        selected: 3
                      });
                    }
                  }>
                    <span>Extreme</span>
                  </div>
                  <div className="rank__dropdown" onClick={
                    () => {
                      setDropdown({
                        show: false,
                        selected: 4
                      });
                    }
                  }>
                    <span>Epic</span>
                  </div>
                </div>
              );
            }
          };
          if (vow.vowId === 0) {
            if (addVow && addVow === index + 1) {
              const validateInput = () => {
                if (document.getElementById('characterInput__vow').checkValidity()) return true;
                else return false;
              };
              const createHandler = () => {
                if (validateInput()) {
                  const vowValue = {
                    name: vowName,
                    rank: dropdown.selected + 1,
                    progress: 0,
                    status: false
                  };
                  if (parseInt(id.id) === 0 && parseInt(sessionStorage.getItem('id')) === 0) {
                    const sessionCharList = (Array.isArray(JSON.parse(sessionStorage.getItem('character')))) || [];
                    let newCharList = [];
                    if (sessionCharList.length > 0) {
                      if (charList.characterList) {
                        if (charList.characterList.length === 0) newCharList = deepCopy(sessionCharList);
                        else newCharList = deepCopy(charList.characterList);
                      } else newCharList = deepCopy(sessionCharList);
                    } else if (charList.characterList) newCharList = deepCopy(charList.characterList);
                    newCharList[props.charListIndex].vows.push(vowValue);
                    charList.setCharacterList(newCharList);
                    sessionStorage.setItem('character', JSON.stringify(newCharList));
                    const tempChar = deepCopy(props.selectedChar);
                    tempChar.vows.push(vowValue);
                    props.setSelectedChar(tempChar);
                    props.setEditTarget({
                      name: '',
                      content: null
                    });
                  } else {
                    const vowInit = {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        characterId: props.selectedChar.characterId,
                        vowName: vowName,
                        vowRank: dropdown.selected + 1,
                        vowProgress: 0,
                        vowStatus: false
                      })
                    };
                    fetch('/api/vow', vowInit)
                      .then(res => res.json())
                      .then(res => {
                        setAddVow(0);
                        setDropdown({
                          show: false,
                          selected: 0
                        });
                        setVowName('');
                      });
                  }
                } else {
                  document.getElementById('characterInput__vow').classList.add('empty');
                }
              };
              const inputFeedbackHandler = () => {
                if (validateInput()) {
                  document.getElementById('characterInput__vow').classList.remove('empty');
                }
              };
              return (
                <div className="vows-container vow" key={`vow-${vow.vowId}-${index}-new__2`}>
                  <div className="vows-container new_2 height-vows-single width-1-1" >
                    <div className="input__name">
                      <input type="text" maxLength={32} name="characterInput__vow" id="characterInput__vow"
                        placeholder="Vow name" required value={vowName} onChange={
                          e => {
                            setVowName(e.target.value);
                            inputFeedbackHandler();
                          }
                        }/>
                    </div>
                    <div className="input__rank">
                      {dropdownDisplay()}
                    </div>
                    <div className="input__confirm">
                      <button type="button" className="vowButton__create" onClick={createHandler}>Create</button>
                      <button type="button" className="vowButton__cancel" onClick={
                        () => {
                          setAddVow(0);
                          setDropdown({
                            show: false,
                            selected: 0
                          });
                          setVowName('');
                        }
                      }>Cancel</button>
                    </div>
                  </div>
                </div >
              );
            } else {
              return (
                <div className="vows-container vow" key={`vow-${vow.vowId}-${index}-new`}>
                  <div className=" vows-container new height-vows-single width-1-1" onClick={
                    () => {
                      setAddVow(index + 1);
                      setDropdown({
                        show: false,
                        selected: 0
                      });
                      setVowName('');
                    }
                  }>
                    <i className="fas fa-plus"></i>
                    <span>Add new vow</span>
                  </div>
                </div >
              );
            }
          } else {
            const vowDisplay = seq => parseInt(vow.progress) >= seq ? '' : 'hide';
            const vowSwitch = seq => {
              if (Math.ceil(parseInt(vow.progress) / 4) === seq) {
                if (Math.ceil(parseInt(vow.progress) / 4) * 4 > parseInt(vow.progress)) {
                  editVow(index, parseInt(vow.progress) + 1, vow.vowId);
                } else {
                  editVow(index, parseInt(vow.progress) - 4, vow.vowId);
                }
              } else if (Math.ceil(parseInt(vow.progress) / 4) === seq - 1 &&
                parseInt(vow.progress) % 4 === 0) {
                editVow(index, parseInt(vow.progress) + 1, vow.vowId);
              }
            };
            return (
              <div className="vows-container vow" key={`vow-${vow.vowId}-${index}`}>
                <div className="vows-container name height-3-4 width-1-1">
                  <span className="vowName">{vow.name}</span>
                </div>
                <div className="vows-container rank height-half width-1-1">
                  <span className="vowRank">{displayRank(parseInt(vow.rank))}</span>
                </div>
                <div className="vows-container counter">
                  <div className="counter-container height-3-4 width-1-1">
                    <div className="counter-block" onClick={
                      () => vowSwitch(1)
                    }>
                      <div className={`counter-block__square square-1 ${vowDisplay(1)}`}></div>
                      <div className={`counter-block__square square-2 ${vowDisplay(2)}`}></div>
                      <div className={`counter-block__square square-3 ${vowDisplay(3)}`}></div>
                      <div className={`counter-block__square square-4 ${vowDisplay(4)}`}></div>
                    </div>
                    <div className="counter-block" onClick={
                      () => vowSwitch(2)
                    }>
                      <div className={`counter-block__square square-1 ${vowDisplay(5)}`}></div>
                      <div className={`counter-block__square square-2 ${vowDisplay(6)}`}></div>
                      <div className={`counter-block__square square-3 ${vowDisplay(7)}`}></div>
                      <div className={`counter-block__square square-4 ${vowDisplay(8)}`}></div>
                    </div>
                    <div className="counter-block" onClick={
                      () => vowSwitch(3)
                    }>
                      <div className={`counter-block__square square-1 ${vowDisplay(9)}`}></div>
                      <div className={`counter-block__square square-2 ${vowDisplay(10)}`}></div>
                      <div className={`counter-block__square square-3 ${vowDisplay(11)}`}></div>
                      <div className={`counter-block__square square-4 ${vowDisplay(12)}`}></div>
                    </div>
                    <div className="counter-block" onClick={
                      () => vowSwitch(4)
                    }>
                      <div className={`counter-block__square square-1 ${vowDisplay(13)}`}></div>
                      <div className={`counter-block__square square-2 ${vowDisplay(14)}`}></div>
                      <div className={`counter-block__square square-3 ${vowDisplay(15)}`}></div>
                      <div className={`counter-block__square square-4 ${vowDisplay(16)}`}></div>
                    </div>
                    <div className="counter-block" onClick={
                      () => vowSwitch(5)
                    }>
                      <div className={`counter-block__square square-1 ${vowDisplay(17)}`}></div>
                      <div className={`counter-block__square square-2 ${vowDisplay(18)}`}></div>
                      <div className={`counter-block__square square-3 ${vowDisplay(19)}`}></div>
                      <div className={`counter-block__square square-4 ${vowDisplay(20)}`}></div>
                    </div>
                  </div>
                  <div className="counter-container height-3-4 width-1-1">
                    <div className="counter-block" onClick={
                      () => vowSwitch(6)
                    }>
                      <div className={`counter-block__square square-1 ${vowDisplay(21)}`}></div>
                      <div className={`counter-block__square square-2 ${vowDisplay(22)}`}></div>
                      <div className={`counter-block__square square-3 ${vowDisplay(23)}`}></div>
                      <div className={`counter-block__square square-4 ${vowDisplay(24)}`}></div>
                    </div>
                    <div className="counter-block" onClick={
                      () => vowSwitch(7)
                    }>
                      <div className={`counter-block__square square-1 ${vowDisplay(25)}`}></div>
                      <div className={`counter-block__square square-2 ${vowDisplay(26)}`}></div>
                      <div className={`counter-block__square square-3 ${vowDisplay(27)}`}></div>
                      <div className={`counter-block__square square-4 ${vowDisplay(28)}`}></div>
                    </div>
                    <div className="counter-block" onClick={
                      () => vowSwitch(8)
                    }>
                      <div className={`counter-block__square square-1 ${vowDisplay(29)}`}></div>
                      <div className={`counter-block__square square-2 ${vowDisplay(30)}`}></div>
                      <div className={`counter-block__square square-3 ${vowDisplay(31)}`}></div>
                      <div className={`counter-block__square square-4 ${vowDisplay(32)}`}></div>
                    </div>
                    <div className="counter-block" onClick={
                      () => vowSwitch(9)
                    }>
                      <div className={`counter-block__square square-1 ${vowDisplay(33)}`}></div>
                      <div className={`counter-block__square square-2 ${vowDisplay(34)}`}></div>
                      <div className={`counter-block__square square-3 ${vowDisplay(35)}`}></div>
                      <div className={`counter-block__square square-4 ${vowDisplay(36)}`}></div>
                    </div>
                    <div className="counter-block" onClick={
                      () => vowSwitch(10)
                    }>
                      <div className={`counter-block__square square-1 ${vowDisplay(37)}`}></div>
                      <div className={`counter-block__square square-2 ${vowDisplay(38)}`}></div>
                      <div className={`counter-block__square square-3 ${vowDisplay(39)}`}></div>
                      <div className={`counter-block__square square-4 ${vowDisplay(40)}`}></div>
                    </div>
                  </div>
                </div>
                <div className="vows-container action height-half width-1-1">
                  <button onClick={
                    () => {
                      props.setDeleteVow({
                        id: vow.vowId,
                        name: vow.name,
                        index: index,
                        charIndex: props.charListIndex
                      });
                      props.setModalShown({
                        display: true,
                        modal: 'deleteVow'
                      });
                    }
                  }>Complete / Delete</button>
                </div>
              </div>
            );
          }
        }
      )
    );
  };

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
        <span className="score">{`${characterVow.length} / 5`}</span>
      </div>
      {showVows()}
    </>
  );
};

export default CharacterVow;

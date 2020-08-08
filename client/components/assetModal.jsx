import React from 'react';
import assets from '../assets/assetSets/assets';
import { IdContext } from './app';
import { CharacterContext } from './main';
import deepCopy from '../tools/deepCopy';

const AssetModal = props => {
  const [newAssetState, setNewAssetState] = React.useState('type');
  const [selectedType, setSelectedType] = React.useState('');
  const [selectedAsset, setSelectedAsset] = React.useState('');
  const [uniqueNameState, setUniquNameState] = React.useState('');
  const [optionState, setOptionState] = React.useState(0);

  const id = React.useContext(IdContext);
  const charList = React.useContext(CharacterContext);

  React.useEffect(
    () => {
      if (props.modalType === 'new') {
        setNewAssetState('type');
      } else if (props.modalType === 'edit') {
        const assetDetail = assets.filter(item => item.name === props.activeAsset.name);
        setSelectedType(assetDetail[0].type);
        setSelectedAsset(props.activeAsset.name);
        setNewAssetState('detail');
      }
    }, [props.modalShown]
  );

  React.useEffect(
    () => {
      if (document.getElementsByClassName('modal-body__detail')[0]) {
        document.getElementsByClassName('modal-body__detail')[0].scrollTop = 0;
      } else if (document.getElementsByClassName('modal-body__list')[0]) {
        document.getElementsByClassName('modal-body__list')[0].scrollTop = 0;
        setUniquNameState('');
        setOptionState(0);
      }
    }, [newAssetState]
  );

  React.useEffect(
    () => {
      setUniquNameState(props.activeAsset.uniqueName);
      setOptionState(props.activeAsset.option);
    }, [props.activeAsset.index]
  );

  const showList = () => {
    const listArray = assets.filter(item => item.type === selectedType);
    return (
      listArray.map(item => {
        return (
          <div className="list" key={`asset${item.id}`} onClick={
            () => {
              setSelectedAsset(item.name);
              setNewAssetState('detail');
            }
          }>
            <span>{item.name}</span>
          </div>
        );
      })
    );
  };

  const displayLabel = (assetId, optionIndex) => {
    const selected = assets.filter(item => parseInt(item.id) === parseInt(assetId));
    const showName = () => selected[0].option[optionIndex].name || null;
    const nameMargin = () => selected[0].option[optionIndex].name ? '' : 'hide';
    const showDescription = () => {
      return selected[0].option[optionIndex].description;
    };
    const showOption = () => {
      if ('option' in selected[0].option[optionIndex]) {
        return selected[0].option[optionIndex].option.map((item, index) => {
          return (
            <div className="option-detail" key={`${selected[0].name}-option-${optionIndex}-${index}`}>
              <span >{item}</span>
            </div>
          );
        });
      } else return null;
    };
    return (
      <div className="detail-option__container">
        <div className={`detail-option__container__name ${nameMargin()}`}>
          {showName()}
        </div>
        <div className="detail-option__container__description">
          {showDescription()}
        </div>
        <div className="detail-option__container__option">
          {showOption()}
        </div>
      </div>
    );
  };

  const showDetail = () => {
    const assetDetail = assets.filter(item => item.name === selectedAsset);
    const hiddenDisplay = shown => shown ? '' : 'hide';
    const healthDisplay = (display, health) => {
      if (display <= health) return 'active';
      else return 'inactivate';
    };
    const defaultCheck = index => {
      if (assetDetail[0].default) {
        return index === 1 || index === 4;
      } else {
        return index === optionState;
      }
    };
    const nameFeedbackCheck = () => {
      if (assetDetail[0].uniqueName.detail) {
        return assetDetail[0].uniqueName.detail[0].toUpperCase() + assetDetail[0].uniqueName.detail.split('').slice(1).join('');
      } else return null;
    };
    return (
      <div className="detail">
        <div className={`detail-name ${hiddenDisplay(assetDetail[0].name)}`}>
          <span>{assetDetail[0].name}</span>
        </div>
        <div className={`detail-text ${hiddenDisplay(assetDetail[0].text)}`}>
          <span>{assetDetail[0].text}</span>
        </div>
        <div className={`detail-uniqueName ${hiddenDisplay(assetDetail[0].uniqueName.show)}`}>
          <input type="text" name="detail-uniqueName__input" id="detail-uniqueName__input"
            placeholder={`Enter ${assetDetail[0].uniqueName.detail}.`} required
            value={uniqueNameState} onChange={
              e => {
                setUniquNameState(e.target.value);
                if (document.getElementById('detail-uniqueName__input').checkValidity()) document.getElementById('uniqueName-feedback__empty').classList.add('hide');
                else document.getElementById('uniqueName-feedback__empty').classList.remove('hide');
              }
            }/>
          <div className="uniqueName__feedback">
            <span id='uniqueName-feedback__empty' className="empty hide">{`${nameFeedbackCheck()} is required.`}</span>
          </div>
        </div>
        <div className={`detail-health ${hiddenDisplay(assetDetail[0].maxHealth)}`}>
          <div className="detail-health__container">
            <div className={`detail-health__block ${healthDisplay(1, assetDetail[0].maxHealth)}`}>
              <span>1</span>
            </div>
            <div className={`detail-health__block ${healthDisplay(2, assetDetail[0].maxHealth)}`}>
              <span>2</span>
            </div>
            <div className={`detail-health__block ${healthDisplay(3, assetDetail[0].maxHealth)}`}>
              <span>3</span>
            </div>
            <div className={`detail-health__block ${healthDisplay(4, assetDetail[0].maxHealth)}`}>
              <span>4</span>
            </div>
            <div className={`detail-health__block ${healthDisplay(5, assetDetail[0].maxHealth)}`}>
              <span>5</span>
            </div>
            <div className={`detail-health__block ${healthDisplay(6, assetDetail[0].maxHealth)}`}>
              <span>6</span>
            </div>
          </div>
        </div>
        <div className="detail-option">
          <ul>
            <li className="option__1">
              <input type="radio" name="detail-option" id="detail-option__1"
                className="detail-option__input" defaultChecked={defaultCheck(1)}
                onChange={
                  e => {
                    if (e.target.value === 'on') {
                      setOptionState(1);
                      document.getElementById('option-feedback__empty').classList.add('hide');
                    }
                  }
                }/>
              <label htmlFor="detail-option__1">
                <div className="check">
                  <div className="check-light"></div>
                </div>
                {displayLabel(assetDetail[0].id, 0)}
              </label>
            </li>
            <li className="option__2">
              <input type="radio" name="detail-option" id="detail-option__2"
                className="detail-option__input" disabled={defaultCheck(4)}
                defaultChecked={defaultCheck(2)} onChange={
                  e => {
                    if (e.target.value === 'on') {
                      setOptionState(2);
                      document.getElementById('option-feedback__empty').classList.add('hide');
                    }
                  }
                }/>
              <label htmlFor="detail-option__2">
                <div className="check">
                  <div className="check-light"></div>
                </div>
                {displayLabel(assetDetail[0].id, 1)}
              </label>
            </li>
            <li className="option__3">
              <input type="radio" name="detail-option" id="detail-option__3"
                className="detail-option__input" disabled={defaultCheck(4)}
                defaultChecked={defaultCheck(3)} onChange={
                  e => {
                    if (e.target.value === 'on') {
                      setOptionState(3);
                      document.getElementById('option-feedback__empty').classList.add('hide');
                    }
                  }
                }/>
              <label htmlFor="detail-option__3">
                <div className="check">
                  <div className="check-light"></div>
                </div>
                {displayLabel(assetDetail[0].id, 2)}
              </label>
            </li>
          </ul>
          <div className="option__feedback">
            <span id='option-feedback__empty' className="empty hide">An asset ability is required.</span>
          </div>
        </div>
        <div className="detail-feedback">
          <div className="duplicate__feedback">
            <span id='duplicate-feedback' className="duplicate hide">{`${assetDetail[0].name} is already selected.`}</span>
          </div>
        </div>
      </div>
    );
  };

  const assetHealthLookUp = name => {
    const assetDetail = assets.filter(item => item.name === name);
    return assetDetail[0].maxHealth;
  };

  const confirmHandler = () => {
    const assetDetail = assets.filter(item => item.name === selectedAsset);
    const inputUniqueName = document.getElementById('detail-uniqueName__input');
    const inputOption1 = document.getElementById('detail-option__1');
    const inputOption2 = document.getElementById('detail-option__2');
    const inputOption3 = document.getElementById('detail-option__3');
    const emptyUniqueName = document.getElementById('uniqueName-feedback__empty');
    const emptyOption = document.getElementById('option-feedback__empty');
    const duplicateAsset = document.getElementById('duplicate-feedback');
    const checkDuplicate = () => {
      if (assetDetail[0].name === props.assetState.asset1.name ||
          assetDetail[0].name === props.assetState.asset2.name ||
          assetDetail[0].name === props.assetState.asset3.name) {
        if (assetDetail[0].id > 10) return true;
        else return false;
      } else return false;
    };
    const validateInput = () => {
      if (inputOption1.checked || inputOption2.checked || inputOption3.checked) {
        if (assetDetail[0].uniqueName.show) {
          if (inputUniqueName.checkValidity()) {
            if (checkDuplicate()) {
              if ((props.activeAsset.index === 1 && assetDetail[0].name === props.assetState.asset1.name) ||
                (props.activeAsset.index === 2 && assetDetail[0].name === props.assetState.asset2.name) ||
                (props.activeAsset.index === 3 && assetDetail[0].name === props.assetState.asset3.name)) return true;
              else return false;
            } else return true;
          } else return false;
        } else {
          if (checkDuplicate()) {
            if ((props.activeAsset.index === 1 && assetDetail[0].name === props.assetState.asset1.name) ||
              (props.activeAsset.index === 2 && assetDetail[0].name === props.assetState.asset2.name) ||
              (props.activeAsset.index === 3 && assetDetail[0].name === props.assetState.asset3.name)) return true;
            else return false;
          } else return true;
        }
      } else return false;
    };
    if (validateInput()) {
      duplicateAsset.classList.add('hide');
      emptyUniqueName.classList.add('hide');
      emptyOption.classList.add('hide');
      if (props.activeAsset.index === 1) {
        props.setAssetState({
          ...props.assetState,
          asset1: {
            name: assetDetail[0].name,
            uniqueName: uniqueNameState,
            option: optionState,
            health: assetHealthLookUp(assetDetail[0].name),
            index: 1
          }
        });
      } else if (props.activeAsset.index === 2) {
        props.setAssetState({
          ...props.assetState,
          asset2: {
            name: assetDetail[0].name,
            uniqueName: uniqueNameState,
            option: optionState,
            health: assetHealthLookUp(assetDetail[0].name),
            index: 2
          }
        });
      } else if (props.activeAsset.index === 3) {
        props.setAssetState({
          ...props.assetState,
          asset3: {
            name: assetDetail[0].name,
            uniqueName: uniqueNameState,
            option: optionState,
            health: assetHealthLookUp(assetDetail[0].name),
            index: 3
          }
        });
      }
      props.setModalShown(false);
    } else {
      if (assetDetail[0].uniqueName.show) {
        if (!inputUniqueName.checkValidity()) emptyUniqueName.classList.remove('hide');
      }
      if (!(inputOption1.checked || inputOption2.checked || inputOption3.checked)) {
        emptyOption.classList.remove('hide');
      }
      if (checkDuplicate()) {
        duplicateAsset.classList.remove('hide');
      }
    }
  };

  const displayModal = () => {
    const assetSelection = () => {
      if (newAssetState === 'type') {
        return (
          <div className="modal-body__type">
            <div className="modal-body__type__container">
              <div className="modal-body__type__button" onClick={
                () => {
                  setSelectedType('Companion');
                  setNewAssetState('list');
                }
              }>
                <i className="fas fa-horse-head"></i>
                <span>Companion</span>
              </div>
            </div>
            <div className="modal-body__type__container">
              <div className="modal-body__type__button" onClick={
                () => {
                  setSelectedType('Path');
                  setNewAssetState('list');
                }
              }>
                <i className="fas fa-map-signs"></i>
                <span>Path</span>
              </div>
            </div>
            <div className="modal-body__type__container">
              <div className="modal-body__type__button" onClick={
                () => {
                  setSelectedType('Combat');
                  setNewAssetState('list');
                }
              }>
                <i className="fas fa-shield-alt"></i>
                <span>Combat</span>
              </div>
            </div>
            <div className="modal-body__type__container">
              <div className="modal-body__type__button" onClick={
                () => {
                  setSelectedType('Ritual');
                  setNewAssetState('list');
                }
              }>
                <i className="fas fa-scroll"></i>
                <span>Ritual</span>
              </div>
            </div>
          </div>
        );
      } else if (newAssetState === 'list') {
        return (
          <div className="modal-body__list">
            <div className="modal-body__back">
              <i className="fas fa-long-arrow-alt-left" onClick={
                () => setNewAssetState('type')
              }></i>
            </div>
            <div className="modal-body__list__container">
              {showList()}
            </div>
          </div>
        );
      } else if (newAssetState === 'detail') {
        return (
          <div className="modal-body__detail">
            <div className="modal-body__back">
              <i className="fas fa-long-arrow-alt-left" onClick={
                () => setNewAssetState('list')
              }></i>
            </div>
            <div className="modal-body__detail__container">
              {showDetail()}
            </div>
            <div className="modal-action">
              <button className="confirm" onClick={confirmHandler}>Confirm</button>
              <button className="cancel" onClick={
                () => props.setModalShown(false)
              }>Cancel</button>
            </div>
          </div>
        );
      }
    };

    if (props.modalType === 'new') {
      return (
        <div className="modal-container new">
          <div className="modal-header"></div>
          <div className="modal-body">
            {assetSelection()}
          </div>
        </div>
      );
    } else if (props.modalType === 'delete') {
      return (
        <div className="modal-container delete">
          <div className="modal-header"></div>
          <div className="modal-body">
            <i className="fas fa-fire-alt"></i>
            <span>{`Delete ${props.activeAsset.name}?`}</span>
          </div>
          <div className="modal-action">
            <button className="delete" onClick={
              () => {
                setUniquNameState('');
                setOptionState(0);
                if (props.activeAsset.index === 1) {
                  props.setAssetState({
                    ...props.assetState,
                    asset1: {
                      name: '',
                      uniqueName: '',
                      option: 0,
                      index: 1
                    }
                  });
                } else if (props.activeAsset.index === 2) {
                  props.setAssetState({
                    ...props.assetState,
                    asset2: {
                      name: '',
                      uniqueName: '',
                      option: 0,
                      index: 2
                    }
                  });
                } else if (props.activeAsset.index === 3) {
                  props.setAssetState({
                    ...props.assetState,
                    asset3: {
                      name: '',
                      uniqueName: '',
                      option: 0,
                      index: 3
                    }
                  });
                }
                props.setModalShown(false);
              }
            }>Delete</button>
            <button className="cancel" onClick={
              () => props.setModalShown(false)
            }>Cancel</button>
          </div>
        </div>
      );
    } else if (props.modalType === 'edit') {
      return (
        <div className="modal-container edit">
          <div className="modal-header"></div>
          <div className="modal-body">
            {assetSelection()}
          </div>
        </div>
      );
    } else if (props.modalType === 'full') {
      return (
        <div className="modal-container full">
          <div className="modal-header"></div>
          <div className="modal-body">
            <i className="fas fa-pen-fancy"></i>
            <span>Only 8 characters allowed!</span>
          </div>
          <div className="modal-action">
            <button className="confirm" onClick={
              () => props.setModalShown(false)
            }>Confirm</button>
          </div>
        </div>
      );
    } else if (props.modalType === 'deleteChar') {
      return (
        <div className="modal-container delete">
          <div className="modal-header"></div>
          <div className="modal-body">
            <i className="fas fa-fire-alt"></i>
            <span>{`Delete ${props.characterName}?`}</span>
          </div>
          <div className="modal-action">
            <button className="delete" onClick={
              () => {
                if (parseInt(id.id) === 0 && parseInt(sessionStorage.getItem('id')) === 0) {
                  const sessionCharList = (Array.isArray(JSON.parse(sessionStorage.getItem('character')))) || [];
                  let newCharList = [];
                  if (sessionCharList.length > 0) {
                    if (charList.characterList) {
                      if (charList.characterList.length === 0) newCharList = deepCopy(sessionCharList);
                      else newCharList = deepCopy(charList.characterList);
                    } else newCharList = deepCopy(sessionCharList);
                  } else if (charList.characterList) newCharList = deepCopy(charList.characterList);
                  newCharList.splice(props.charListIndex, 1);
                  charList.setCharacterList(newCharList);
                  sessionStorage.setItem('character', JSON.stringify(newCharList));
                  props.returnGamePage();
                } else {
                  const deleteCharInit = {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' }
                  };
                  fetch(`/api/character/${props.characterId}`, deleteCharInit)
                    .then(res => {
                      props.returnGamePage();
                    });
                }
              }
            }>Delete</button>
            <button className="cancel" onClick={
              () => props.setModalShown(false)
            }>Cancel</button>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      {displayModal()}
    </>
  );
};

export default AssetModal;

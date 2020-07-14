import React from 'react';
import assets from '../assets/assetSets/assets';

const AssetModal = props => {
  const [newAssetState, setNewAssetState] = React.useState('type');
  const [selectedType, setSelectedType] = React.useState('');
  const [selectedAsset, setSelectedAsset] = React.useState('');

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
        <div className="detail-option__container__name">
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
    return (
      <div className="detail">
        <div className="detail-name">
          <span>{assetDetail[0].name}</span>
        </div>
        <div className="detail-text">
          <span>{assetDetail[0].text}</span>
        </div>
        <div className={`detail-uniqueName ${hiddenDisplay(assetDetail[0].uniqueName)}`}>
          <input type="text" name="detail-uniqueName__input" id="detail-uniqueName__input"/>
        </div>
        <div className={`detail-health ${hiddenDisplay(assetDetail[0].maxHealth)}`}>
          <span>{assetDetail[0].maxHealth}</span>
        </div>
        <div className="detail-option">
          <ul>
            <li className="option__1">
              <input type="radio" name="detail-option" id="detail-option__1"/>
              <label htmlFor="detail-option__1">{displayLabel(assetDetail[0].id, 0)}</label>
              <div className="check"></div>
            </li>
            <li className="option__2">
              <input type="radio" name="detail-option" id="detail-option__2" />
              <label htmlFor="detail-option__2">{displayLabel(assetDetail[0].id, 1)}</label>
              <div className="check"></div>
            </li>
            <li className="option__3">
              <input type="radio" name="detail-option" id="detail-option__3" />
              <label htmlFor="detail-option__3">{displayLabel(assetDetail[0].id, 2)}</label>
              <div className="check"></div>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  React.useEffect(
    () => {
      setNewAssetState('type');
    }, [props.modalShown]
  );

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
              <button className="confirm">Confirm</button>
              <button className="cancel">Cancel</button>
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
            <span>{`Delete ${props.activeAsset}?`}</span>
          </div>
          <div className="modal-action">
            <button className="delete">Delete</button>
            <button className="cancel">Cancel</button>
          </div>
        </div>
      );
    } else if (props.modalType === 'edit') {
      return (
        <div className="modal-container edit">
          <div className="modal-header"></div>
          <div className="modal-body">
            <i className="fas fa-pen-fancy"></i>
          </div>
          <div className="modal-action"></div>
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

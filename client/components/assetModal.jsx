import React from 'react';
import assets from '../assets/assetSets/assets';

const AssetModal = props => {
  const [newAssetState, setNewAssetState] = React.useState('type');
  const [selectedType, setSelectedType] = React.useState('');

  const selectList = () => {
    const listArray = assets.filter(item => item.type === selectedType);
    return (
      listArray.map(item => {
        // need key
        return (
          <div className="list" key={`asset${item.id}`}>
            <span>{item.name}</span>
          </div>
        );
      })
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
              {selectList()}
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
          <div className="modal-action"></div>
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
            <button className="delete-confirm">Delete</button>
            <button className="delete-cancel">Cancel</button>
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

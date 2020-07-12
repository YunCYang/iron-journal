import React from 'react';

const AssetModal = props => {
  const [newAssetState, setNewAssetState] = React.useState('type');

  React.useEffect(
    () => {
      setNewAssetState('type');
    }, [props.modalShown]
  );

  const displayModal = () => {
    const assetSelection = () => {
      if (newAssetState === 'type') {
        return (
          <>
            <div className="modal-body__type">
              <div className="modal-body__type__button" onClick={
                () => {
                  setNewAssetState('list');
                }
              }>
                <i className="fas fa-horse-head"></i>
                <span>Companion</span>
              </div>
            </div>
            <div className="modal-body__type">
              <div className="modal-body__type__button" onClick={
                () => {
                  setNewAssetState('list');
                }
              }>
                <i className="fas fa-map-signs"></i>
                <span>Path</span>
              </div>
            </div>
            <div className="modal-body__type">
              <div className="modal-body__type__button" onClick={
                () => {
                  setNewAssetState('list');
                }
              }>
                <i className="fas fa-shield-alt"></i>
                <span>Combat</span>
              </div>
            </div>
            <div className="modal-body__type">
              <div className="modal-body__type__button" onClick={
                () => {
                  setNewAssetState('list');
                }
              }>
                <i className="fas fa-scroll"></i>
                <span>Ritual</span>
              </div>
            </div>
          </>
        );
      } else if (newAssetState === 'list') {
        return (
          <></>
        );
      } else if (newAssetState === 'detail') {
        return (
          <></>
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

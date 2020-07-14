import React from 'react';

const ShowAsset = props => {
  const displayAsset = () => {
    return (
      Object.values(props.assetState).map((item, index) => {
        if (!item) {
          return (
            <div key={`asset${index}`} className="asset-input__container__asset">
              <div className="asset-block__new" onClick={
                () => {
                  props.setModalType('new');
                  props.setModalShown(true);
                }
              }>
                <i className="fas fa-plus"></i>
                <span>Add new asset</span>
              </div>
            </div>
          );
        } else {
          return (
            <div key={`asset${index}`} className="asset-input__container__asset">
              <div className="asset-block__exist">
                <div className="asset-block__exist__name">
                  <span>{item}</span>
                </div>
                <div className="asset-block__exist__action">
                  <i className="fas fa-edit" onClick={
                    () => {
                      props.setModalShown(true);
                      props.setActiveAsset(item);
                      props.setModalType('edit');
                    }
                  }></i>
                  <i className="fas fa-times" onClick={
                    () => {
                      props.setModalShown(true);
                      props.setActiveAsset(item);
                      props.setModalType('delete');
                    }
                  }></i>
                </div>
              </div>
            </div>
          );
        }
      })
    );
  };

  return (
    <>
      {displayAsset()}
    </>
  );
};

export default ShowAsset;

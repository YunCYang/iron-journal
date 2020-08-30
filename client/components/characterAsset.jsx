import React from 'react';
import { IdContext } from './app';
// import { CharacterContext } from './main';
import deepCopy from '../tools/deepCopy';
// import assets from '../assets/assetSets/assets';

const CharacterAsset = props => {
  const id = React.useContext(IdContext);
  // const charList = React.useContext(CharacterContext);
  const [characterAsset, setCharacterAsset] = React.useState([]);
  // const [addAsset, setAddAsset] = React.useState(0);
  // const [assetHealth, setAssetHealth] = React.useState(0);

  React.useEffect(
    () => {
      if (parseInt(id.id) === 0 && parseInt(sessionStorage.getItem('id')) === 0) {
        setCharacterAsset(props.selectedChar.assets);
      } else {
        fetch(`/api/asset/all/${props.selectedChar.characterId}`)
          .then(res => res.json())
          .then(res => {
            setCharacterAsset(res);
          });
      }
    }
  );

  const assetExpandHandler = () => {
    const assetContainer = document.getElementsByClassName('main-container__character__assets')[0];
    const assetExpand = document.getElementById('asset-expand');
    const assetShrink = document.getElementById('asset-shrink');
    if (assetContainer.classList.contains('height-assets-container')) {
      assetContainer.classList.add('height-single');
      assetContainer.classList.add('hide-overflow');
      assetContainer.classList.remove('height-assets-container');
      assetShrink.classList.add('hide');
      assetExpand.classList.remove('hide');
    } else {
      assetContainer.classList.add('height-assets-container');
      assetContainer.classList.remove('hide-overflow');
      assetContainer.classList.remove('height-single');
      assetExpand.classList.add('hide');
      assetShrink.classList.remove('hide');
    }
  };

  const showAssets = () => {
    const tempAsset = deepCopy(characterAsset);
    if (tempAsset.length < 10) {
      tempAsset.push({ assetId: 0 });
    }
    const hiddenDisplay = shown => shown ? '' : 'hide';
    const healthDisplay = (display, health) => {
      if (display <= health) return 'active';
      else return 'inactive';
    };
    return (
      tempAsset.map(
        (asset, index) => {
          // console.log(asset);
          // console.log(asset.health);
          if (asset.assetId === 0) {
            return null;
          } else {
            return (
              <div className="assets-container asset" key={`asset-${asset.assetId}-${index}`}>
                <div className="assets-container name height-3-4 width-1-1">
                  <span className="assetName">{asset.assetName}</span>
                </div>
                <div className={`assets-container health width-1-1 ${hiddenDisplay(asset.health)}`}>
                  <div className="detail-health__container">
                    <div className={`detail-health__block ${healthDisplay(1, asset.health)}`}>
                      <span>1</span>
                    </div>
                    <div className={`detail-health__block ${healthDisplay(2, asset.health)}`}>
                      <span>2</span>
                    </div>
                    <div className={`detail-health__block ${healthDisplay(3, asset.health)}`}>
                      <span>3</span>
                    </div>
                    <div className={`detail-health__block ${healthDisplay(4, asset.health)}`}>
                      <span>4</span>
                    </div>
                    <div className={`detail-health__block ${healthDisplay(5, asset.health)}`}>
                      <span>5</span>
                    </div>
                    <div className={`detail-health__block ${healthDisplay(6, asset.health)}`}>
                      <span>6</span>
                    </div>
                  </div>
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
      <div className="assets-container title width-1-3">
        <span>Assets</span>
      </div>
      <div className="assets-container expand width-1-3" onClick={assetExpandHandler}>
        <i id="asset-expand" className="fas fa-caret-down"></i>
        <i id="asset-shrink" className="fas fa-caret-up hide"></i>
      </div>
      <div className="assets-container score width-1-3">
        <span className="label">Count</span>
        <span className="score">{`${characterAsset.length}`}</span>
      </div>
      {showAssets()}
    </>
  );
};

export default CharacterAsset;

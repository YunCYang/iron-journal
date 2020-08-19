import React from 'react';

const CharacterVows = props => {
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
      <div className="vows-container vow"></div>
      <div className="vows-container vow"></div>
      <div className="vows-container vow"></div>
      <div className="vows-container vow"></div>
      <div className="vows-container vow"></div>
    </>
  );
};

export default CharacterVows;

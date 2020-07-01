import React from 'react';

const Character = () => {
  const createName = () => {
    return (
      <>
        <span className="content">Percival Derolo</span>
      </>
    );
  };

  const createExp = () => {
    return (
      <>
        <span className="label">Exp</span>
        <span className="content">30</span>
      </>
    );
  };

  const create5stats = () => {
    return (
      <>
        <div className="5stats-container">
          <span className="title-s">Stats</span>
        </div>
        <div className="5stats-container edge">
          <span className="label">Edge</span>
          <span className="content">3</span>
        </div>
        <div className="5stats-container heart">
          <span className="label">Heart</span>
          <span className="content">2</span>
        </div>
        <div className="5stats-container iron">
          <span className="label">Iron</span>
          <span className="content">1</span>
        </div>
        <div className="5stats-container shadow">
          <span className="label">Shadow</span>
          <span className="content">2</span>
        </div>
        <div className="5stats-container wits">
          <span className="label">Wits</span>
          <span className="content">3</span>
        </div>
      </>
    );
  };

  const createStatus = () => {
    return (
      <>
        <div className="status-container">
          <span className="title-s">Status Tracks</span>
        </div>
        <div className="status-container health">
          <span className="label">Health</span>
          <span className="content">+5</span>
        </div>
        <div className="status-container spirit">
          <span className="label">Spirit</span>
          <span className="content">+4</span>
        </div>
        <div className="status-container supply">
          <span className="label">Supply</span>
          <span className="content">+3</span>
        </div>
      </>
    );
  };

  const createMomentum = () => {
    return (
      <>
        <div className="momentum-container title-s">
          <span className="title">Momentum</span>
        </div>
        <div className="momentum-container momentum">
          <span className="label">Momentum</span>
          <span className="content">+10</span>
        </div>
        <div className="momentum-container max">
          <span className="label">Max</span>
          <span className="content">+10</span>
        </div>
        <div className="momentum-container reset">
          <span className="label">Reset</span>
          <span className="content">+10</span>
        </div>
      </>
    );
  };

  const createBonds = () => {
    return (
      <>
        <div className="bonds-container title-m">
          <span className="title">Bonds</span>
        </div>
        <div className="bonds-container score">
          <span className="score">10</span>
        </div>
        <div className="bonds-container level">
          <div className="bonds-container bond">
            <span className="content">Pike Trickfoot</span>
          </div>
          <div className="bonds-container bond">
            <span className="content">Pike Trickfoot</span>
          </div>
          <div className="bonds-container bond">
            <span className="content">Pike Trickfoot</span>
          </div>
          <div className="bonds-container bond">
            <span className="content">Pike Trickfoot</span>
          </div>
        </div>
        <div className="bonds-container level">
          <div className="bonds-container bond">
            <span className="content">Pike Trickfoot</span>
          </div>
          <div className="bonds-container bond">
            <span className="content">Pike Trickfoot</span>
          </div>
          <div className="bonds-container bond">
            <span className="content">Pike Trickfoot</span>
          </div>
          <div className="bonds-container bond">
            <span className="content">Pike Trickfoot</span>
          </div>
        </div>
        <div className="bonds-container level">
          <div className="bonds-container bond">
            <span className="content">Pike Trickfoot</span>
          </div>
          <div className="bonds-container bond">
            <span className="content">Pike Trickfoot</span>
          </div>
          <div className="bonds-container bond">
            <span className="content">Pike Trickfoot</span>
          </div>
          <div className="bonds-container bond">
            <span className="content">Pike Trickfoot</span>
          </div>
        </div>
        <div className="bonds-container level">
          <div className="bonds-container bond">
            <span className="content">Pike Trickfoot</span>
          </div>
          <div className="bonds-container bond">
            <span className="content">Pike Trickfoot</span>
          </div>
          <div className="bonds-container bond">
            <span className="content">Pike Trickfoot</span>
          </div>
          <div className="bonds-container bond">
            <span className="content">Pike Trickfoot</span>
          </div>
        </div>
        <div className="bonds-container level">
          <div className="bonds-container bond">
            <span className="content">Pike Trickfoot</span>
          </div>
          <div className="bonds-container bond">
            <span className="content">Pike Trickfoot</span>
          </div>
          <div className="bonds-container bond">
            <span className="content">Pike Trickfoot</span>
          </div>
          <div className="bonds-container bond">
            <span className="content">Pike Trickfoot</span>
          </div>
        </div>
        <div className="bonds-container level">
          <div className="bonds-container bond">
            <span className="content">Pike Trickfoot</span>
          </div>
          <div className="bonds-container bond">
            <span className="content">Pike Trickfoot</span>
          </div>
          <div className="bonds-container bond">
            <span className="content">Pike Trickfoot</span>
          </div>
          <div className="bonds-container bond">
            <span className="content">Pike Trickfoot</span>
          </div>
        </div>
        <div className="bonds-container level">
          <div className="bonds-container bond">
            <span className="content">Pike Trickfoot</span>
          </div>
          <div className="bonds-container bond">
            <span className="content">Pike Trickfoot</span>
          </div>
          <div className="bonds-container bond">
            <span className="content">Pike Trickfoot</span>
          </div>
          <div className="bonds-container bond">
            <span className="content">Pike Trickfoot</span>
          </div>
        </div>
        <div className="bonds-container level">
          <div className="bonds-container bond">
            <span className="content">Pike Trickfoot</span>
          </div>
          <div className="bonds-container bond">
            <span className="content">Pike Trickfoot</span>
          </div>
          <div className="bonds-container bond">
            <span className="content">Pike Trickfoot</span>
          </div>
          <div className="bonds-container bond">
            <span className="content">Pike Trickfoot</span>
          </div>
        </div>
        <div className="bonds-container level">
          <div className="bonds-container bond">
            <span className="content">Pike Trickfoot</span>
          </div>
          <div className="bonds-container bond">
            <span className="content">Pike Trickfoot</span>
          </div>
          <div className="bonds-container bond">
            <span className="content">Pike Trickfoot</span>
          </div>
          <div className="bonds-container bond">
            <span className="content">Pike Trickfoot</span>
          </div>
        </div>
        <div className="bonds-container level">
          <div className="bonds-container bond">
            <span className="content">Pike Trickfoot</span>
          </div>
          <div className="bonds-container bond">
            <span className="content">Pike Trickfoot</span>
          </div>
        </div>
      </>
    );
  };

  const createVows = () => {
    return (
      <>
        <div className="vows-container title-m">
          <span className="title">Vows</span>
        </div>
        <div className="vows-container vow">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="vows-container vow"></div>
        <div className="vows-container vow"></div>
        <div className="vows-container vow"></div>
        <div className="vows-container vow"></div>
      </>
    );
  };

  const createDebilities = () => {
    return (
      <></>
    );
  };

  return (
    <>
      <div className="main-container__character">
        <div className="main-container__character__name">
          {createName()}
        </div>
        <div className="main-container__character__exp">
          {createExp()}
        </div>
        <div className="main-container__character__5stats">
          {create5stats()}
        </div>
        <div className="main-container__character__status">
          {createStatus()}
        </div>
        <div className="main-container__character__momentum">
          {createMomentum()}
        </div>
        <div className="main-container__character__bonds">
          {createBonds()}
        </div>
        <div className="main-container__character__vows">
          {createVows()}
        </div>
        <div className="main-container__character__debilities">
          {createDebilities()}
        </div>
        <div className="main-container__character__edit">
          <span className="label">Save</span>
          <i className="fas fa-check"></i>
          <i className="fas fa-times"></i>
        </div>
      </div>
    </>
  );
};

export default Character;

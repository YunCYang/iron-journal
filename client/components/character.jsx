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
        <div className="5stats-container edge width-1-5">
          <span className="label">Edge</span>
          <span className="content">3</span>
        </div>
        <div className="5stats-container heart width-1-5">
          <span className="label">Heart</span>
          <span className="content">2</span>
        </div>
        <div className="5stats-container iron width-1-5">
          <span className="label">Iron</span>
          <span className="content">1</span>
        </div>
        <div className="5stats-container shadow width-1-5">
          <span className="label">Shadow</span>
          <span className="content">2</span>
        </div>
        <div className="5stats-container wits width-1-5">
          <span className="label">Wits</span>
          <span className="content">3</span>
        </div>
      </>
    );
  };

  const createStatus = () => {
    return (
      <>
        <div className="status-container health width-1-3">
          <span className="label">Health</span>
          <span className="content">+5</span>
        </div>
        <div className="status-container spirit width-1-3">
          <span className="label">Spirit</span>
          <span className="content">+4</span>
        </div>
        <div className="status-container supply width-1-3">
          <span className="label">Supply</span>
          <span className="content">+3</span>
        </div>
      </>
    );
  };

  const createMomentum = () => {
    return (
      <>
        <div className="momentum-container momentum width-3-5">
          <span className="label">Momentum</span>
          <span className="content">+10</span>
        </div>
        <div className="momentum-container max width-1-5">
          <span className="label">Max</span>
          <span className="content">+10</span>
        </div>
        <div className="momentum-container reset width-1-5">
          <span className="label">Reset</span>
          <span className="content">+10</span>
        </div>
      </>
    );
  };

  const createBonds = () => {
    return (
      <>
        <div className="bonds-container title">
          <span>Bonds</span>
        </div>
        <div className="bonds-container score">
          <span className="label">Score</span>
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
        <div className="vows-container title">
          <span>Vows</span>
        </div>
        <div className="vows-container vow">
          <div className="vows-container name">
            <span className="content">Something I want to do</span>
          </div>
          <div className="vows-container score">
            <span className="label">Score</span>
            <span className="score">10</span>
          </div>
          <div className="vows-container rank">
            <span>Epic</span>
          </div>
          <div className="vows-container progress">
            <span className="label">Progress</span>
            <span className="score">10</span>
          </div>
        </div>
        <div className="vows-container vow">
          <div className="vows-container name">
            <span className="content">Something I want to do</span>
          </div>
          <div className="vows-container score">
            <span className="label">Score</span>
            <span className="score">10</span>
          </div>
          <div className="vows-container rank">
            <span>Epic</span>
          </div>
          <div className="vows-container progress">
            <span className="label">Progress</span>
            <span className="score">10</span>
          </div>
        </div>
        <div className="vows-container vow">
          <div className="vows-container name">
            <span className="content">Something I want to do</span>
          </div>
          <div className="vows-container score">
            <span className="label">Score</span>
            <span className="score">10</span>
          </div>
          <div className="vows-container rank">
            <span>Epic</span>
          </div>
          <div className="vows-container progress">
            <span className="label">Progress</span>
            <span className="score">10</span>
          </div>
        </div>
        <div className="vows-container vow">
          <div className="vows-container name">
            <span className="content">Something I want to do</span>
          </div>
          <div className="vows-container score">
            <span className="label">Score</span>
            <span className="score">10</span>
          </div>
          <div className="vows-container rank">
            <span>Epic</span>
          </div>
          <div className="vows-container progress">
            <span className="label">Progress</span>
            <span className="score">10</span>
          </div>
        </div>
        <div className="vows-container vow">
          <div className="vows-container name">
            <span className="content">Something I want to do</span>
          </div>
          <div className="vows-container score">
            <span className="label">Score</span>
            <span className="score">10</span>
          </div>
          <div className="vows-container rank">
            <span>Epic</span>
          </div>
          <div className="vows-container progress">
            <span className="label">Progress</span>
            <span className="score">10</span>
          </div>
        </div>
      </>
    );
  };

  const createDebilities = () => {
    return (
      <>
        <div className="debilities-container title">
          <span>Debilities</span>
        </div>
        <div className="debilities-container__conditions">
          <div className="debilities-container__conditions title-s">
            <span className="title">Conditions</span>
          </div>
          <input className="radio-conditions__wounded" type="radio" name="radio-conditions"
            id="radio-conditions__wounded"/>
          <label className="label-conditions__wounded" htmlFor="radio-conditions__wounded">
            <span>Wounded</span>
          </label>
          <input className="radio-conditions__shaken" type="radio" name="radio-conditions"
            id="radio-conditions__shaken" />
          <label className="label-conditions__shaken" htmlFor="radio-conditions__shaken">
            <span>Shaken</span>
          </label>
          <input className="radio-conditions__unprepared" type="radio" name="radio-conditions"
            id="radio-conditions__unprepared" />
          <label className="label-conditions__unprepared" htmlFor="radio-conditions__unprepared">
            <span>Unprepared</span>
          </label>
          <input className="radio-conditions__encumbered" type="radio" name="radio-conditions"
            id="radio-conditions__encumbered" />
          <label className="label-conditions__encumbered" htmlFor="radio-conditions__encumbered">
            <span>Encumbered</span>
          </label>
        </div>
        <div className="debilities-container__banes">
          <div className="debilities-container__banes title-s">
            <span className="title">Banes</span>
          </div>
          <input className="radio-banes__maimed" type="radio" name="radio-banes"
            id="radio-banes__maimed" />
          <label className="label-banes__maimed" htmlFor="radio-banes__maimed">
            <span>Maimed</span>
          </label>
          <input className="radio-banes__corrupted" type="radio" name="radio-banes"
            id="radio-banes__corrupted" />
          <label className="label-banes__corrupted" htmlFor="radio-banes__corrupted">
            <span>Corrupted</span>
          </label>
        </div>
        <div className="debilities-container__burdens">
          <div className="debilities-container__burdens title-s">
            <span className="title">Burdens</span>
          </div>
          <input className="radio-burdens__cursed" type="radio" name="radio-burdens"
            id="radio-burdens__cursed" />
          <label className="label-burdens__cursed" htmlFor="radio-burdens__cursed">
            <span>Cursed</span>
          </label>
          <input className="radio-burdens__tormented" type="radio" name="radio-burdens"
            id="radio-burdens__tormented" />
          <label className="label-burdens__tormented" htmlFor="radio-burdens__tormented">
            <span>Tormented</span>
          </label>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="main-container__character">
        <div className="main-container__character__name width-2-3">
          {createName()}
        </div>
        <div className="main-container__character__exp width-1-3">
          {createExp()}
        </div>
        <div className="main-container__character__5stats width-1-1">
          {create5stats()}
        </div>
        <div className="main-container__character__status width-1-1">
          {createStatus()}
        </div>
        <div className="main-container__character__momentum width-1-1">
          {createMomentum()}
        </div>
        <div className="main-container__character__bonds width-1-1">
          {createBonds()}
        </div>
        <div className="main-container__character__vows width-1-1">
          {createVows()}
        </div>
        <div className="main-container__character__debilities width-1-1">
          {createDebilities()}
        </div>
        <div className="main-container__character__actions">
          <div className="main-container__character__actions__back">
            <span className="label">Back</span>
            <i className="fas fa-long-arrow-alt-left"></i>
          </div>
          <div className="main-container__character__actions__roll">
            <span className="label">Roll</span>
            <i className="fas fa-dice-d6"></i>
          </div>
          <div className="main-container__character__actions__save">
            <span className="label">Save</span>
            <i className="fas fa-check"></i>
            <i className="fas fa-times"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default Character;

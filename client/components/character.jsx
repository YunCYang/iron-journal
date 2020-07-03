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
        <div className="bonds-container title width-1-4">
          <span>Bonds</span>
        </div>
        <div className="bonds-container expand width-1-4">
          <i className="fas fa-caret-down"></i>
        </div>
        <div className="bonds-container score width-2-4">
          <span className="label">Score</span>
          <span className="score">10</span>
        </div>
        <div className="bonds-container counter height-single width-1-1">
          <div className="counter-container"></div>
          <div className="counter-container"></div>
          <div className="counter-container"></div>
          <div className="counter-container"></div>
          <div className="counter-container"></div>
          <div className="counter-container"></div>
          <div className="counter-container"></div>
          <div className="counter-container"></div>
          <div className="counter-container"></div>
          <div className="counter-container"></div>
        </div>
      </>
    );
  };

  const createVows = () => {
    return (
      <>
        <div className="vows-container title width-1-4">
          <span>Vows</span>
        </div>
        <div className="vows-container expand width-1-4">
          <i className="fas fa-caret-down"></i>
        </div>
        <div className="vows-container score width-2-4">
          <span className="score">0 / 5</span>
        </div>
        <div className="vows-container vow height-double-half">
          <div className="vows-container name height-single width-1-1">
            <span className="vowName">Something I want to do</span>
          </div>
          <div className="vows-container rank height-half width-1-1">
            <span className="vowRank">Troublesome</span>
          </div>
          <div className="vows-container counter height-half width-1-1">
            <div className="counter-container"></div>
            <div className="counter-container"></div>
            <div className="counter-container"></div>
            <div className="counter-container"></div>
            <div className="counter-container"></div>
            <div className="counter-container"></div>
            <div className="counter-container"></div>
            <div className="counter-container"></div>
            <div className="counter-container"></div>
            <div className="counter-container"></div>
          </div>
        </div>
        <div className="vows-container vow height-double-half">
          <div className="vows-container name height-single width-1-1">
            <span className="vowName">Something I want to do</span>
          </div>
          <div className="vows-container rank height-half width-1-1">
            <span className="vowRank">Troublesome</span>
          </div>
          <div className="vows-container counter height-half width-1-1">
            <div className="counter-container"></div>
            <div className="counter-container"></div>
            <div className="counter-container"></div>
            <div className="counter-container"></div>
            <div className="counter-container"></div>
            <div className="counter-container"></div>
            <div className="counter-container"></div>
            <div className="counter-container"></div>
            <div className="counter-container"></div>
            <div className="counter-container"></div>
          </div>
        </div>
        <div className="vows-container vow height-double-half">
          <div className="vows-container name height-single width-1-1">
            <span className="vowName">Something I want to do</span>
          </div>
          <div className="vows-container rank height-half width-1-1">
            <span className="vowRank">Troublesome</span>
          </div>
          <div className="vows-container counter height-half width-1-1">
            <div className="counter-container"></div>
            <div className="counter-container"></div>
            <div className="counter-container"></div>
            <div className="counter-container"></div>
            <div className="counter-container"></div>
            <div className="counter-container"></div>
            <div className="counter-container"></div>
            <div className="counter-container"></div>
            <div className="counter-container"></div>
            <div className="counter-container"></div>
          </div>
        </div>
        <div className="vows-container vow height-double-half">
          <div className="vows-container name height-single width-1-1">
            <span className="vowName">Something I want to do</span>
          </div>
          <div className="vows-container rank height-half width-1-1">
            <span className="vowRank">Troublesome</span>
          </div>
          <div className="vows-container counter height-half width-1-1">
            <div className="counter-container"></div>
            <div className="counter-container"></div>
            <div className="counter-container"></div>
            <div className="counter-container"></div>
            <div className="counter-container"></div>
            <div className="counter-container"></div>
            <div className="counter-container"></div>
            <div className="counter-container"></div>
            <div className="counter-container"></div>
            <div className="counter-container"></div>
          </div>
        </div>
        <div className="vows-container vow height-double-half">
          <div className="vows-container name height-single width-1-1">
            <span className="vowName">Something I want to do</span>
          </div>
          <div className="vows-container rank height-half width-1-1">
            <span className="vowRank">Troublesome</span>
          </div>
          <div className="vows-container counter height-half width-1-1">
            <div className="counter-container"></div>
            <div className="counter-container"></div>
            <div className="counter-container"></div>
            <div className="counter-container"></div>
            <div className="counter-container"></div>
            <div className="counter-container"></div>
            <div className="counter-container"></div>
            <div className="counter-container"></div>
            <div className="counter-container"></div>
            <div className="counter-container"></div>
          </div>
        </div>
      </>
    );
  };

  const createDebilities = () => {
    return (
      <>
        <div className="debilities-container title width-1-1">
          <span>Debilities</span>
        </div>
        <div className="debilities-container__conditions">
          <div className="debilities-container__conditions title-s">
            <span>Conditions</span>
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
            <span>Banes</span>
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
            <span>Burdens</span>
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
        <div className="main-container__character__name width-2-3 height-single">
          {createName()}
        </div>
        <div className="main-container__character__exp width-1-3 height-single">
          {createExp()}
        </div>
        <div className="main-container__character__5stats width-1-1 height-single">
          {create5stats()}
        </div>
        <div className="main-container__character__status width-1-1 height-single">
          {createStatus()}
        </div>
        <div className="main-container__character__momentum width-1-1 height-single">
          {createMomentum()}
        </div>
        <div className="main-container__character__bonds width-1-1 height-double">
          {createBonds()}
        </div>
        <div className="main-container__character__vows width-1-1 height-11-col">
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
          <div className="main-container__character__actions__delete">
            <span className="label">Delete</span>
            <i className="fas fa-ban"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default Character;

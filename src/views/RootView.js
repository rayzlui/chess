import React from 'react';
import { GameBoardContainer } from '../containers/GameBoardContainer';
import PropTypes from 'prop-types';

export function RootView(props) {
  const { turn, checkMate, check } = props;

  let header;
  let checkMessage = null;
  if (checkMate) {
    header = <p className="turn">{`Game Over ${turn} Wins!`.toUpperCase()}</p>;
  } else {
    header = <p className="turn">{`${turn} TURN`.toUpperCase()}</p>;
  }
  if (check) {
    checkMessage = <p className="check">{'CHECK'}</p>;
  }

  return (
    <div
      className="chess-container"
      style={{ textAlign: 'center', display: 'inline-block' }}
    >
      <div className="chess-header">
        <h1>CHESS GAME!</h1>
        {header}
        {checkMessage}
      </div>
      <div className="chess-board">
        <GameBoardContainer />
      </div>
    </div>
  );
}

RootView.propTypes = {
  turn: PropTypes.string,
  checkMate: PropTypes.bool,
  check: PropTypes.bool,
};

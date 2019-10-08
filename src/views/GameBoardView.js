import React, { useState } from 'react';
import { Grid } from './GridView';
import { getMoves } from '../helperFunctons/pieceMoves';
import { willMoveCauseCheck } from '../helperFunctons/checkFunctions';
import PropTypes from 'prop-types';

export function GameBoard(props) {
  const { board, turn, opponentPiece, movePiece, enpassant, check } = props;
  const [legalMoves, updateMoveOptions] = useState([]);
  const [selectedPiece, changePiece] = useState(null);
  let display = [];
  let row = [];
  let gridWhite = true;

  for (let i = 0; i < 64; i++) {
    let click;
    let color = gridWhite ? 'white' : 'blue';
    let image = null;
    let pieceAtI = board[i];
    if (pieceAtI) {
      image = pieceAtI.image;
      click =
        pieceAtI.color === turn
          ? () => {
              changePiece(i);
              //check is needed for castling, enpassant is needed for pawn.
              updateMoveOptions(getMoves(i, board, enpassant, check));
            }
          : () => null;
    }
    if (legalMoves.includes(i)) {
      let targetMove = i;
      color = 'green';
      click = () => {
        let causesCheck = willMoveCauseCheck(
          board,
          selectedPiece,
          targetMove,
          opponentPiece,
        );
        if (!causesCheck) {
          movePiece(selectedPiece, targetMove, turn); // this will be a dispatch
          updateMoveOptions([]);
        } else {
          alert('This move will cause you to be checked.');
        }
      };
    }
    let element = (
      <Grid key={i} id={i} color={color} piece={image} click={click} />
    );
    gridWhite = !gridWhite;
    row.push(element);
    if (row.length === 8) {
      display.push(<li key={i / 8}>{row}</li>);
      row = [];
      gridWhite = !gridWhite;
    }
  }
  return (
    <div className="gameboard" style={{ backgroundColor: 'black' }}>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>{display}</ul>
    </div>
  );
}

export default GameBoard;

GameBoard.propTypes = {
  board: PropTypes.object,
  turn: PropTypes.bool,
  opponentPiece: PropTypes.array,
  movePiece: PropTypes.func,
  enpassant: PropTypes.bool,
  check: PropTypes.bool,
};

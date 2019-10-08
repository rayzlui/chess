import { connect } from 'react-redux';
import { movePiece, moveWhite, moveBlack } from '../actions/actions';
import GameBoard from '../views/GameBoardView';

function mapStateToProps(state) {
  return {
    board: state.board.board,
    turn: state.turn,
    opponentPiece:
      state.turn === 'white'
        ? state.board.blackPieces
        : state.board.whitePieces,
    enpassant: state.board.enpassant,
    check: state.board.check,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    movePiece: (previous, target, color) => {
      dispatch(movePiece(previous, target, color));
      dispatch(color === 'white' ? moveWhite() : moveBlack());
    },
  };
}

export const GameBoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameBoard);

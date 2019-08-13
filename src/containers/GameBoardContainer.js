import { connect } from "react-redux";
import { moveWhite, moveBlack } from "../actions/actions";
import GameBoard from "../views/GameBoardView";

function mapStateToProps(state) {
  return {
    board: state.board.board,
    turn: state.turn,
    whitePieces: state.board.whitePieces,
    blackPieces: state.board.blackPieces,
    enpassant: state.board.enpassant, 
    check: state.board.check,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    moveWhite: (previous, target) => dispatch(moveWhite(previous, target)),
    moveBlack: (previous, target) => dispatch(moveBlack(previous, target))
  };
}

export const GameBoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameBoard); 

import { BLACK_MOVE, WHITE_MOVE } from '../actions/actionTypes';
import { rankUpPawn } from '../helperFunctons/pawnRankUp';
import { copyBoard } from '../helperFunctons/copiesBoard';
import { isCheck, isCheckMate } from '../helperFunctons/checkFunctions';
import {
  startingPieceLocations,
  setupPlayingBoard,
} from '../helperFunctons/setupStart';
import {
  isCastleMove,
  castleMove,
  updatePieces,
  movePieceOnBoard,
  removeOpponentPiece,
} from './reducerFunctions';

const initialState = {
  board: setupPlayingBoard(),
  enpassant: null,
  check: false,
  blackPieces: startingPieceLocations('black'),
  whitePieces: startingPieceLocations('white'),
  checkMate: false,
};

export function boardReducer(state = initialState, action) {
  const { previous, target } = action;
  let blackPieces = state.blackPieces.slice();
  let whitePieces = state.whitePieces.slice();
  let board = copyBoard(state.board);
  let updatedEnpassant = null;
  let check = state.check;
  let checkMate = state.checkMate;
  let enpassant = state.enpassant;
  switch (action.type) {
    case WHITE_MOVE:
      if (isCastleMove(board, previous, target, 'white')) {
        board = castleMove(board, whitePieces, previous, target);
      } else {
        let piece = board[previous].piece;
        let copyCurrentPiece = Object.assign({}, piece);
        if (copyCurrentPiece.castle) {
          copyCurrentPiece.castle = false;
        }
        if (copyCurrentPiece.name === 'Pawn') {
          copyCurrentPiece = rankUpPawn(copyCurrentPiece, target, board);
          if (target === enpassant - 8) {
            updatePieces(blackPieces, enpassant);
            board[enpassant].piece = null;
          }
          if (Math.abs(previous - target) === 16) {
            updatedEnpassant = target;
          }
        }
        updatePieces(whitePieces, previous, target);
        removeOpponentPiece(blackPieces, target);
        movePieceOnBoard(board, previous, target);
      }
      if (isCheck(whitePieces, board)) {
        check = true;
        if (isCheckMate(whitePieces, board, blackPieces)) {
          checkMate = true;
        }
      }
      return Object.assign({}, state, {
        board: board,
        enpassant: updatedEnpassant,
        whitePieces: whitePieces,
        blackPieces: blackPieces,
        check: check,
        checkMate: checkMate,
      });

    case BLACK_MOVE:
      if (isCastleMove(board, previous, target, 'black')) {
        board = castleMove(board, blackPieces, previous, target);
      } else {
        let piece = board[previous].piece;
        let copyCurrentPiece = Object.assign({}, piece);
        if (copyCurrentPiece.castle) {
          copyCurrentPiece.castle = false;
        }

        if (copyCurrentPiece.name === 'Pawn') {
          if (target === enpassant + 8) {
            updatePieces(whitePieces, enpassant);
            board[enpassant].piece = null;
          }
          copyCurrentPiece = rankUpPawn(copyCurrentPiece, target, board);
          if (Math.abs(previous - target) === 16) {
            updatedEnpassant = target;
          }
        }
        updatePieces(blackPieces, previous, target);
        removeOpponentPiece(whitePieces, target);
        movePieceOnBoard(board, previous, target);
      }
      if (isCheck(blackPieces, board)) {
        check = true;
        if (isCheckMate(blackPieces, board, whitePieces)) {
          checkMate = true;
        }
      }
      return Object.assign({}, state, {
        board: board,
        enpassant: updatedEnpassant,
        whitePieces: whitePieces,
        blackPieces: blackPieces,
        check: check,
        checkMate: checkMate,
      });

    default:
      return state;
  }
}

import {
  setupPlayingBoard,
  startingPieceLocations,
  gameCheck,
  copyBoard,
  isCheckMate
} from "../helperFunctons/copiesBoard";
import { BLACK_MOVE, WHITE_MOVE } from "../actions/actionTypes";
import pawnReachesOtherSideBoard from "../helperFunctons/pawnRankUp";

const initialState = {
  board: setupPlayingBoard(),
  enpassant: null,
  check: false,
  blackPieces: startingPieceLocations("black"),
  whitePieces: startingPieceLocations("white"),
  checkMate: false
};

export function boardReducer(state = initialState, action) {
  const { previous, target } = action;
  let whitePieces;
  let blackPieces;
  let board;
  let piece;
  let enpassant = null;
  let copyPiece;
  let index;
  let check;
  let checkMate;
  switch (action.type) {
    case WHITE_MOVE:
      piece = board[previous].piece;
      enpassant = state.enpassant;
      copyPiece = Object.assign({}, piece);
      whitePieces = state.whitePieces.slice();
      whitePieces.indexOf(previous);
      whitePieces.splice(previous, 1, target);
      blackPieces = state.slice();
      index = blackPieces.indexOf(target);
      if (index !== -1) {
        blackPieces.splice(index, 1);
      }
      if (target === enpassant + 8 && copyPiece.name === "Pawn") {
        index = blackPieces.index(enpassant);
        blackPieces.splice(index, 1);
        copyBoard[enpassant].piece = null;
      }

      board = copyBoard(state.board);
      if (copyPiece.name === "King" || copyPiece.name === "Rook") {
        copyPiece.castle = false;
      }
      if (copyPiece.name === "Pawn") {
        copyPiece = pawnReachesOtherSideBoard(copyPiece, target, board);
        if (Math.abs(previous - target) === 16) {
          enpassant = target;
        }
      }
      board[previous].piece = null;
      board[target].piece = copyPiece;
      if (gameCheck(whitePieces, board)) {
        check = true;
        if (isCheckMate(whitePieces, board, blackPieces)) {
          checkMate = true;
        }
      }
      return Object.assign({}, state, {
        board: board,
        enpassant: enpassant,
        whitePieces: whitePieces,
        blackPieces: blackPieces,
        check: check,
        checkMate: checkMate
      });

    case BLACK_MOVE:
      whitePieces = state.whitePieces.slice();
      index = whitePieces.indexOf(target);
      if (index !== -1) {
        whitePieces.splice(index, 1);
      }
      //enpassant value is where the pawn is. pawn moves determines the spot for the attacking pawn to land for enpassant.
      if (target === enpassant - 8 && copyPiece.name === "Pawn") {
        index = blackPieces.index(enpassant);
        blackPieces.splice(index, 1);
        copyBoard[enpassant].piece = null;
      }

      blackPieces = state.slice();
      blackPieces.indexOf(previous);
      blackPieces.splice(previous, 1, target);
      board = copyBoard(state.board);
      piece = board[previous].piece;
      enpassant = state.enpassant;
      copyPiece = Object.assign({}, piece);
      if (copyPiece.name === "King" || copyPiece.name === "Rook") {
        copyPiece.castle = false;
      }
      if (copyPiece.name === "Pawn") {
        copyPiece = pawnReachesOtherSideBoard(copyPiece, target, board);
        if (Math.abs(previous - target) === 16) {
          enpassant = target;
        }
      }
      board[previous].piece = null;
      board[target].piece = copyPiece;
      if (gameCheck(blackPieces, board)) {
        check = true;
        if (isCheckMate(blackPieces, board, whitePieces)) {
          checkMate = true;
        }
      }
      return Object.assign({}, state, {
        board: board,
        enpassant: enpassant,
        whitePieces: whitePieces,
        blackPieces: blackPieces,
        check: check,
        checkMate: checkMate
      });

    default:
      return state;
  }
}

import { copyBoard } from './copiesBoard';
import { rankUpPawn } from './pawnRankUp';
import { isCheck, isCheckMate } from './checkFunctions';

export function isCastleMove(board, previous, target, color) {
  let shouldBeKing = board[previous];
  let shouldBeRook = board[target];
  if (shouldBeKing === null || shouldBeRook === null) return false;
  if (color === 'white') {
    return (
      shouldBeKing.castle &&
      shouldBeRook.castle &&
      shouldBeRook.color === 'white'
    );
  } else {
    return (
      shouldBeKing.castle &&
      shouldBeRook.castle &&
      shouldBeRook.color === 'black'
    );
  }
}

export function castleMove(board, pieces, previous, target) {
  let isLeft = target % 8 === 0 ? 1 : -1;
  let kingsLanding = target + isLeft;
  let rooksLanding = target + isLeft * 2;
  board[previous].castle = false;
  board[target].castle = false;
  board = movePieceOnBoard(board, previous, kingsLanding);
  board = movePieceOnBoard(board, target, rooksLanding);
  pieces = updatePieces(pieces, previous, kingsLanding);
  pieces = updatePieces(pieces, target, rooksLanding);
  return board;
}

export function updatePieces(pieces, previous, target) {
  let indexPrevious = pieces.indexOf(previous);
  if (target) {
    pieces.splice(indexPrevious, 1, target);
  } else {
    pieces.splice(indexPrevious, 1);
  }
  return pieces;
}

export function movePieceOnBoard(board, previous, target) {
  board[target] = board[previous];
  board[previous] = null;
  return board;
}

export function removeOpponentPiece(pieces, target) {
  let index = pieces.indexOf(target);
  if (index !== -1) {
    pieces.splice(index, 1);
  }
  return pieces;
}

export function runMove(state, action, colorMove) {
  const { previous, target } = action;
  let blackPieces = state.blackPieces.slice();
  let whitePieces = state.whitePieces.slice();
  let board = copyBoard(state.board);
  let updatedEnpassant = null;
  let check = false;
  let checkMate = false;
  let enpassant = state.enpassant;
  let [attacking, defending] =
    colorMove === 'white'
      ? [whitePieces, blackPieces]
      : [blackPieces, whitePieces];

  if (isCastleMove(board, previous, target, 'white')) {
    board = castleMove(board, attacking, previous, target);
  } else {
    let piece = board[previous];
    let copyCurrentPiece = Object.assign({}, piece);
    if (copyCurrentPiece.castle) {
      copyCurrentPiece.castle = false;
    }
    if (copyCurrentPiece.name === 'Pawn') {
      copyCurrentPiece = rankUpPawn(copyCurrentPiece, target, board);
      if (target === enpassant - 8) {
        defending = updatePieces(defending, enpassant);
        board[enpassant] = null;
      }
      if (Math.abs(previous - target) === 16) {
        updatedEnpassant = target;
      }
    }
    attacking = updatePieces(attacking, previous, target);
    defending = removeOpponentPiece(defending, target);
    board = movePieceOnBoard(board, previous, target);
  }
  if (isCheck(attacking, board)) {
    check = true;
    if (isCheckMate(attacking, board, defending)) {
      checkMate = true;
    }
  }
  return {
    board: board,
    enpassant: updatedEnpassant,
    whitePieces: colorMove === 'white' ? attacking : defending,
    blackPieces: colorMove === 'white' ? defending : attacking,
    check: check,
    checkMate: checkMate,
  };
}

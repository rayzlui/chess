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
  return { board: board, pieces: pieces };
}

export function updatePieces(oldPiece, previous, target) {
  let pieces = oldPiece.slice();
  let indexPrevious = pieces.indexOf(previous);
  if (target) {
    pieces.splice(indexPrevious, 1, target);
  } else {
    pieces.splice(indexPrevious, 1);
  }
  return pieces;
}

export function movePieceOnBoard(oldBoard, previous, target) {
  let board = Object.assign({}, oldBoard);
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

export function possibleEnpassant(piece, previous, target) {
  if (piece.name === 'Pawn') {
    if (Math.abs(previous - target) === 16) {
      return target;
    }
  }
  return null;
}

export function wasEnpassantMove(
  previous,
  board,
  target,
  enpassant,
  defending,
) {
  let piece = board[previous];
  if (piece.name === 'Pawn') {
    if (
      piece.color === 'white'
        ? target === enpassant - 8
        : target === enpassant + 8
    ) {
      defending = updatePieces(defending, enpassant);
      board[enpassant] = null;
    }
  }
  return { defending: defending, board: board };
}

export function runMove(state, action) {
  const { previous, target, colorMove } = action;
  let blackPieces = state.blackPieces.slice();
  let whitePieces = state.whitePieces.slice();
  let board = copyBoard(state.board);
  let [attacking, defending] =
    colorMove === 'white'
      ? [whitePieces, blackPieces]
      : [blackPieces, whitePieces];

  if (isCastleMove(board, previous, target, colorMove)) {
    let results = castleMove(board, attacking, previous, target);
    attacking = results.pieces;
    board = results.board;
    let result = {
      board: board,
      check: isCheck(attacking, board),
      checkMate: isCheckMate(attacking, board, defending),
    };
    result[`${colorMove}Pieces`] = attacking;
    return result;
  } else {
    let piece = board[previous];
    let copyCurrentPiece = Object.assign({}, piece);
    if (copyCurrentPiece.castle) {
      copyCurrentPiece.castle = false;
    }
    let checkEnpassant = wasEnpassantMove(
      previous,
      board,
      target,
      state.enpassant,
      defending,
    );
    board = checkEnpassant.board;
    defending = checkEnpassant.defending;
    attacking = updatePieces(attacking, previous, target);
    defending = removeOpponentPiece(defending, target);
    board = movePieceOnBoard(board, previous, target);
    board[target] = rankUpPawn(copyCurrentPiece, target);

    return {
      board: board,
      enpassant: possibleEnpassant(piece, previous, target),
      whitePieces: colorMove === 'white' ? attacking : defending,
      blackPieces: colorMove === 'white' ? defending : attacking,
      check: isCheck(attacking, board),
      checkMate: isCheckMate(attacking, board, defending),
    };
  }
}

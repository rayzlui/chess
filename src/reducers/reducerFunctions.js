export function isCastleMove(board, previous, target, color) {
  let shouldBeKing = board[previous].piece;
  let shouldBeRook = board[target].piece;
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
  board[previous].piece.castle = false;
  board[target].piece.castle = false;
  movePieceOnBoard(board, previous, kingsLanding);
  movePieceOnBoard(board, target, rooksLanding);
  updatePieces(pieces, previous, kingsLanding);
  updatePieces(pieces, target, rooksLanding);
  return board;
}

export function updatePieces(pieces, previous, target) {
  let indexPrevious = pieces.indexOf(previous);
  pieces.splice(indexPrevious, 1, target);
  return pieces;
}

export function movePieceOnBoard(board, previous, target) {
  let pieceLocation = board[previous];
  let targetLocation = board[target];
  targetLocation.piece = pieceLocation.piece;
  pieceLocation.piece = null;
  return board;
}

export function removeOpponentPiece(pieces, target) {
  let index = pieces.indexOf(target);
  if (index !== -1) {
    pieces.splice(index, 1);
  }
  return pieces;
}

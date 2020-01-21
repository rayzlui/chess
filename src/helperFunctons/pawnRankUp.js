import { Queen, Bishop, Rook, Knight } from './pieceCreaters';
export function rankUpPawn(chosenpiece, id) {
  let boardEnd =
    chosenpiece.color === 'white'
      ? [0, 1, 2, 3, 4, 5, 6, 7]
      : [56, 57, 58, 59, 60, 61, 62, 63];
  if (chosenpiece.name === 'Pawn' && boardEnd.includes(id)) {
    //a pawn can never go backwards on to its own back row so no need to check for color.
    return pawnLevelUp(chosenpiece.color);
  }
  return chosenpiece;
}

export function choosePiece() {
  let piecename = prompt(
    'YOUR PAWN HAS BEEN COMPLETED ITS JOURNEY, PLEASE WHAT IT SHALL NOW BECOME',
    'Queen Bishop Knight Rook',
  );

  let piece = piecename.toLowerCase().trim();
  while (!['queen', 'knight', 'rook', 'bishop'].includes(piece)) {
    prompt(
      'YOUR PAWN HAS BEEN COMPLETED ITS JOURNEY, TYPE IN WHICH PIECE YOU WOULD LIKE IT TO BECOME',
      'Queen Bishop Knight Rook',
    );
    piece = piece.toLowerCase().trim();
  }
  return piece;
}

export function pawnLevelUp(color) {
  let piece = choosePiece();
  switch (piece) {
    case 'queen':
      return new Queen(color);
    case 'bishop':
      return new Bishop(color);
    case 'rook':
      return new Rook(color);
    default:
      return new Knight(color);
  }
}

import { copyBoard } from "./copiesBoard";

//these are dispatches.

export function movePieceOnBoard(currentBoard, previous, target) {
  let board = copyBoard(currentBoard);
  let piece = board[previous].piece;
  board[previous].piece = null;
  board[target].piece = piece;
  return board;
}

export function updatePieceIndex(allColorPieces, previous, target) {
  let allPieces = allColorPieces.slice();
  let index = allPieces.indexOf(previous);
  allPieces.splice(index, 1, target);
  return allPieces;
}
 
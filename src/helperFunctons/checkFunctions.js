import { movePieceOnBoard } from './moveFunctions';
import { getMoves } from './pieceMoves';
import { copyBoard } from './copiesBoard';

export function isCheck(allColorPieces, gameboard) {
  //this needs to know board AND pieces to check if there is check.
  let board = copyBoard(gameboard);
  for (let i = 0; i < allColorPieces.length; i++) {
    let piece = allColorPieces[i];
    let allMoves = getMoves(piece, board);
    for (let j = 0; j < allMoves.length; j++) {
      let move = allMoves[j];
      if (board[move].piece) {
        const notMyPiece = !allColorPieces.includes(move);
        if (board[move].piece.name === 'King' && notMyPiece) {
          return true;
        }
      }
    }
  }
  return false;
}

export function isCheckMate(attackingPieces, board, defendingPieces) {
  //checkmate goes through every piece of the player being checked, gets every move for each piece and
  //checks each move and sees if it still results in a check with that move. remember check function is the aggressors pieces.

  let piecesLocations = defendingPieces.slice();
  for (let i = 0; i < piecesLocations.length; i++) {
    let indexOfPiece = piecesLocations[i];
    let rival = attackingPieces.slice();

    let moves = getMoves(indexOfPiece, board);
    for (let j = 0; j < moves.length; j++) {
      let move = moves[j];
      let causesCheck = willMoveCauseCheck(board, indexOfPiece, move, rival);

      if (!causesCheck) {
        return false;
      }
    }
  }
  return true;
}

export function willMoveCauseCheck(board, previous, target, rival) {
  //this function checks if your move causes the mover to be checked, aka your bishop is blocking your king from being checked and you want to move that bishop.
  let copyboard = copyBoard(board);
  let opponentPieces = rival.slice();

  let moveOnBoard = movePieceOnBoard(copyboard, previous, target);
  let opponentAtTarget = opponentPieces.indexOf(target);
  if (opponentAtTarget !== -1) {
    opponentPieces.splice(opponentAtTarget, 1);
  }
  //we just need the board to check
  return isCheck(opponentPieces, moveOnBoard);
}

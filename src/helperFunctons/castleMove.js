import { copyBoard } from "./copiesBoard";

//these are dispatches.
function castleMove() {
  if (canCastling(chosenpiece, board, id)) {
    var leftright = id % 8 === 0 ? -1 : 1;
    //ONLY KING WILL HAVE CASTLING OPTION.
    let rook = board[id].piece;
    let king = board[pieceid].piece;
    removePieceFromGrid(board, pieceid);
    removePieceFromGrid(board, id);
    let kingspot = pieceid + leftright * 2;
    let rookspot = pieceid + leftright;
    placePieceOnBoard(board, kingspot, king);
    placePieceOnBoard(board, rookspot, rook);
    //this will dispatch two white/black moves.
    removePiece(ownpieces, pieceid);
    removePiece(ownpieces, id);
    addPiece(ownpieces, pieceid + leftright * 2);
    addPiece(ownpieces, pieceid + leftright);
  }
}

function canCastling(piece, board, id) {
  //we'll send two dispatches to complete castling, one to move king from a to b and one to move rook from c to d
  return (
    piece.name === "King" &&
    piece.castle === true &&
    board[id].piece &&
    board[id].piece.name === "Rook" &&
    board[id].piece.castle === true &&
    board[id].piece.color === piece.color
  );
}

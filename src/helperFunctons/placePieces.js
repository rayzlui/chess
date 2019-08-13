import { King, Queen, Rook, Knight, Bishop, Pawn } from "./pieceCreaters";

function setPawn(color, board) {
  let row = color === "white" ? 48 : 8;
  return board.map((grid, index) => {
    if (index >= row && index < row + 8) {
      let piece = new Pawn(color);
      grid.piece = piece;
      return grid;
    } else {
      return grid;
    }
  });
}

function setRook(color, board) {
  return setHigherLevel(color, Rook, [0, 7], board);
}

function setKnight(color, board) {
  return setHigherLevel(color, Knight, [1, 6], board);
}

function setBishop(color, board) {
  return setHigherLevel(color, Bishop, [2, 5], board);
}

function setQueen(color, board) {
  var spot = color === "white" ? [3] : [4];
  return setHigherLevel(color, Queen, spot, board);
}

function setKing(color, board) {
  var spot = color === "white" ? [4] : [3];
  return setHigherLevel(color, King, spot, board);
}

function setHigherLevel(color, type, spot, board) {
  const LAST_ROW = 56;
  const TOP_ROW = 0;
  var row = color === "white" ? LAST_ROW : TOP_ROW;
  var spots = spot.map(rowIndex => rowIndex + row);
  return board.map((grid, index) => {
    if (spots.includes(index)) {
      let piece = new type(color);
      grid.piece = piece;
      return grid;
    } else {
      return grid;
    }
  });
}

export { setKing, setQueen, setBishop, setRook, setPawn, setKnight };

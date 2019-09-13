import {
  setKing,
  setQueen,
  setBishop,
  setRook,
  setPawn,
  setKnight,
} from './placePieces';

export function makeBoard() {
  //we could just make this an object that has keys 0 - 63 and our 'moves' can just be Board[spot] = piece and Board[oldSpot] = null
  const board = {};
  for (var i = 0; i < 64; i++) {
    board[i] = null;
  }
  return board;
}

export function setupPlayingBoard() {
  const board = makeBoard();
  let placeWhite = placePieces('white', board);
  let placeBlack = placePieces('black', placeWhite);

  return placeBlack;
}

export function startingPieceLocations(color) {
  let locations = [];
  for (let i = 0; i < 16; i++) {
    if (color === 'black') {
      locations.push(i);
    } else {
      locations.push(i + 48);
    }
  }
  return locations;
}

export function placePieces(color, board) {
  let placePawns = setPawn(color, board);
  let placeRooks = setRook(color, placePawns);
  let placeBishops = setBishop(color, placeRooks);
  let placeKnights = setKnight(color, placeBishops);
  let placeQueen = setQueen(color, placeKnights);
  let placeKing = setKing(color, placeQueen);
  return placeKing;
}

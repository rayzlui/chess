import {
  isCastleMove,
  castleMove,
  updatePieces,
  movePieceOnBoard,
  removeOpponentPiece,
  possibleEnpassant,
  wasEnpassantMove,
} from './reducerFunctions';
import { setupPlayingBoard, startingPieceLocations } from './setupStart';
import { King, Pawn } from './pieceCreaters';

describe('isCastleMove', () => {
  describe('return true', () => {
    const mockBoard = setupPlayingBoard();
    const previous = 3;
    const target = 0;
    const color = 'white';
    const isCastle = isCastleMove(mockBoard, previous, target, color);
    expect(isCastle).toBe(true);
  });
  describe('return true', () => {
    const mockBoard = setupPlayingBoard();
    const previous = 3;
    const target = 7;
    const color = 'white';
    const isCastle = isCastleMove(mockBoard, previous, target, color);
    expect(isCastle).toBe(true);
  });
  describe('return true', () => {
    const mockBoard = setupPlayingBoard();
    const previous = 59;
    const target = 63;
    const color = 'white';
    const isCastle = isCastleMove(mockBoard, previous, target, color);
    expect(isCastle).toBe(true);
  });
  describe('return true', () => {
    const mockBoard = setupPlayingBoard();
    const previous = 59;
    const target = 56;
    const color = 'white';
    const isCastle = isCastleMove(mockBoard, previous, target, color);
    expect(isCastle).toBe(true);
  });
  describe('return false', () => {
    const mockBoard = setupPlayingBoard();
    const previous = 59;
    const target = 54;
    const color = 'white';
    const isCastle = isCastleMove(mockBoard, previous, target, color);
    expect(isCastle).toBe(false);
  });
  describe('return false', () => {
    const mockBoard = setupPlayingBoard();
    const previous = 8;
    const target = 0;
    const color = 'white';
    const isCastle = isCastleMove(mockBoard, previous, target, color);
    expect(isCastle).toBe(false);
  });
});

describe('castleMove', () => {
  describe('it should return object', () => {
    const mockBoard = setupPlayingBoard();
    const mockPieces = startingPieceLocations('black');
    const previous = 3;
    const target = 7;
    mockBoard[4] = null;
    mockBoard[5] = null;
    mockBoard[6] = null;
    mockPieces.splice(4, 3);
    const castled = castleMove(mockBoard, mockPieces, previous, target);
    expect(castled.board[3]).toEqual(null);
    expect(castled.board[7]).toEqual(null);
    expect(castled.board[5]).toEqual(mockBoard[7]);
    expect(castled.board[6]).toEqual(mockBoard[3]);
    expect(mockPieces).toEqual([0, 1, 2, 4, 5]);
    let ignore = { 3: true, 5: true, 6: true, 7: true };
    for (let i = 0; i < 63; i++) {
      if (!ignore[i]) {
        expect(castled.board[i]).toEqual(mockBoard[i]);
      }
    }
  });
  describe('it should return object', () => {
    const mockBoard = setupPlayingBoard();
    const mockPieces = startingPieceLocations('black');
    const previous = 3;
    const target = 0;
    mockBoard[1] = null;
    mockBoard[2] = null;
    mockPieces.splice(1, 2);
    const castled = castleMove(mockBoard, mockPieces, previous, target);
    expect(castled.board[3]).toEqual(null);
    expect(castled.board[0]).toEqual(null);
    expect(castled.board[1]).toEqual(mockBoard[3]);
    expect(castled.board[2]).toEqual(mockBoard[0]);
    expect(mockPieces).toEqual([1, 2, 5, 6, 7]);
    let ignore = { 0: true, 1: true, 2: true, 3: true };
    for (let i = 0; i < 63; i++) {
      if (!ignore[i]) {
        expect(castled.board[i]).toEqual(mockBoard[i]);
      }
    }
  });
  describe('it should return object', () => {
    const mockBoard = setupPlayingBoard();
    const mockPieces = startingPieceLocations('white');
    const previous = 60;
    const target = 56;
    mockBoard[57] = null;
    mockBoard[58] = null;
    mockBoard[59] = null;
    mockPieces.splice(57, 3);
    const castled = castleMove(mockBoard, mockPieces, previous, target);
    expect(castled.board[60]).toEqual(null);
    expect(castled.board[56]).toEqual(null);
    expect(castled.board[57]).toEqual(mockBoard[60]);
    expect(castled.board[58]).toEqual(mockBoard[56]);
    expect(mockPieces).toEqual([57, 58, 61, 62, 63]);
    let ignore = { 56: true, 57: true, 58: true, 60: true };
    for (let i = 0; i < 63; i++) {
      if (!ignore[i]) {
        expect(castled.board[i]).toEqual(mockBoard[i]);
      }
    }
  });

  describe('it should return object', () => {
    const mockBoard = setupPlayingBoard();
    const mockPieces = startingPieceLocations('white');
    const previous = 60;
    const target = 63;
    mockBoard[61] = null;
    mockBoard[62] = null;
    mockPieces.splice(61, 2);
    const castled = castleMove(mockBoard, mockPieces, previous, target);
    expect(castled.board[60]).toEqual(null);
    expect(castled.board[63]).toEqual(null);
    expect(castled.board[62]).toEqual(mockBoard[60]);
    expect(castled.board[61]).toEqual(mockBoard[56]);
    expect(mockPieces).toEqual([56, 57, 58, 59, 61, 62]);
    let ignore = { 60: true, 61: true, 62: true, 63: true };
    for (let i = 0; i < 63; i++) {
      if (!ignore[i]) {
        expect(castled.board[i]).toEqual(mockBoard[i]);
      }
    }
  });
});

describe('updatePieces', () => {
  describe('it should return array', () => {
    const mockPieces = [1, 2, 3, 4, 5];
    const mockPrevious = 4;
    const mockTarget = 44;
    const updated = updatePieces(mockPieces, mockPrevious, mockTarget);
    expect(updated).toEqual([1, 2, 3, 44, 5]);
  });
});

describe('movePieceOnBoard', () => {
  describe('it should return object', () => {
    const mockBoard = setupPlayingBoard();
    const mockPrevious = 14;
    const mockTarget = 22;
    const moved = movePieceOnBoard(mockBoard, mockPrevious, mockTarget);
    let ignore = { 22: true, 14: true };
    expect(moved[22]).toEqual(mockBoard[14]);
    expect(mockBoard[14]).toEqual(null);
    for (let i = 0; i < 63; i++) {
      if (!ignore[i]) {
        expect(moved[i]).toEqual(mockBoard[i]);
      }
    }
  });

  describe('it should return object', () => {
    const mockBoard = setupPlayingBoard();
    const mockPrevious = 54;
    const mockTarget = 22;
    const moved = movePieceOnBoard(mockBoard, mockPrevious, mockTarget);
    let ignore = { 22: true, 54: true };
    expect(moved[22]).toEqual(mockBoard[54]);
    expect(mockBoard[54]).toEqual(null);
    for (let i = 0; i < 63; i++) {
      if (!ignore[i]) {
        expect(moved[i]).toEqual(mockBoard[i]);
      }
    }
  });
});

describe('removeOpponentPiece', () => {
  describe('it should return array', () => {
    const mockPieces = [2, 4, 6, 8];
    const removed = removeOpponentPiece(mockPieces, 4);
    expect(removed).toEqual([2, 6, 8]);
  });

  describe('it should return array', () => {
    const mockPieces = [2, 4, 6, 8];
    const removed = removeOpponentPiece(mockPieces, 7);
    expect(removed).toEqual([2, 4, 6, 8]);
  });
});

describe('possibleEnpassant', () => {
  it('should return null', () => {
    const mockPiece = new King('white');
    const mockPrevious = 14;
    const mockTarget = 15;
    const enpassant = possibleEnpassant(mockPiece, mockPrevious, mockTarget);
    expect(enpassant).toEqual(null);
  });
  it('should return null', () => {
    const mockPiece = new Pawn('white');
    const mockPrevious = 44;
    const mockTarget = 36;
    const enpassant = possibleEnpassant(mockPiece, mockPrevious, mockTarget);
    expect(enpassant).toEqual(null);
  });
  it('should return null', () => {
    const mockPiece = new Pawn('black');
    const mockPrevious = 44;
    const mockTarget = 35;
    const enpassant = possibleEnpassant(mockPiece, mockPrevious, mockTarget);
    expect(enpassant).toEqual(null);
  });
  it('should return number', () => {
    const mockPiece = new Pawn('white');
    const mockPrevious = 14;
    const mockTarget = 30;
    const enpassant = possibleEnpassant(mockPiece, mockPrevious, mockTarget);
    expect(enpassant).toEqual(30);
  });
});

describe('wasEnpassantMove', () => {
  it('should return obj', () => {
    const mockBoard = setupPlayingBoard();
    mockBoard[24] = mockBoard[8];
    mockBoard[23] = mockBoard[48];
    mockBoard[48] = null;
    mockBoard[8] = null;
    const mockEnpassant = 24;
    const mockTarget = 16;
    const mockPiece = mockBoard[23];
    const mockDefending = startingPieceLocations('black');
    mockDefending[8] = 24;
    const enpassantMove = wasEnpassantMove(
      mockPiece,
      mockBoard,
      mockTarget,
      mockEnpassant,
      mockDefending,
    );
    expect(enpassantMove.defending).toEqual([
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      8,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
    ]);
    const expectedBoard = Object.assign({}, mockBoard);
    expectedBoard[24] = null;
    expect(enpassantMove.board).toEqual(expectedBoard);
  });

  it('should return obj', () => {
    const mockBoard = setupPlayingBoard();
    const mockEnpassant = null;
    const mockTarget = 16;
    const mockPiece = mockBoard[23];
    const mockDefending = startingPieceLocations('black');
    const enpassantMove = wasEnpassantMove(
      mockPiece,
      mockBoard,
      mockTarget,
      mockEnpassant,
      mockDefending,
    );
    expect(enpassantMove.defending).toEqual(mockDefending);
    expect(enpassantMove.board).toEqual(mockBoard);
  });
  it('should return obj', () => {
    const mockBoard = setupPlayingBoard();
    const mockEnpassant = 44;
    const mockTarget = 16;
    const mockPiece = mockBoard[23];
    const mockDefending = startingPieceLocations('black');
    const enpassantMove = wasEnpassantMove(
      mockPiece,
      mockBoard,
      mockTarget,
      mockEnpassant,
      mockDefending,
    );
    expect(enpassantMove.defending).toEqual(mockDefending);
    expect(enpassantMove.board).toEqual(mockBoard);
  });
});

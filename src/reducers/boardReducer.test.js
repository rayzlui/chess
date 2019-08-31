import { boardReducer } from './boardReducer';
import {
  setupPlayingBoard,
  startingPieceLocations,
} from '../helperFunctons/setupStart';
import { BLACK_MOVE, WHITE_MOVE } from '../actions/actionTypes';

describe('boardReducer', () => {
  it('should return object', () => {
    const wrapper = boardReducer();
    const {
      board,
      enpassant,
      check,
      blackPieces,
      whitePieces,
      checkMate,
    } = wrapper;
    expect(enpassant).toEqual(null);
    expect(check).toEqual(false);
    expect(checkMate).toEqual(false);
    expect(blackPieces).toHaveLength(16);
    expect(blackPieces).toEqual([
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      0,
    ]);
    expect(whitePieces).toHaveLength(16);
    expect(whitePieces).toEqual([
      63,
      62,
      61,
      60,
      59,
      58,
      57,
      56,
      55,
      54,
      53,
      52,
      51,
      50,
      49,
      48,
      47,
    ]);
    expect(board).toHaveLength(64);
    board.forEach(grid => {
      expect(grid.piece).toEqual(null);
    });
  });
  describe('WHITE_MOVE', () => {
    let initialBoard = setupPlayingBoard();
    initialBoard[40] = initialBoard[48].piece;
    initialBoard[48] = null;
    let initialWhitePieces = startingPieceLocations('white');
    let initialBlackPieces = startingPieceLocations('black');
    initialBlackPieces.splice(initialBlackPieces.indexOf(48), 1, 40);
    const previousState = {
      check: false,
      checkMate: false,
      enpassant: 6,
      whitePieces: initialWhitePieces,
      blackPieces: initialBlackPieces,
      board: initialBoard,
    };
    let action = { type: WHITE_MOVE, previous: 1, target: 8 };
    const wrapper = boardReducer(previousState, action);
    const {
      check,
      checkMate,
      enpassant,
      whitePieces,
      blackPieces,
      board,
    } = wrapper;
    expect(check).toEqual(false);
    expect(checkMate).toEqual(false);
    expect(enpassant).toEqual(null);
    expect(blackPieces).toEqual(blackPieces);
    expect(whitePieces).toEqual(
      initialWhitePieces.splice(initialWhitePieces.indexOf(1), 1, 8),
    );
    expect(board[8].piece.name).toEqual(initialBoard[1].piece.name);
    expect(board[1].piece).toEqual(null);
  });
  describe('BLACK_MOVE', () => {
    let initialBoard = setupPlayingBoard();
    initialBoard[23] = initialBoard[2].piece;
    initialBoard[2] = null;
    let initialWhitePieces = startingPieceLocations('white');
    let initialBlackPieces = startingPieceLocations('black');
    initialWhitePieces.splice(initialWhitePieces.indexOf(2), 1, 23);
    const previousState = {
      check: false,
      checkMate: false,
      enpassant: 6,
      whitePieces: initialWhitePieces,
      blackPieces: initialBlackPieces,
      board: initialBoard,
    };
    let action = { type: BLACK_MOVE, previous: 52, target: 44 };
    const wrapper = boardReducer(previousState, action);
    const {
      check,
      checkMate,
      enpassant,
      whitePieces,
      blackPieces,
      board,
    } = wrapper;
    expect(check).toEqual(false);
    expect(checkMate).toEqual(false);
    expect(enpassant).toEqual(null);
    expect(whitePieces).toEqual(initialWhitePieces);
    expect(blackPieces).toEqual(
      initialBlackPieces.splice(initialBlackPieces.indexOf(52), 1, 44),
    );
    expect(board[44].piece.name).toEqual(initialBoard[52].piece.name);
    expect(board[52].piece).toEqual(null);
  });
});

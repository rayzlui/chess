import { boardReducer } from './boardReducer';

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
      expect(grid).toBeSimilar({ piece: null });
    });
  });
});

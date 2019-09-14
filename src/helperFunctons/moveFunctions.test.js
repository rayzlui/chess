import { setupPlayingBoard } from './setupStart';
import { movePieceOnBoard, updatePieceIndex } from './moveFunctions';

describe('movePieceOnBoard', () => {
  const mockBoard = setupPlayingBoard();
  describe('move 4, 30', () => {
    it('should work', () => {
      const movedBoard = movePieceOnBoard(mockBoard, 4, 30);
      expect(movedBoard).not.toEqual(mockBoard);
      expect(movedBoard[4]).toEqual(null);
      expect(Object.values(movedBoard[30])).toEqual(Object.value(mockBoard[4]));
    });
  });

  describe('move 50, 41', () => {
    it('should work', () => {
      const movedBoard = movePieceOnBoard(mockBoard, 50, 41);
      expect(movedBoard).not.toEqual(mockBoard);
      expect(movedBoard[50]).toEqual(null);
      expect(Object.values(movedBoard[41])).toEqual(
        Object.value(mockBoard[50]),
      );
    });
  });
});

describe('updatePieceIndex', () => {
  const pieces = [4, 6, 5, 7, 8, 9, 0];
  it('should return new array', () => {
    const updated = updatePieceIndex(pieces, 4, 11);
    const expected = pieces.splice(0, 1, 11);
    expect(updated).not.toEqual(pieces);
    updated.forEach((point, index) => {
      expect(point).toEqual(expected[index]);
    });
  });
});

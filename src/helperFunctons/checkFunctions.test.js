import {
  setupPlayingBoard,
  startingPieceLocations,
  makeBoard,
} from './setupStart';
import { isCheck, isCheckMate, willMoveCauseCheck } from './checkFunctions';
import { Rook, King, Pawn, Queen, Bishop } from './pieceCreaters';

describe('isCheck', () => {
  describe('initial', () => {
    it('should return false', () => {
      const mockWhitePieces = startingPieceLocations('white');
      const mockBlackPieces = startingPieceLocations('black');
      const mockGameBoard = setupPlayingBoard();
      const whiteCheck = isCheck(mockBlackPieces, mockGameBoard);
      const blackCheck = isCheck(mockWhitePieces, mockGameBoard);
      expect(whiteCheck).toEqual(false);
      expect(blackCheck).toEqual(false);
    });
  });

  describe('no king danger', () => {
    it('should return false', () => {
      const mockWhitePieces = [3, 11, 15, 19, 20, 38];
      const mockBlackPieces = [30, 45, 69, 39];
      const mockGameBoard = makeBoard();
      mockGameBoard[3] = Rook('white');
      mockGameBoard[11] = King('white');
      mockGameBoard[15] = Pawn('white');
      mockGameBoard[19] = Pawn('white');
      mockGameBoard[20] = Pawn('white');
      mockGameBoard[38] = Pawn('white');
      mockGameBoard[39] = King('black');
      mockGameBoard[45] = Pawn('black');
      mockGameBoard[69] = Pawn('black');
      mockGameBoard[30] = Pawn('black');
      const whiteCheck = isCheck(mockBlackPieces, mockGameBoard);
      const blackCheck = isCheck(mockWhitePieces, mockGameBoard);
      const whiteCheckMate = isCheckMate(
        mockWhitePieces,
        mockGameBoard,
        mockBlackPieces,
      );
      const blackCheckMate = isCheckMate(
        mockBlackPieces,
        mockGameBoard,
        mockWhitePieces,
      );
      expect(whiteCheckMate).toEqual(false);
      expect(blackCheckMate).toEqual(false);
      expect(whiteCheck).toEqual(false);
      expect(blackCheck).toEqual(false);
    });
  });

  describe('black king danger, no block', () => {
    it('should return true', () => {
      const mockWhitePieces = [7, 11, 15, 19, 20, 38];
      const mockBlackPieces = [30, 45, 69, 39];
      const mockGameBoard = makeBoard();
      mockGameBoard[7] = Rook('white');
      mockGameBoard[11] = King('white');
      mockGameBoard[15] = Pawn('white');
      mockGameBoard[19] = Pawn('white');
      mockGameBoard[20] = Pawn('white');
      mockGameBoard[38] = Pawn('white');
      mockGameBoard[39] = King('black');
      mockGameBoard[45] = Pawn('black');
      mockGameBoard[69] = Pawn('black');
      mockGameBoard[30] = Pawn('black');
      const whiteCheck = isCheck(mockBlackPieces, mockGameBoard);
      const blackCheck = isCheck(mockWhitePieces, mockGameBoard);
      const whiteCheckMate = isCheckMate(
        mockWhitePieces,
        mockGameBoard,
        mockBlackPieces,
      );
      const blackCheckMate = isCheckMate(
        mockBlackPieces,
        mockGameBoard,
        mockWhitePieces,
      );
      expect(whiteCheckMate).toEqual(false);
      expect(blackCheckMate).toEqual(false);
      expect(whiteCheck).toEqual(false);
      expect(blackCheck).toEqual(true);
    });
  });

  describe('black king danger, blocked', () => {
    it('should return false', () => {
      const mockWhitePieces = [7, 11, 15, 19, 20, 38];
      const mockBlackPieces = [30, 31, 69, 39];
      const mockGameBoard = makeBoard();
      mockGameBoard[7] = Rook('white');
      mockGameBoard[11] = King('white');
      mockGameBoard[15] = Pawn('white');
      mockGameBoard[19] = Pawn('white');
      mockGameBoard[20] = Pawn('white');
      mockGameBoard[38] = Pawn('white');
      mockGameBoard[39] = King('black');
      mockGameBoard[31] = Pawn('black');
      mockGameBoard[69] = Pawn('black');
      mockGameBoard[30] = Pawn('black');
      const whiteCheck = isCheck(mockBlackPieces, mockGameBoard);
      const blackCheck = isCheck(mockWhitePieces, mockGameBoard);
      const whiteCheckMate = isCheckMate(
        mockWhitePieces,
        mockGameBoard,
        mockBlackPieces,
      );
      const blackCheckMate = isCheckMate(
        mockBlackPieces,
        mockGameBoard,
        mockWhitePieces,
      );
      expect(whiteCheckMate).toEqual(false);
      expect(blackCheckMate).toEqual(false);
      expect(whiteCheck).toEqual(false);
      expect(blackCheck).toEqual(false);
    });
  });

  describe('white king danger, no block', () => {
    it('should return true', () => {
      const mockWhitePieces = [7, 11, 15, 18, 20, 38];
      const mockBlackPieces = [30, 43, 69, 39];
      const mockGameBoard = makeBoard();
      mockGameBoard[7] = Rook('white');
      mockGameBoard[11] = King('white');
      mockGameBoard[15] = Pawn('white');
      mockGameBoard[18] = Pawn('white');
      mockGameBoard[20] = Pawn('white');
      mockGameBoard[38] = Pawn('white');
      mockGameBoard[39] = King('black');
      mockGameBoard[43] = Queen('black');
      mockGameBoard[69] = Pawn('black');
      mockGameBoard[30] = Pawn('black');
      const whiteCheck = isCheck(mockBlackPieces, mockGameBoard);
      const blackCheck = isCheck(mockWhitePieces, mockGameBoard);
      const whiteCheckMate = isCheckMate(
        mockWhitePieces,
        mockGameBoard,
        mockBlackPieces,
      );
      const blackCheckMate = isCheckMate(
        mockBlackPieces,
        mockGameBoard,
        mockWhitePieces,
      );
      expect(whiteCheckMate).toEqual(false);
      expect(blackCheckMate).toEqual(false);
      expect(whiteCheck).toEqual(true);
      expect(blackCheck).toEqual(false);
    });
  });

  describe('white king danger, no block', () => {
    it('should return true', () => {
      const mockWhitePieces = [17, 11, 15, 19, 20, 38];
      const mockBlackPieces = [30, 43, 69, 39];
      const mockGameBoard = makeBoard();
      mockGameBoard[17] = Pawn('white');
      mockGameBoard[11] = King('white');
      mockGameBoard[15] = Pawn('white');
      mockGameBoard[19] = Pawn('white');
      mockGameBoard[20] = Pawn('white');
      mockGameBoard[38] = Pawn('white');
      mockGameBoard[39] = King('black');
      mockGameBoard[43] = Queen('black');
      mockGameBoard[69] = Pawn('black');
      mockGameBoard[30] = Pawn('black');
      const whiteCheck = isCheck(mockBlackPieces, mockGameBoard);
      const blackCheck = isCheck(mockWhitePieces, mockGameBoard);
      const whiteCheckMate = isCheckMate(
        mockWhitePieces,
        mockGameBoard,
        mockBlackPieces,
      );
      const blackCheckMate = isCheckMate(
        mockBlackPieces,
        mockGameBoard,
        mockWhitePieces,
      );
      expect(whiteCheckMate).toEqual(false);
      expect(blackCheckMate).toEqual(false);
      expect(whiteCheck).toEqual(false);
      expect(blackCheck).toEqual(false);
    });
  });
});

describe('isCheckMate', () => {
  describe('initial', () => {
    it('should return false', () => {
      const mockWhitePieces = startingPieceLocations('white');
      const mockBlackPieces = startingPieceLocations('black');
      const mockGameBoard = makeBoard();
      const whiteCheckMate = isCheckMate(
        mockWhitePieces,
        mockGameBoard,
        mockBlackPieces,
      );
      const blackCheckMate = isCheckMate(
        mockBlackPieces,
        mockGameBoard,
        mockWhitePieces,
      );
      expect(whiteCheckMate).toEqual(false);
      expect(blackCheckMate).toEqual(false);
    });
  });

  describe('black checkmate', () => {
    it('should return true', () => {
      const mockWhitePieces = [47, 11, 15, 51, 20, 63];
      const mockBlackPieces = [61];
      const mockGameBoard = makeBoard();
      mockGameBoard[47] = Bishop('white');
      mockGameBoard[11] = King('white');
      mockGameBoard[15] = Queen('white');
      mockGameBoard[51] = Rook('white');
      mockGameBoard[20] = Bishop('white');
      mockGameBoard[63] = Rook('white');
      mockGameBoard[61] = King('black');
      const blackCheck = isCheck(mockWhitePieces, mockGameBoard);
      const blackCheckMate = isCheckMate(
        mockBlackPieces,
        mockGameBoard,
        mockWhitePieces,
      );
      expect(blackCheck).toEqual(true);
      expect(blackCheckMate).toEqual(true);
    });
  });

  describe('white checkmate', () => {
    it('should return true', () => {
      const mockWhitePieces = [5];
      const mockBlackPieces = [14, 53, 11, 0];
      const mockGameBoard = makeBoard();
      mockGameBoard[11] = Bishop('black');
      mockGameBoard[53] = King('black');
      mockGameBoard[0] = Queen('black');
      mockGameBoard[14] = Rook('black');
      mockGameBoard[5] = King('white');
      const whiteCheck = isCheck(mockBlackPieces, mockGameBoard);
      const whiteCheckMate = isCheckMate(
        mockWhitePieces,
        mockGameBoard,
        mockBlackPieces,
      );
      expect(whiteCheck).toEqual(true);
      expect(whiteCheckMate).toEqual(true);
    });
  });
});

describe('willMoveCauseCheck', () => {
  describe('first move black', () => {
    it('should return false', () => {
      const mockGameBoard = makeBoard();
      const mockBlackPieces = startingPieceLocations('black');
      const move = willMoveCauseCheck(mockGameBoard, 50, 32, mockBlackPieces);
      expect(move).toEqual(false);
    });
  });
  describe('first move white', () => {
    it('should return false', () => {
      const mockGameBoard = makeBoard();
      const mockWhitePieces = startingPieceLocations('white');
      const move = willMoveCauseCheck(mockGameBoard, 13, 29, mockWhitePieces);
      expect(move).toEqual(false);
    });
  });

  describe('bad move', () => {
    it('should return true', () => {
      const mockBlackPieces = [14, 53, 11, 0];
      const mockGameBoard = makeBoard();
      mockGameBoard[11] = Pawn('black');
      mockGameBoard[53] = King('black');
      mockGameBoard[0] = Queen('black');
      mockGameBoard[14] = Rook('black');
      mockGameBoard[5] = King('white');
      const move = willMoveCauseCheck(mockGameBoard, 5, 6, mockBlackPieces);
      expect(move).toBe(true);
    });
  });

  describe('bad move', () => {
    it('should return true', () => {
      const mockWhitePieces = [3, 12, 15, 13, 20, 38];
      const mockGameBoard = makeBoard();
      mockGameBoard[3] = Rook('white');
      mockGameBoard[12] = King('white');
      mockGameBoard[15] = Pawn('white');
      mockGameBoard[13] = Pawn('white');
      mockGameBoard[20] = Pawn('white');
      mockGameBoard[38] = Pawn('white');
      mockGameBoard[34] = King('black');
      mockGameBoard[45] = Pawn('black');
      mockGameBoard[69] = Pawn('black');
      mockGameBoard[30] = Pawn('black');
      const move = willMoveCauseCheck(mockGameBoard, 34, 35, mockWhitePieces);
      expect(move).toBe(true);
    });
  });
});

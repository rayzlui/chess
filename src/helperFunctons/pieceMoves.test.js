import { setupPlayingBoard } from './setupStart';
import {
  pawnMove,
  kingMove,
  queenMove,
  rookMove,
  bishopMove,
  knightMove,
} from './pieceMoves';

describe('pawnMove', () => {
  describe('first move', () => {
    it('should return an array', () => {
      const mockCurrentLocation = 55;
      const mockBoard = setupPlayingBoard();
      const color = 'white';
      const enpassant = null;
      const moves = pawnMove(mockCurrentLocation, mockBoard, color, enpassant);
      expect(moves).toEqual([47, 39]);
    });
  });

  describe('first move', () => {
    it('should return an array', () => {
      const mockCurrentLocation = 11;
      const mockBoard = setupPlayingBoard();
      const color = 'black';
      const enpassant = null;
      const moves = pawnMove(mockCurrentLocation, mockBoard, color, enpassant);
      expect(moves).toEqual([19, 27]);
    });
  });

  describe('enpassant and normal', () => {
    it('should return an array', () => {
      const mockCurrentLocation = 32;
      const mockBoard = setupPlayingBoard();
      mockBoard[31] = mockBoard[15];
      mockBoard[15] = null;
      mockBoard[32] = mockBoard[52];
      mockBoard[52] = null;
      const color = 'white';
      const enpassant = 31;
      const moves = pawnMove(mockCurrentLocation, mockBoard, color, enpassant);
      expect(moves).toEqual([23, 24]);
    });
  });

  describe('enpassant and normal', () => {
    it('should return an array', () => {
      const mockCurrentLocation = 35;
      const mockBoard = setupPlayingBoard();
      mockBoard[35] = mockBoard[15];
      mockBoard[15] = null;
      mockBoard[36] = mockBoard[52];
      mockBoard[52] = null;
      const color = 'black';
      const enpassant = 36;
      const moves = pawnMove(mockCurrentLocation, mockBoard, color, enpassant);
      expect(moves).toEqual([27, 28]);
    });
  });

  describe('can attack, no normal', () => {
    it('should return an array', () => {
      const mockCurrentLocation = 24;
      const mockBoard = setupPlayingBoard();
      mockBoard[16] = mockBoard[8];
      mockBoard[8] = null;
      mockBoard[15] = mockBoard[7];
      mockBoard[7] = null;
      mockBoard[24] = mockBoard[52];
      mockBoard[52] = null;
      const color = 'white';
      const enpassant = null;
      const moves = pawnMove(mockCurrentLocation, mockBoard, color, enpassant);
      expect(moves).toEqual([15]);
    });
  });

  describe('has no move', () => {
    it('should return an array', () => {
      const mockCurrentLocation = 24;
      const mockBoard = setupPlayingBoard();
      mockBoard[15] = mockBoard[61];
      mockBoard[16] = mockBoard[15];
      mockBoard[61] = null;
      mockBoard[24] = mockBoard[52];
      mockBoard[52] = null;
      const color = 'white';
      const enpassant = null;
      const moves = pawnMove(mockCurrentLocation, mockBoard, color, enpassant);
      expect(moves).toEqual([]);
    });
  });

  describe('has normal move', () => {
    it('should return an array', () => {
      const mockCurrentLocation = 44;
      const mockBoard = setupPlayingBoard();
      mockBoard[44] = mockBoard[52];
      mockBoard[52] = null;
      const color = 'white';
      const enpassant = null;
      const moves = pawnMove(mockCurrentLocation, mockBoard, color, enpassant);
      expect(moves).toEqual([36]);
    });
  });

  describe('can attack, has normal move', () => {
    it('should return an array', () => {
      const mockCurrentLocation = 44;
      const mockBoard = setupPlayingBoard();
      mockBoard[44] = mockBoard[52];
      mockBoard[52] = null;
      mockBoard[35] = mockBoard[13];
      mockBoard[13] = null;
      const color = 'white';
      const enpassant = null;
      const moves = pawnMove(mockCurrentLocation, mockBoard, color, enpassant);
      expect(moves).toEqual([35, 36]);
    });
  });

  describe('can attack two, has normal move', () => {
    it('should return an array', () => {
      const mockCurrentLocation = 44;
      const mockBoard = setupPlayingBoard();
      mockBoard[44] = mockBoard[52];
      mockBoard[52] = null;
      mockBoard[35] = mockBoard[13];
      mockBoard[13] = null;
      mockBoard[37] = mockBoard[15];
      mockBoard[15] = null;
      const color = 'white';
      const enpassant = null;
      const moves = pawnMove(mockCurrentLocation, mockBoard, color, enpassant);
      expect(moves).toEqual([35, 36, 37]);
    });
  });

  describe('can attack two, no normal move', () => {
    it('should return an array', () => {
      const mockCurrentLocation = 44;
      const mockBoard = setupPlayingBoard();
      mockBoard[44] = mockBoard[52];
      mockBoard[52] = null;
      mockBoard[35] = mockBoard[13];
      mockBoard[13] = null;
      mockBoard[37] = mockBoard[15];
      mockBoard[15] = null;
      mockBoard[36] = mockBoard[16];
      mockBoard[16] = null;
      const color = 'white';
      const enpassant = null;
      const moves = pawnMove(mockCurrentLocation, mockBoard, color, enpassant);
      expect(moves).toEqual([35, 37]);
    });
  });
});

describe('KingMove', () => {
  describe('castling', () => {
    it('should not work', () => {
      const mockBoard = setupPlayingBoard();
      const mockCurrentLocation = 59;
      mockBoard[59] = mockBoard[60];
      mockBoard[59].castle = false;
      mockBoard[60] = null;
      const moves = kingMove(mockCurrentLocation, mockBoard, false);
      expect(moves).toEqual([60]);
    });
    it('should not work', () => {
      const mockBoard = setupPlayingBoard();
      const mockCurrentLocation = 60;
      mockBoard[59] = null;
      mockBoard[58] = null;
      mockBoard[57] = null;
      const moves = kingMove(mockCurrentLocation, mockBoard, true);
      expect(moves).toEqual([59]);
    });
    it('should work', () => {
      const mockBoard = setupPlayingBoard();
      const mockCurrentLocation = 60;
      mockBoard[59] = null;
      mockBoard[58] = null;
      mockBoard[57] = null;
      const moves = kingMove(mockCurrentLocation, mockBoard, false);
      expect(moves).toEqual([59, 56]);
    });
    it('should work', () => {
      const mockBoard = setupPlayingBoard();
      const mockCurrentLocation = 60;
      mockBoard[61] = null;
      mockBoard[62] = null;
      const moves = kingMove(mockCurrentLocation, mockBoard, false);
      expect(moves).toEqual([61, 63]);
    });
    it('should work', () => {
      const mockBoard = setupPlayingBoard();
      const mockCurrentLocation = 3;
      mockBoard[4] = null;
      mockBoard[5] = null;
      mockBoard[6] = null;
      const moves = kingMove(mockCurrentLocation, mockBoard, false);
      expect(moves).toEqual([4, 7]);
    });
    it('should work', () => {
      const mockBoard = setupPlayingBoard();
      const mockCurrentLocation = 3;
      mockBoard[2] = null;
      mockBoard[1] = null;
      const moves = kingMove(mockCurrentLocation, mockBoard, false);
      expect(moves).toEqual([2, 0]);
    });
  });

  describe('no moves', () => {
    const mockBoard = setupPlayingBoard();
    const mockCurrentLocation = 3;
    const moves = kingMove(mockCurrentLocation, mockBoard, false);
    expect(moves).toEqual([]);
  });

  describe('attack move', () => {
    const mockBoard = setupPlayingBoard();
    const mockCurrentLocation = 3;
    mockBoard[4] = mockBoard[57];
    mockBoard[11] = mockBoard[63];
    mockBoard[63] = null;
    mockBoard[57] = null;
    mockBoard[2] = null;
    mockBoard[10] = null;
    mockBoard[12] = mockBoard[47];
    const moves = kingMove(mockCurrentLocation, mockBoard, true);
    expect(moves).toEqual([4, 11, 2, 10, 12]);
  });

  describe('full moves', () => {
    const mockBoard = setupPlayingBoard();
    const mockCurrentLocation = 33;
    mockBoard[33] = mockBoard[3];
    mockBoard[3] = null;
    const moves = kingMove(mockCurrentLocation, mockBoard, false);
    expect(moves).toEqual([25, 24, 26, 32, 34, 41, 42, 40]);
  });
});

describe('queenMove', () => {
  describe('no moves', () => {
    const mockBoard = setupPlayingBoard();
    const mockCurrentLocation = 4;
    const moves = queenMove(mockCurrentLocation, mockBoard, false);
    expect(moves).toEqual([]);
  });

  describe('full moves and attacks', () => {
    const mockBoard = setupPlayingBoard();
    const mockCurrentLocation = 33;
    mockBoard[33] = mockBoard[4];
    mockBoard[4] = null;
    const moves = kingMove(mockCurrentLocation, mockBoard, false);
    expect(moves).toEqual([
      17,
      25,
      24,
      26,
      19,
      11,
      32,
      34,
      35,
      36,
      37,
      38,
      39,
      41,
      42,
      40,
      49,
    ]);
  });
  describe('full moves and attacks', () => {
    const mockBoard = setupPlayingBoard();
    const mockCurrentLocation = 33;
    mockBoard[33] = mockBoard[4];
    mockBoard[4] = null;
    mockBoard[35] = mockBoard[49];
    const moves = kingMove(mockCurrentLocation, mockBoard, false);
    expect(moves).toEqual([17, 25, 24, 26, 19, 11, 32, 34, 35, 41, 42, 40, 49]);
  });
});

describe('rookMove', () => {
  describe('no moves', () => {
    const mockBoard = setupPlayingBoard();
    const mockCurrentLocation = 0;
    const moves = rookMove(mockCurrentLocation, mockBoard);
    expect(moves).toEqual([]);
  });

  describe('some moves', () => {
    const mockBoard = setupPlayingBoard();
    const mockCurrentLocation = 0;
    mockBoard[8] = null;
    const moves = rookMove(mockCurrentLocation, mockBoard);
    expect(moves).toEqual([8, 16, 24, 32, 40, 48, 56]);
  });

  describe('some moves', () => {
    const mockBoard = setupPlayingBoard();
    const mockCurrentLocation = 16;
    mockBoard[16] = mockBoard[0];
    mockBoard[0] = null;
    const moves = rookMove(mockCurrentLocation, mockBoard);
    expect(moves).toEqual([24, 32, 40, 48, 56, 17, 18, 19, 20, 21, 22, 23]);
  });

  describe('some moves', () => {
    const mockBoard = setupPlayingBoard();
    const mockCurrentLocation = 20;
    mockBoard[16] = mockBoard[0];
    mockBoard[0] = null;
    const moves = rookMove(mockCurrentLocation, mockBoard);
    expect(moves).toEqual([28, 36, 44, 52, 16, 17, 18, 19, 21, 22, 23]);
  });
});

describe('bishopMove', () => {
  describe('no moves', () => {
    const mockBoard = setupPlayingBoard();
    const mockCurrentLocation = 61;
    const moves = bishopMove(mockCurrentLocation, mockBoard);
    expect(moves).toEqual([]);
  });

  describe('some moves', () => {
    const mockBoard = setupPlayingBoard();
    const mockCurrentLocation = 61;
    mockBoard[52] = null;
    const moves = bishopMove(mockCurrentLocation, mockBoard);
    expect(moves).toEqual([52, 43, 34, 25]);
  });

  describe('some moves', () => {
    const mockBoard = setupPlayingBoard();
    const mockCurrentLocation = 43;
    mockBoard[61] = null;
    const moves = bishopMove(mockCurrentLocation, mockBoard);
    expect(moves).toEqual([36, 29, 22, 15, 34, 25, 16, 50, 52]);
  });

  describe('some moves', () => {
    const mockBoard = setupPlayingBoard();
    const mockCurrentLocation = 43;
    mockBoard[61] = null;
    mockBoard[29] = mockBoard[1];
    mockBoard[1] = null;
    mockBoard[34] = mockBoard[60];
    mockBoard[60] = null;
    const moves = bishopMove(mockCurrentLocation, mockBoard);
    expect(moves).toEqual([36, 29, 25, 50, 52]);
  });
});

describe('knightMove', () => {
  describe('initial', () => {
    const mockCurrentLocation = 1;
    const mockBoard = setupPlayingBoard();
    const moves = knightMove(mockCurrentLocation, mockBoard);
    expect(moves).toEqual([16, 18]);
  });

  it('should return array', () => {
    const mockCurrentLocation = 33;
    const mockBoard = setupPlayingBoard();
    mockBoard[33] = mockBoard[1];
    mockBoard[1] = null;
    const moves = knightMove(mockCurrentLocation, mockBoard);
    expect(moves).toEqual([16, 18, 27, 43, 48, 50]);
  });

  it('should return array', () => {
    const mockCurrentLocation = 33;
    const mockBoard = setupPlayingBoard();
    mockBoard[33] = mockBoard[1];
    mockBoard[1] = null;
    mockBoard[27] = mockBoard[0];
    mockBoard[0] = null;
    mockBoard[43] = mockBoard[7];
    mockBoard[7] = null;
    const moves = knightMove(mockCurrentLocation, mockBoard);
    expect(moves).toEqual([16, 18, 48, 50]);
  });

  it('should return array', () => {
    const mockCurrentLocation = 35;
    const mockBoard = setupPlayingBoard();
    mockBoard[35] = mockBoard[1];
    mockBoard[1] = null;
    const moves = knightMove(mockCurrentLocation, mockBoard);
    expect(moves).toEqual([18, 20, 25, 29, 41, 45, 50, 52]);
  });
});

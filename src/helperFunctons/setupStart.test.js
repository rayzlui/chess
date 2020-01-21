import {
  makeBoard,
  setupPlayingBoard,
  startingPieceLocations,
} from './setupStart';

describe('makeBoard', () => {
  it('should work', () => {
    const board = makeBoard();
    expect(Object.keys(board)).toHaveLength(64);
  });
});

describe('setupPlayingBoard', () => {
  it('should return board', () => {
    const playingBoard = setupPlayingBoard();
    for (let i = 0; i < 64; i++) {
      expect(playingBoard[i]).toBeTruthy();
      if ([0, 7, 63, 56].includes(i)) {
        expect(playingBoard[i].name).toEqual('Rook');
        if (i < 8) {
          expect(playingBoard[i].color).toEqual('black');
        } else {
          expect(playingBoard[i].color).toEqual('white');
        }
      }
      if ([1, 6, 62, 57].includes(i)) {
        expect(playingBoard[i].name).toEqual('Knight');
        if (i < 8) {
          expect(playingBoard[i].color).toEqual('black');
        } else {
          expect(playingBoard[i].color).toEqual('white');
        }
      }
      if ([2, 5, 61, 58].includes(i)) {
        expect(playingBoard[i].name).toEqual('Bishop');
        if (i < 8) {
          expect(playingBoard[i].color).toEqual('black');
        } else {
          expect(playingBoard[i].color).toEqual('white');
        }
      }
      if ([4, 59].includes(i)) {
        expect(playingBoard[i].name).toEqual('Queen');
        if (i < 8) {
          expect(playingBoard[i].color).toEqual('black');
        } else {
          expect(playingBoard[i].color).toEqual('white');
        }
      }
      if ([3, 60].includes(i)) {
        expect(playingBoard[i].name).toEqual('King');
        if (i < 8) {
          expect(playingBoard[i].color).toEqual('black');
        } else {
          expect(playingBoard[i].color).toEqual('white');
        }
      }
      if ((i > 7 && i <= 15) || (i <= 55 && i > 47)) {
        expect(playingBoard[i].name).toEqual('Pawn');
        if (i < 16) {
          expect(playingBoard[i].color).toEqual('black');
        } else {
          expect(playingBoard[i].color).toEqual('white');
        }
      }
    }
  });
});

describe('startingPieceLocation', () => {
  it('should return array', () => {
    const blackStart = startingPieceLocations('black');
    for (let i = 0; i < 16; i++) {
      expect(blackStart[i]).toEqual(i + 48);
    }
  });
  it('should return array', () => {
    const whiteStart = startingPieceLocations('white');
    for (let i = 0; i < 16; i++) {
      expect(whiteStart[i]).toEqual(i);
    }
  });
});

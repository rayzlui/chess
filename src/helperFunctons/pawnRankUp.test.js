import { Rook, Pawn } from './pieceCreaters';
import { rankUpPawn, pawnLevelUp, choosePiece } from './pawnRankUp';

describe('rankUpPawn', () => {
  describe('not pawn', () => {
    const rook = Rook('white');
    const notPawn = rankUpPawn(rook, 40);
    expect(notPawn).toEqual(notPawn);
  });

  describe('pawn, not end', () => {
    const pawn = Pawn('white');
    const stillPawn = rankUpPawn(pawn, 33);
    expect(pawn).toEqual(stillPawn);
  });

  describe('pawn, at end', () => {
    window.prompt = () => {
      return 'rook';
    };
    const pawn = Pawn('white');
    const noLongerPawn = rankUpPawn(pawn, 4);
    expect(pawnLevelUp).toHaveBeenCalled();
    expect(noLongerPawn.name).toEqual('Rook');
  });

  describe('pawn, at end', () => {
    window.prompt = () => {
      return 'queen';
    };
    const pawn = Pawn('black');
    const noLongerPawn = rankUpPawn(pawn, 62);
    expect(pawnLevelUp).toHaveBeenCalled();
    expect(noLongerPawn.name).toEqual('Queen');
  });
});

describe('choosePiece', () => {
  let counter = 0;
  window.prompt = () => {
    if (counter === 4) {
      return 'rook';
    }
    counter++;
  };
  describe('should return after 4 times', () => {
    const piece = choosePiece();
    expect(piece).toEqual('rook');
    expect(counter).toEqual(4);

    describe('PawnLevelUp', () => {
      const newPiece = pawnLevelUp('white')
      expect(newPiece.name).toEqual('Rook')
      expect(newPiece.color).toEqual('white')
    });
  });
});

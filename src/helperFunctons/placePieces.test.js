import {
  setPawn,
  setRook,
  setKnight,
  setBishop,
  setQueen,
  setKing,
} from './placePieces';

describe('setPawn', () => {
  it('should set pawn', () => {
    const mockBoard = {};
    const pawnSet = setPawn('white', mockBoard);
    expect(mockBoard).toEqual(pawnSet);
    for (let i = 0; i < 8; i++) {
      expect(mockBoard[i + 48].name).toEqual('Pawn');
    }
  });

  it('should set pawn', () => {
    const mockBoard = {};
    const pawnSet = setPawn('black', mockBoard);
    expect(mockBoard).toEqual(pawnSet);
    for (let i = 0; i < 8; i++) {
      expect(mockBoard[i + 8].name).toEqual('Pawn');
    }
  });
});

describe('setRook', () => {
  it('should set rook', () => {
    let mockBoard = {};
    const black = setRook(mockBoard, 'black');
    expect(black[0].name).toEqual('Rook');
    expect(black[7].name).toEqual('Rook');
  });
  it('should set rook', () => {
    let mockBoard = {};
    const white = setRook(mockBoard, 'white');
    expect(white[56].name).toEqual('Rook');
    expect(white[63].name).toEqual('Rook');
  });
});

describe('setKnight', () => {
  it('should set knight', () => {
    let mockBoard = {};
    const black = setKnight(mockBoard, 'black');
    expect(black[1].name).toEqual('Knight');
    expect(black[6].name).toEqual('Knight');
  });
  it('should set knight', () => {
    let mockBoard = {};
    const white = setKnight(mockBoard, 'white');
    expect(white[57].name).toEqual('Knight');
    expect(white[62].name).toEqual('Knight');
  });
});

describe('setBishop', () => {
  it('should set bishop', () => {
    let mockBoard = {};
    const black = setBishop(mockBoard, 'black');
    expect(black[2].name).toEqual('Bishop');
    expect(black[5].name).toEqual('Bishop');
  });
  it('should set bishop', () => {
    let mockBoard = {};
    const white = setBishop(mockBoard, 'white');
    expect(white[58].name).toEqual('Bishop');
    expect(white[61].name).toEqual('Bishop');
  });
});

describe('setQueen', () => {
  it('should set queen', () => {
    let mockBoard = {};
    const black = setQueen(mockBoard, 'black');
    expect(black[4].name).toEqual('Queen');
  });
  it('should set bishop', () => {
    let mockBoard = {};
    const white = setBishop(mockBoard, 'white');
    expect(white[59].name).toEqual('Queen');
  });
});

describe('setKing', () => {
  it('should set king', () => {
    let mockBoard = {};
    const black = setKing(mockBoard, 'black');
    expect(black[3].name).toEqual('King');
  });
  it('should set bishop', () => {
    let mockBoard = {};
    const white = setKing(mockBoard, 'white');
    expect(white[60].name).toEqual('King');
  });
});

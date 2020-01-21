import { Pawn, King, Queen, Rook, Bishop, Knight } from './pieceCreaters';

describe('Pawn', () => {
  it('should work', () => {
    const pawn = Pawn('white');
    expect(pawn.name).toEqual('Pawn');
    expect(pawn.color).toEqual('white');
    expect(pawn.image).toEqual('whitepawn');
  });
});

describe('King', () => {
  it('should work', () => {
    const king = King('white');
    expect(king.name).toEqual('King');
    expect(king.color).toEqual('white');
    expect(king.image).toEqual('whitekin');
    expect(king.castle).toEqual('true');
  });
});

describe('Queen', () => {
  it('should work', () => {
    const queen = Queen('black');
    expect(queen.name).toEqual('Queen');
    expect(queen.color).toEqual('black');
    expect(queen.image).toEqual('whiteque');
  });
});

describe('Rook', () => {
  it('should work', () => {
    const rook = Rook('black');
    expect(rook.name).toEqual('Rook');
    expect(rook.color).toEqual('black');
    expect(rook.image).toEqual('blackroo');
    expect(rook.castle).toEqual(true);
  });
});

describe('Bishop', () => {
  it('should work', () => {
    const bishop = Bishop('white');
    expect(bishop.name).toEqual('Bishop');
    expect(bishop.color).toEqual('white');
    expect(bishop.image).toEqual('whitebis');
  });
});

describe('Knight', () => {
  it('should work', () => {
    const knight = Knight('black');
    expect(knight.name).toEqual('Knight');
    expect(knight.color).toEqual('black');
    expect(knight.image).toEqual('blackknight');
  });
});

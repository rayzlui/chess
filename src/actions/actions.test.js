import { moveWhite, moveBlack } from './actions';
import { WHITE_MOVE, BLACK_MOVE } from './actionTypes';

describe('WHITE_MOVE', () => {
  it('should return object', () => {
    const whiteMove = moveWhite(4, 5);
    expect(whiteMove).toEqual({ type: WHITE_MOVE, previous: 4, target: 5 });
  });
});

describe('BLACK_MOVE', () => {
  it('should return object', () => {
    const blackMove = moveBlack(10, 12);
    expect(blackMove).toEqual({ type: BLACK_MOVE, previous: 10, target: 12 });
  });
});

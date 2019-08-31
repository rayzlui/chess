import { turnReducer } from './turnReducer';
import { WHITE_MOVE, BLACK_MOVE } from '../actions/actionTypes';

describe('turnReducer', () => {
  it('should return white', () => {
    const initialReducer = turnReducer();
    expect(initialReducer).toEqual('white');
  });

  it('should return white', () => {
    let action = { type: WHITE_MOVE };
    const whiteAction = turnReducer('black', action);
    expect(whiteAction).toEqual('white');
  });
  
  it('should return black', () => {
    let action = { type: BLACK_MOVE };
    const blackAction = turnReducer('white', action);
    expect(blackAction).toEqual('black');
  });
});

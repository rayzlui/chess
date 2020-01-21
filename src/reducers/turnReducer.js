import { WHITE_MOVE, BLACK_MOVE } from '../actions/actionTypes';

export function turnReducer(state = 'white', action) {
  switch (action.type) {
    case WHITE_MOVE:
      return 'black';
    case BLACK_MOVE:
      return 'white';
    default:
      return state;
  }
}

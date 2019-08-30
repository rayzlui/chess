import { BLACK_MOVE, WHITE_MOVE } from '../actions/actionTypes';
import {
  startingPieceLocations,
  setupPlayingBoard,
} from '../helperFunctons/setupStart';
import { runMove } from './reducerFunctions';

const initialState = {
  board: setupPlayingBoard(),
  enpassant: null,
  check: false,
  blackPieces: startingPieceLocations('black'),
  whitePieces: startingPieceLocations('white'),
  checkMate: false,
};

export function boardReducer(state = initialState, action) {
  let stateUpdates;
  switch (action.type) {
    case WHITE_MOVE:
      stateUpdates = runMove(state, action, 'white');
      return Object.assign({}, state, stateUpdates);

    case BLACK_MOVE:
      stateUpdates = runMove(state, action, 'black');
      return Object.assign({}, state, stateUpdates);

    default:
      return state;
  }
}

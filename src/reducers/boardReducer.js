import { MOVE } from '../actions/actionTypes';
import {
  startingPieceLocations,
  setupPlayingBoard,
} from '../helperFunctons/setupStart';
import { runMove } from '../helperFunctons/reducerFunctions';

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
    case MOVE:
      stateUpdates = runMove(state, action);
      return Object.assign({}, state, stateUpdates);

    default:
      return state;
  }
}

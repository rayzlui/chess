import { startingPieceLocations } from "../board";
import { WHITE_MOVE, BLACK_MOVE } from "../actions/actionTypes";

export function whitePieceReducer(
  state = startingPieceLocations("white"),
  actions
) {
  const { target, previous } = actions;
  let pieces;
  switch (actions.type) {
    case WHITE_MOVE:
      //this should remove the old number and add the new one.
      pieces = state.slice();
      pieces.indexOf(previous);
      pieces.splice(previous, 1, target);
      return pieces;
    case BLACK_MOVE:
      //this should check if the target is within the array, if it is remove it.
      pieces = state.slice();
      let index = pieces.indexOf(target);
      if (index !== -1) {
        pieces.splice(index, 1);
      }
      return pieces;

    default:
      return state;
  }
}

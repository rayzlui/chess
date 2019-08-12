import { startingPieceLocations } from "../board";
import { BLACK_MOVE, WHITE_MOVE } from "../actions/actionTypes";

export function blackPieceReducer(
  state = startingPieceLocations("black"),
  actions
) {
  const { target, previous } = actions;
  let pieces;
  switch (actions.type) {
    case BLACK_MOVE:
      //this should remove the old number and add the new one.
      pieces = state.slice();
      pieces.indexOf(previous);
      pieces.splice(previous, 1, target);
      return pieces;
    case WHITE_MOVE:
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

import { CHECKMATE } from "../actions/actionTypes";

export function gameOverReducer(state = false, action){
  switch(action.type){
    case CHECKMATE:
      return true
    default:
      return state
  }
}
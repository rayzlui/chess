import { combineReducers } from "redux";
import { boardReducer } from "./boardReducer";
import { turnReducer } from "./turnReducer"

export const rootReducer = combineReducers({
  board: boardReducer,
  turn: turnReducer,
});

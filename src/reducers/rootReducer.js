import { combineReducers } from "redux";
import { boardReducer } from "./boardReducer";
import { whitePieceReducer } from "./whitePieceReducer";
import { blackPieceReducer } from "./blackPieceReducer";
import { checkReducer } from "./checkReducer";
import { enpassantReducer } from "./enpassantReducer";
import { turnReducer } from "./turnReducer";
import { gameOverReducer } from "./gameoverReducer";

export const rootReducer = combineReducers({
  board: boardReducer,
  whitePieces: whitePieceReducer,
  blackPieces: blackPieceReducer,
  check: checkReducer,
  enpassant: enpassantReducer,
  turn: turnReducer,
  gameOver: gameOverReducer
});

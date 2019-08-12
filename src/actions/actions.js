import { CHECKMATE, WHITE_MOVE, BLACK_MOVE } from "./actionTypes";

export function checkMate() {
  return { type: CHECKMATE };
}

export function moveWhite(previous, target) {
  return { type: WHITE_MOVE, previous: previous, target: target };
}

export function moveBlack(previous, target) {
  return { type: BLACK_MOVE, previous: previous, target: target };
}

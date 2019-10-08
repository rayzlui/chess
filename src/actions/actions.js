import { MOVE, WHITE_MOVE, BLACK_MOVE } from './actionTypes';

export function movePiece(previous, target, color) {
  return { type: MOVE, previous: previous, target: target, colorMove: color };
}

export function moveWhite() {
  return { type: WHITE_MOVE };
}

export function moveBlack() {
  return { type: BLACK_MOVE };
}

export function copyBoard(board) {
  return board.map(grid => Object.assign({}, grid));
}

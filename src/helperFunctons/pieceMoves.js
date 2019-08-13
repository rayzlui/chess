function whitePawn(currentLocation, board, enpassant) {
  let startingLocations = [];
  for (let i = 48; i <= 55; i++) {
    startingLocations.push(i);
  }
  return pawnMove({
    board: board,
    color: "white",
    currentLocation: currentLocation,
    direction: -1,
    startingLocations: startingLocations,
    enpassant: enpassant
  });
}
function blackPawn(currentLocation, board, enpassant) {
  let startingLocations = [];
  for (let i = 8; i <= 15; i++) {
    startingLocations.push(i);
  }
  return pawnMove({
    board: board,
    color: "black",
    currentLocation: currentLocation,
    direction: 1,
    startingLocations: startingLocations,
    enpassant: enpassant
  });
}

function pawnMove(options) {
  //for en passant if pawn is on the 4th row from bottom or top aka 32 - 39 and 40 - 48 and opponent piece jumps two forward.
  const {
    currentLocation,
    board,
    color,
    direction,
    startingLocations,
    enpassant
  } = options;
  //first move, attackable options, en passe, normal move
  let moves = [];
  //basic move
  let basicMoveForward = currentLocation + direction * 8;
  if (basicMoveForward > 63 || basicMoveForward < 0) {
    //if it's an end of board we return it. however, this should already have been ranked up.
    return moves;
  }
  if (board[basicMoveForward].piece === null) {
    moves.push(basicMoveForward);
    if (
      //first move from starting location allows two moves.
      startingLocations.includes(currentLocation) &&
      board[basicMoveForward + 8 * direction].piece === null
    ) {
      moves.push(basicMoveForward + 8 * direction);
    }
  }
  let leftedge = [0, 8, 16, 24, 32, 40, 48, 56];
  let rightedge = leftedge.map(x => x + 7);
  if (
    //if there's a piece adjacent forward that can be taken
    board[basicMoveForward - 1].piece &&
    board[basicMoveForward - 1].piece.color !== color &&
    !leftedge.includes(basicMoveForward)
  ) {
    moves.push(basicMoveForward - 1);
  }

  if (
    //if there's a piece adjacent forward that can be taken

    board[basicMoveForward + 1].piece &&
    board[basicMoveForward + 1].piece.color !== color &&
    !rightedge.includes(basicMoveForward)
  ) {
    moves.push(basicMoveForward + 1);
  }

  //en passant
  if (enpassant) {
    let move = direction * 8;
    if (enpassant === currentLocation + 1) {
      moves.push(enpassant + move);
    }
    if (enpassant === currentLocation - 1) {
      moves.push(enpassant + move);
    }
  }

  return moves;
}

function kingMove(currentLocation, board, check) {
  let moves = rookMove(currentLocation, board, true, check).concat(
    bishopMove(currentLocation, board, 2)
  );
  return moves;
}

function queenMove(currentLocation, board) {
  let move = bishopMove(currentLocation, board).concat(
    rookMove(currentLocation, board)
  );
  return move;
}

function rookMove(currentLocation, board, king = false, check = false) {
  let direction1 = straightMoves(
    board,
    currentLocation,
    king,
    check,
    currentLocation % 8,
    -1
  );
  let direction2 = straightMoves(
    board,
    currentLocation,
    king,
    check,
    7 - (currentLocation % 8),
    1
  );
  let direction3 = straightMoves(
    board,
    currentLocation,
    king,
    check,
    Math.floor(currentLocation / 8),
    -8
  );
  let direction4 = straightMoves(
    board,
    currentLocation,
    king,
    check,
    Math.floor((63 - currentLocation) / 8),
    8
  );

  return direction1.concat(direction2.concat(direction3.concat(direction4)));
}

function straightMoves(board, currentLocation, king, check, limit, direction) {
  var moves = [];
  for (let i = 1; i <= limit; i++) {
    let move = currentLocation + direction * i;

    if (!(king && i > 1)) {
      if (board[move].piece === null) {
        moves.push(move);
      } else {
        if (board[move].piece.color !== board[currentLocation].piece.color) {
          moves.push(move);
        }

        return moves;
      }
    }
    if (
      king &&
      check === false &&
      board[currentLocation].piece.castle === true
    ) {
      //if current piece is king and its not castled nor in check
      if (board[move].piece) {
        //in the loop, if there is a piece here
        if (
          board[move].piece.name === "Rook" &&
          board[move].piece.castle === true
        ) {
          //and that piece is a rook and it is not castled.
          moves.push(move);
          return moves;
        } else {
          //however if there is a piece and it's not the rook, we stop.
          return moves;
        }
      }
    }
  }
  return moves;
}

function bishopMove(currentLocation, board, dist = 10) {
  //moves: until limit or piece, essentially its [[-1,-1],[1,-1],[-1,1],[1,1]] until it reaches an edge or piece

  let direction1 = diagonalMoves(dist, currentLocation, -1, -1, board);
  let direction2 = diagonalMoves(dist, currentLocation, 1, -1, board);
  let direction3 = diagonalMoves(dist, currentLocation, 1, 1, board);
  let direction4 = diagonalMoves(dist, currentLocation, -1, 1, board);

  return direction1.concat(direction2.concat(direction3.concat(direction4)));
}
function rowlimits(currentLocation) {
  return [
    currentLocation - (currentLocation % 8),
    currentLocation - (currentLocation % 8) + 7
  ];
}

function diagonalMoves(dist, currentLocation, x, y, board) {
  let moves = [];
  for (var i = 1; i < dist; i++) {
    let moveupdown = currentLocation + x * i * 8;
    if (moveupdown < 64 && moveupdown >= 0) {
      let moveleftrigght = moveupdown + y * i;
      let rowlimit = rowlimits(moveupdown);
      if (moveleftrigght >= rowlimit[0] && moveleftrigght <= rowlimit[1]) {
        if (board[moveleftrigght].piece === null) {
          moves.push(moveleftrigght);
        } else {
          if (board[moveleftrigght].piece.color !== board[currentLocation].piece.color) {
            moves.push(moveleftrigght);
          }
          break;
        }
      } else {
        break;
      }
    } else {
      break;
    }
  }
  return moves;
}

function knightMove(currentLocation, board) {
  //move: 3, limit or piece on it. all combos of +-1,+-2
  let moves = [];
  let movements = [
    [1, 2],
    [-1, 2],
    [1, -2],
    [-1, -2],
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1]
  ];
  let leftrightlimits = rowlimits(currentLocation);
  movements.forEach(arr => {
    let leftrightmove = currentLocation + arr[0];
    //need to go left/right and see if it goes over limit at the row and then need to go up/down and see if it goes over imit at that column
    //aka id = 6 so left/right = [0,7], so anything with arr[1] = +2 fails. and up/down = [6, 62] so anything with arr[0] = -1/-2 fails
    if (
      leftrightmove >= leftrightlimits[0] &&
      leftrightmove <= leftrightlimits[1]
    ) {
      let updownmove = leftrightmove + 8 * arr[1];
      if (updownmove >= 0 && updownmove <= 63) {
        if (
          board[updownmove].piece === null ||
          board[updownmove].piece.color !== board[currentLocation].piece.color
        ) {
          moves.push(updownmove);
        }
      }
    }
  });

  return moves;
}

export function getMoves(currentLocation, board, enpassant, check) {
  //use a switch for name of piece to get possible moves. use color to determine if paths are blocked/can't land there.
  //we can have 4 different arrays that hold the "paths" for piece, each array iterates where the absolute value is further from the grid id.
  let chosenpiece = board[currentLocation].piece;
 
  switch (chosenpiece.name) {
    case "Queen":
      return queenMove(currentLocation, board);

    case "Bishop":
      return bishopMove(currentLocation, board);

    case "Rook":
      return rookMove(currentLocation, board);

    case "Knight":
      return knightMove(currentLocation, board);

    case "King":
      return kingMove(currentLocation, board, check);

    default:
      return chosenpiece.color === "white"
        ? whitePawn(currentLocation, board, enpassant)
        : blackPawn(currentLocation, board, enpassant);
  }
};

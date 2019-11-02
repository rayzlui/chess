function whitePawn(gridid, board, enpassant){
    let start = []
    for (let i = 48; i <= 55; i++){
        start.push(i)
    }
    return pawnMove({board:board, color: "white", grid: gridid, direction: -1, start: start, enpassant: enpassant})
}
function blackPawn(gridid, board, enpassant){
    let start = []
    for (let i = 8; i <= 15; i++){
        start.push(i)
    }
    return pawnMove({board:board, color: "black", grid: gridid,direction: 1, start:start, enpassant: enpassant})
}


function pawnMove(options){
    
    //for en passant if pawn is on the 4th row from bottom or top aka 32 - 39 and 40 - 48 and opponent piece jumps two forward.
    let grid = options.grid
    let board = options.board
    let color = options.color
    let direction = options.direction
    //first move, attackable options, en passe, normal move
    let moves = []
    //basic move
    let basic = grid + direction * 8
    if (basic > 63 || basic < 0){
        return moves
    }
    if (board[basic].piece === null){
        moves.push(basic)
        //first move
        if(options.start.includes(grid) &&board[basic+(8*direction)].piece === null ){
            moves.push(basic+(8*direction))
        }
    }
    let leftedge = [0,8,16,24,32,40,48,56]
    let rightedge = leftedge.map(x=>x+7)
    if ((board[basic-1].piece && board[basic-1].piece.color !== color && !leftedge.includes(basic)) ){
        moves.push(basic-1)
    }

    if ((board[basic+1].piece && board[basic+1].piece.color !== color && !rightedge.includes(basic))){
        moves.push(basic+1)
    }

    
    //en passant
    if (options.enpassant){
        let move = direction * 8
        if (options.enpassant === grid + 1){
            moves.push(grid + 1 + move)
        } 
        if (options.enpassant === grid - 1){
            moves.push(grid - 1 + move)
        }

    }
    
    return moves
}


function kingMove(id, board, check){
    
   let moves = rookMove(id,board, true, check).concat(bishopMove(id,board,2))
   return moves 

}

function queenMove(id, board){

    let move = bishopMove(id, board).concat(rookMove(id, board))
    return move

}


function rookMove(id, board, king = false, check = false){
    
    
    let direction1 = straightMoves(board, id, king, check, id%8, -1)
    let direction2 = straightMoves(board, id, king, check, 7 - (id%8), 1)
    let direction3 = straightMoves(board, id, king, check, Math.floor(id/8), -8)
    let direction4 = straightMoves(board, id, king, check, Math.floor((63-id)/8), 8)

    return direction1.concat(direction2.concat(direction3.concat(direction4)))
}


function straightMoves(board, id, king, check, limit, direction){
    
    var moves = []
    for (let i = 1; i <= limit; i++){
        let move = id + (direction * i)

        if (!(king && i > 1)){
            if (board[move].piece === null){
                moves.push(move)
            }else{
                if(board[move].piece.color !== board[id].piece.color){
                    moves.push(move)
                
                }
            
            break;
            }
        }
        if (king){
            if(board[id].piece.castle === true && check === false){
                
                if (board[move].piece && check === false){
                    if(board[move].piece.name === "Rook" && board[move].piece.castle === true){
                        moves.push(move)
                    }else{
                        break
                    }
                }

            }else{
                break
            }
        }
    }
    return moves
} 



function bishopMove(id, board, dist = 10){
    //moves: until limit or piece, essentially its [[-1,-1],[1,-1],[-1,1],[1,1]] until it reaches an edge or piece
    
    let direction1 = diagonalMoves(dist, id, -1, -1, board)
    let direction2 = diagonalMoves(dist, id, 1, -1, board)
    let direction3 = diagonalMoves(dist, id, 1, 1, board)
    let direction4 = diagonalMoves(dist, id, -1, 1, board)
    
    return direction1.concat(direction2.concat(direction3.concat(direction4)))
}
function rowlimits(id){
    return [id - id%8, id - id%8+7]
}




function diagonalMoves(dist, id, x, y, board){
    let moves = []
    for (var i = 1 ; i < dist; i++){
        let moveupdown = id + (x * i * 8)
        if (moveupdown < 64 && moveupdown >=0){
            let moveleftrigght = moveupdown + (y * i) 
            let rowlimit = rowlimits(moveupdown)
            if (moveleftrigght>= rowlimit[0] && moveleftrigght <= rowlimit[1]){
                if (board[moveleftrigght].piece === null){
                    moves.push(moveleftrigght)
                }else{
                    if(board[moveleftrigght].piece.color !== board[id].piece.color){
                        moves.push(moveleftrigght)
                    }
                    break;
                }
            }else{
                break
            }
        }else{
            break
        }

    }
    return moves
}



function knightMove(id, board){
    //move: 3, limit or piece on it. all combos of +-1,+-2
    let moves = []
    let movements = [[1,2],[-1,2],[1,-2],[-1,-2],[2,1],[2,-1],[-2,1],[-2,-1]]
    let leftrightlimits = rowlimits(id)
    movements.forEach(arr => {
        let leftrightmove = id + arr[0]
        //need to go left/right and see if it goes over limit at the row and then need to go up/down and see if it goes over imit at that column
        //aka id = 6 so left/right = [0,7], so anything with arr[1] = +2 fails. and up/down = [6, 62] so anything with arr[0] = -1/-2 fails
        if(leftrightmove>=leftrightlimits[0] && leftrightmove<=leftrightlimits[1]){
            let updownmove = leftrightmove + 8 * arr[1]
            if ((updownmove >= 0) && (updownmove <= 63)){
                if (board[updownmove].piece === null || board[updownmove].piece.color !== board[id].piece.color){
                    moves.push(updownmove)
                }
            }
           }   
    })
    
    return moves 
}

function getMoves(pieceid, board, enpassant, check){
    //use a switch for name of piece to get possible moves. use color to determine if paths are blocked/can't land there.
    //we can have 4 different arrays that hold the "paths" for piece, each array iterates where the absolute value is further from the grid id.
    let chosenpiece = board[pieceid].piece
    let name = chosenpiece.name
    let moves
    switch(name){
    
        case "Pawn":
            moves = chosenpiece.color === "white" ? whitePawn(pieceid, board, enpassant) : blackPawn(pieceid, board, enpassant)
            break;
        case "Queen":
            moves = queenMove(pieceid, board)
            break;
        case "Bishop":
            moves = bishopMove(pieceid, board) 
            break;
        case "Rook":
            moves = rookMove(pieceid, board) 
            break;
        case "Knight":
            moves = knightMove(pieceid, board) 
            break;
        case "King":
            moves = kingMove(pieceid, board, check)
            break;
        default :
            break;
        

    }
    return moves

}
export default getMoves
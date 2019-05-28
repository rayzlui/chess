

function whitePawn(gridid, board, enpassant){
    var start = []
    for (var i = 48; i <= 55; i++){
        start.push(i)
    }
    return pawnMove({board:board, color: "white", grid: gridid, direction: -1, start: start, enpassant: enpassant})
}
function blackPawn(gridid, board, enpassant){
    var start = []
    for (var i = 8; i <= 15; i++){
        start.push(i)
    }
    return pawnMove({board:board, color: "black", grid: gridid,direction: 1, start:start, enpassant: enpassant})

}


function pawnMove(options){

    //for en passant if pawn is on the 4th row from bottom or top aka 32 - 39 and 40 - 48 and opponent piece jumps two forward.
    var grid = options.grid
    var board = options.board
    var color = options.color
    var direction = options.direction
    //first move, attackable options, en passe, normal move
    var moves = []
    //basic move
    var basic = grid + direction * 8
    if (basic > 63 || basic < 0){
        return moves
    }
    if (board[basic].piece === null){
        moves.push(basic)
        if(options.start.includes(grid) &&board[basic+(8*direction)].piece === null ){
        //this will trigger state where it would be possible to en passant?
            moves.push(basic+(8*direction))
        }
    }
    let leftedge = [0,8,16,24,32,40,48,56]
    let rightedge = leftedge.map(x=>x+7)
    if ((!leftedge.includes(grid)) && board[basic-1].piece && board[basic-1].piece.color !== color ){
        moves.push(basic-1)
    }

    if ((!rightedge.includes(grid)) && board[basic+1].piece && board[basic+1].piece.color !== color){
        moves.push(basic+1)
    }

    
    //en passant
    if (options.enpassant){
        let move = direction * 8
        options.enpassant === grid + 1 ? moves.push(grid + 1 + move) : moves.push(grid - 1 + move)
        

    }
    
    return moves
}


function kingMove(id, board, check){
    //speical: castling, moves:one in every direction unless there's own piece
   //it's queen moves BUT LIMIT TO ONE move.
   var moves = rookMove(id,board, true, check).concat(bishopMove(id,board,2))
   return moves 

}

function rookMove(id, board, king = false, check = false){
    //moves: until limit or piece
    var gridid = id 
    var movinggrid = board[id]
    var moves = [] //put four arrays in here, if there are no legal moves don't push anything so there is only 3 etc etc.
        
    for (let i = 1; i <= gridid%8; i++){ 
        
        let move = gridid - i
        if (!(king && i > 1)){
            if (board[move].piece === null){
                moves.push(move)
            }else{
                if(board[move].piece.color !== movinggrid.piece.color){
                    moves.push(move)
                
                }
            
            break;
            }
        }
        if (king){
            if(board[id].piece.castle === true && check === false){
                if (board[move].piece){
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
    for (let i = 1; i < 8 - (gridid%8); i++){
        let move = gridid + i

        if (!(king && i > 1)){
            if (board[move].piece === null){
                moves.push(move)
            }else{
                if(board[move].piece.color !== movinggrid.piece.color){
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
    for (let i = gridid-8; i > -1; i-=8){
        let move = i

        if (!(king && i < gridid-8)){
            if (board[move].piece === null){
                moves.push(move)
            }else{
                if(board[move].piece.color !== movinggrid.piece.color){
                    moves.push(move)
                
                }
            
            break;
            }
        }
        if (king){
            if(board[id].piece.castle === true && check === false){
                if (board[move].piece){
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
    for (let i = gridid+8; i < 64; i+=8){
        let move = i
        
        if (!(king && i > gridid+8)){
            if (board[move].piece === null){
                moves.push(move)
            }else{
                if(board[move].piece.color !== movinggrid.piece.color){
                    moves.push(move)
                
                }
            
            break;
            }
        }
        if (king){
            if(board[id].piece.castle === true && check === false){
                if (board[move].piece){
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

function setEdges(n, int){
    var otherside = n + (8*int)
    var edges = []
    for (let i = n; i < otherside; i+=int){
        edges.push(i)
    }
    return edges
}

function bishopMove(id, board,dist = 10){
    //moves: until limit or piece, essentially its [[-1,-1],[1,-1],[-1,1],[1,1]] until it reaches an edge or piece
    var edges = []
    var moves = []
    edges.push(setEdges(0,1))
    edges.push(setEdges(56,1))
    for (let i = 1; i < dist; i++){
        let moveupdown = id + (-1 * i * 8)
        if (edges[0].some(x=>x<=moveupdown)){//needs to tinker edges on side need row for context){
            //essentially its (id - id%8) - 8, and see if id - 8 is greater than it.
            let rowedge = moveupdown - (moveupdown % 8)
            let moveleftrigght = moveupdown + (-1 * i)
            if (moveleftrigght >= rowedge){
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
        }
    }
    for (let i = 1; i < dist; i++){
        let moveupdown = id + (1 * i * 8)
        if (edges[1].some(x=>x>=moveupdown)){
            let rowedge = moveupdown - (moveupdown % 8)
            let moveleftrigght = moveupdown + (-1 * i)
            if (moveleftrigght >= rowedge){
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
        }
    }
    for (let i = 1; i < dist; i++){
        let moveupdown = id + (1 * i * 8)
        if (edges[1].some(x=>x>=moveupdown)){
            let rowedge = moveupdown - (moveupdown % 8) + 7
            let moveleftrigght = moveupdown + (1 * i) 
            if (moveleftrigght <= rowedge){
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
        }
    }
    for (let i = 1; i < dist; i++){
        let moveupdown = id + (-1 * i * 8)
        if (edges[0].some(x=>x<=moveupdown)){
            let rowedge = moveupdown - (moveupdown % 8) + 7
            let moveleftrigght = moveupdown + (1 * i)
            if (moveleftrigght <= rowedge){
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
        }
    }
    return moves
}

function queenMove(id, board){
    var move = bishopMove(id, board).concat(rookMove(id, board))
    return move
}

function knightMove(id, board){
    //move: 3, limit or piece on it. all combos of +-1,+-2
    var moves = []
    var movements = [[1,2],[-1,2],[1,-2],[-1,-2],[2,1],[2,-1],[-2,1],[-2,-1]]
    var leftrightlimits = [id - id%8, id - id%8+7]
    var updownlimits = [0, 63]
    movements.forEach(arr => {
        var leftrightmove = id + arr[0]
        //need to go left/right and see if it goes over limit at the row and then need to go up/down and see if it goes over imit at that column
        //aka id = 6 so left/right = [0,7], so anything with arr[1] = +2 fails. and up/down = [6, 62] so anything with arr[0] = -1/-2 fails
        if(leftrightmove>=leftrightlimits[0] && leftrightmove<=leftrightlimits[1]){
            var updownmove = leftrightmove + 8 * arr[1]
            if ((updownmove >= updownlimits[0]) && (updownmove <= updownlimits[1])){
                if (board[updownmove].piece === null){
                    moves.push(updownmove)
                }else{
                    if(board[updownmove].piece.color !== board[id].piece.color){
                        moves.push(updownmove)
                        
                    }
                }
            }
           }   
    })
    
    return moves 
}

function getMoves(pieceid, board, enpassant, check){
    //use a switch for name of piece to get possible moves. use color to determine if paths are blocked/can't land there.
    //we can have 4 different arrays that hold the "paths" for piece, each array iterates where the absolute value is further from the grid id.
    var chosenpiece = board[pieceid].piece
    var name = chosenpiece.name
    var moves
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

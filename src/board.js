import {King, Queen, Knight, Bishop, Rook, Pawn} from './chess_pieces'

class Board {
    constructor(size){
        this.allGrids = this.createBoard(size)
        this.gameOver = this.gameOver.bind(this)
        this.white = []
        this.black = []
        this.placePieces("white")
        this.placePieces("black")
    }

    moveOptions(pieceid){
        
        return this.getMoves(pieceid)
    }

    getMoves(pieceid){
        //use a switch for name of piece to get possible moves. use color to determine if paths are blocked/can't land there.
        //we can have 4 different arrays that hold the "paths" for piece, each array iterates where the absolute value is further from the grid id.
        var chosenpiece = this.allGrids[pieceid].piece
        
        var name = chosenpiece.name
        var moves
        switch(name){
        
            case "Pawn":
                moves = chosenpiece.color === "white" ? whitePawn(pieceid, this.allGrids) : blackPawn(pieceid, this.allGrids)
                break;
            case "Queen":
                moves = queenMove(pieceid, this.allGrids)
                break;
            case "Bishop":
                moves = bishopMove(pieceid, this.allGrids) 
                break;
            case "Rook":
                moves = rookMove(pieceid, this.allGrids) 
                break;
            case "Knight":
                moves = knightMove(pieceid, this.allGrids) 
                break;
            case "King":
                moves = kingMove(pieceid, this.allGrids)
                break;
            default :
                break;
            
    
        }
        return moves

    }
    
    movePiece(pieceid, id){
        //function moves piece to id and removes piece from former piece id
        var chosenpiece = this.allGrids[pieceid].piece 
        this.allGrids[id].piece = chosenpiece 
        this.allGrids[pieceid].piece = null
    }

    gridCreator(){
        return {piece: null}
    }

    placePieces(color){
        this.setPawn(color)
        this.setRook(color)
        this.setBishop(color)
        this.setKnight(color)
        this.setQueen(color)
        this.setKing(color)
    }

    setPawn(color){
        for (var i = 0 ; i < 8; i ++){     
            var x = color === "white" ? 48 : 8
            var spot = i + x
            this.placePiece(color, Pawn, spot)
        }
    }

    setRook(color){
       this.setHigherLevel(color, Rook, [0,7])
    }

    setKnight(color){
        this.setHigherLevel(color, Knight, [1,6])
    }

    setBishop(color){
        this.setHigherLevel(color, Bishop, [2,5])
    }

    setQueen(color){
        var spot = color === "white" ? [3] : [4]
        this.setHigherLevel(color, Queen, spot)
    }

    setKing(color){
        var spot = color === "white" ? [4] : [3]
        this.setHigherLevel(color, King, spot)
    }
    

    setHigherLevel(color, type, spot){
        var x = color === "white" ? 56 : 0
        var spots = spot.map(y => y + x)
        spots.forEach(spot => {
            //you can put class into function input
            this.placePiece(color, type, spot)
            
        })
    }

    


    placePiece(color, type, spot){
        var piece = new type(color)   
        var board = this.allGrids.slice()
      
        board[spot].piece = piece
        this.allgrids = board
        var colorpieces = this[color].slice()
        colorpieces.push(spot)
        this[color] = colorpieces 
    }

    createBoard(size){
        var board = []
        for (var i = 0; i < (size**2); i++){
            var grid = this.gridCreator()
            board.push(grid)
        }
        return board
    }

    gameOver(player){
        //we enter the player that was just attacked here to check for gameovers.
        for (var i = 0; i < this.allgrids.length; i++){
            if (this.allGrids[i].piece.owner === player){
                return false
            }
        }
        return true
    }

}

export default Board



function whitePawn(gridid, board){
    var start = []
    for (var i = 48; i <= 55; i++){
        start.push(i)
    }
    return pawnMove({board:board, color: "white", grid: gridid, direction: -1, start: start})
}
function blackPawn(gridid, board){
    var start = []
    for (var i = 8; i <= 15; i++){
        start.push(i)
    }
    return pawnMove({board:board, color: "black", grid: gridid,direction: 1, start:start})

}
function pawnMove(options){
    var grid = options.grid
    var board = options.board
    var color = options.color
    var direction = options.direction
    //first move, attackable options, en passe, normal move
    var moves = []
    //basic move
    var basic = grid + direction * 8
    if (board[basic].piece === null){
        moves.push(basic)
    }

    if (board[basic-1].piece && board[basic-1].piece.color !== color){
        moves.push(basic-1)
    }

    if (board[basic+1].piece && board[basic+1].piece.color !== color){
        moves.push(basic+1)
    }

    if(options.start.includes(grid)){
        //this will trigger state where it would be possible to en passant?
        moves.push(basic+(8*direction))
    }
    //en passant
    if (grid === options.passant){
        

    }
    
    return moves
}

function kingMove(id, board){
    //speical: castling, moves:one in every direction unless there's own piece
   //it's queen moves BUT LIMIT TO ONE move.
   var moves = rookMove(id,board, true).concat(bishopMove(id,board,1))
   return moves 

}

function rookMove(id, board, king = false){
    //moves: until limit or piece
    var gridid = id 
    var movinggrid = board[id]
    var moves = [] //put four arrays in here, if there are no legal moves don't push anything so there is only 3 etc etc.
        
    for (let i = 1; i <= gridid%8; i++){ 
        
        let move = gridid - i
        if (board[move].piece === null){
            moves.push(move)
        }else{
            if(board[move].piece.color !== movinggrid.piece.color){
                moves.push(move)
                
            }
            
            break;
        }
        if (king){
            break
        }
    }
    for (let i = 1; i < 8 - (gridid%8); i++){
        let move = gridid + i

        if (board[move].piece === null){
            moves.push(move)
        }else{
            if(board[move].piece.color !== movinggrid.piece.color){
                moves.push(move)
                
            }
            break;
        }
        if (king){
            break
        }
    }
    for (let i = gridid-8; i > 0; i-=8){
        let move = i

        if (board[move].piece === null){
            moves.push(move)
        }else{
            if(board[move].piece.color !== movinggrid.piece.color){
                moves.push(move)
            }
        break;
        }
        if (king){
            break
        }
    }
    for (let i = gridid+8; i <= 63; i+=8){
        let move = i

        if (board[move].piece === null){
            moves.push(move)
        }else{
            if(board[move].piece.color !== movinggrid.piece.color){
                moves.push(move)
                
            }
            break;
        }
        if (king){
            break
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
    var updownlimits = [id%8, (id%8)+(8*7)]
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


import runMove from './movefunction'
import getMoves from './piece_moves'
import pawnCrossing from './pawnlevelup'
import {setKing, setQueen, setBishop, setRook, setPawn, setKnight} from './setup'
class Board {
    constructor(size){
        this.allGrids = this.createBoard(size)
        this.white = []
        this.black = []
        
        this.playerChecked = false
        this.placePieces("white")
        this.placePieces("black")
        this.enpassant = null 
        //if there was a first move by a pawn that is two steps, then we will set that number as enpassant
        
    }

    gridCreator(){
        return {piece: null}
    }

    placePieces(color){
        setPawn(color, this)
        setRook(color, this)
        setBishop(color, this)
        setKnight(color, this)
        setQueen(color, this)
        setKing(color, this)
    }

   
    placePiece(color, type, spot){
        var piece = new type(color)   
        var board = this.allGrids
        board[spot].piece = piece  
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

    moveOptions(pieceid){
        
        return getMoves(pieceid, this.allGrids, this.enpassant, this.check)
    }

    

    checkMate(color){
        //checkmate goes through every piece of the player being checked, gets every move for each piece and 
        //checks each move and sees if it still results in a check with that move. remember check function is the aggressors pieces.
        
        var pieceslocation = this[color].map(x=>x)
        for (let i = 0; i < pieceslocation.length; i++){
            var piecenumber = pieceslocation[i]
            var piece = this.allGrids[piecenumber].piece
            var moves = getMoves(piecenumber, this.allGrids)
            for (let j = 0; j < moves.length; j++){
                let move = moves[j]
                var causesCheck = this.mockCheck(piece, piecenumber, move) 
                
                if(!causesCheck){
                    return false
                }
            }
        }
        return true
    }

   
    mockCheck(chosenpiece, pieceid, id){
        var copyboard = mockBoard(this.allGrids)
        var color = chosenpiece.color
        let copyopponentpieces = this[rivalColor(color)].map(x=>x)
        let copyownpieces = this[color].map(x=>x)
       
        runMove(chosenpiece, copyboard, id, pieceid, copyownpieces, copyopponentpieces, this.enpassant)
        var causesCheck = gameCheck(copyopponentpieces, copyboard) 
        return causesCheck
    }

    
    
    
    movePiece(pieceid, id){
        //function moves piece to id and removes piece from former piece id
        var chosenpiece = this.allGrids[pieceid].piece 
    
        var color = chosenpiece.color
        
        var causesSelfCheck = this.mockCheck(chosenpiece, pieceid, id, this.enpassant)
        if (!causesSelfCheck){
        
            runMove(chosenpiece, this.allGrids, id, pieceid, this[color], this[rivalColor(color)], this.enpassant)

            if (chosenpiece.name === "King"||chosenpiece.name === "Rook"){
                chosenpiece.castle = false
            }
           
            Math.abs(pieceid - id)===16 && chosenpiece.name === "Pawn" ? this.enpassant = id : this.enpassant = null    

            pawnCrossing(chosenpiece, id, this.allGrids)

            gameCheck(this[color], this.allGrids) ? this.checkPlayerDisplay() : this.playerChecked = false
            

            return true
        }else{

            return false
        }
    }

    checkPlayerDisplay(){
        alert("You've checked player")
        this.playerChecked = true
    }
    
    

}




export default Board


function rivalColor(color){
    return color === "white" ? "black" : "white"
}

function gameCheck(color, gameboard){
    var pieces = color.slice()
    var board = gameboard.map(x=>x)
    for (let i = 0; i < pieces.length; i++){
        var piece = pieces[i]
        var moves = getMoves(piece, board)
        for (let j = 0; j < moves.length; j ++){
            var move = moves[j]
            if (board[move].piece){
                if ((board[move].piece.name === "King") && (board[move].piece.color !== board[pieces[0]].piece.color)){
                   
                    return true
                    
                }

            }
        }
    }
    return false
}

function mockBoard(board){
    return board.map(x=>{
        if (x.piece === null){
            return {piece: null}
        }else{
            let name = x.piece.name
            let color = x.piece.color
            return {piece:{name: name, color: color}}
        }
    })
}

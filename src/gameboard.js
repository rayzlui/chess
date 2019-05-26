import React from 'react'
import Grid from './grid'

class GameBoard extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            status: null,
            moveoptions: [],
            selectedpiece: null,
        }
    }

    moveOptions(id){
        //will run function to find what moves are legal then will pass onto board for highlight/clickable OR 
        //we can send back whichever grid id they clicked and alert if illegal move. id is the selected grid where the piece was chosen
        var options = this.props.board.moveOptions(id)
        this.setState({selectedpiece: id, moveoptions: options})
        //board.moveOptions will only need the id because it will retreive the piece info from that grid (aka the name + color and make it's determination for moves)
    }

    movePiece(id){
        var moveworked = this.props.board.movePiece(this.state.selectedpiece, id)
        if (moveworked){
            this.setState({selectedpiece: null, moveoptions: []})
            this.props.switchPlayers()
        }else{
            alert("This move owuld cause you to be checked")
        }
    }

    renderBoard(){
        let display = []
        let x = 0
        var row = [] 
        let flip = 0
        
        let board = this.props.board.allGrids
        for (var i = 0; i < board.length; i++){
            let element
            var color
            let click = () =>{alert("can't click here")}
            color = i%2 === flip ? "white" : "blue"
            
            
            var image = board[i].piece ?  board[i].piece.image : null
           
            if (board[i].piece){ 
                //if it's white's turn we want only white to have click and vice versa.
                    if (this.props.turn === "white"){
                        click = board[i].piece.color === "white" ? this.moveOptions.bind(this) : ()=>alert("can't click here")
                    }else{
                        click = board[i].piece.color === "black" ? this.moveOptions.bind(this) : ()=>alert("can't click here")
                    }
            }
            if (this.state.moveoptions.includes(i)){
                color = "green"
                click = this.movePiece.bind(this)
            }
            element = <Grid key = {i} id = {i} color = {color} piece = {image} click = {click}/>
            
            row.push(element)
            if (row.length === 8){
                display.push(<li key = {x}>{row}</li>)
                x+=1
                row = []
                flip = flip === 0 ? 1 : 0 
            }
        }
        
        return display
    }
    
    render(){
        return(
            <div className = "gameboard" style = {{backgroundColor: "black"}}>
                <ul style = {{listStyle: 'none', padding: 0, margin: 0}}>{this.renderBoard.bind(this)()}</ul>
            </div>
        )
    }
}

export default GameBoard
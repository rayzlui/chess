import React from 'react'
import Grid from './grid'

class GameBoard extends React.Component{
    constructor(props){
        super(props)
        this.status = null
    }

    renderBoard(){
        let display = []
        let x = 0
        var row = []
        let element
        let flip = 0
        let board = this.props.board.allGrids
        for (var i = 0; i < board.length; i++){
            var color = i%2 === flip ? "white" : "blue"
            var image = board[i].piece ?  board[i].piece.image : null
            element = <Grid key = {i} id = {i} color = {color} piece = {image}/>
            
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
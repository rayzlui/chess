import React from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './board'
import GameBoard from './gameboard'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currentplayer: "white",
      nextplayer: "black",
      board: new Board(8),
      playerChecked: false,
      gameOver: false
    }
  }

  header(){
    if (this.state.gameOver){
      return (<p>Game Over {this.state.currentplayer.name} Wins!</p>)
    }else{
      return (<p>{this.state.currentplayer}'s Turn</p>)
    }
  }

  switchTurns(){
    //we can deal with this.state.board.playerChecked?
    if (this.state.board.playerChecked){
      //we can check if the checkmate, if not we switch players and let current player know they're being checked.
      if (this.state.board.checkMate(this.state.nextplayer)){
        //tell current player they've been check mated game over
        alert("GAME OVER")
        this.setState({gameOver: true})

        this.setState({currentplayer: this.state.nextplayer, nextplayer: this.state.currentplayer, playerChecked: true})
      }else{
        //let current player know they've been checked.
        this.setState({currentplayer: this.state.nextplayer, nextplayer: this.state.currentplayer, playerChecked: true})
      }
      //so the current player is checked.
    }else{
      this.setState({currentplayer: this.state.nextplayer, nextplayer: this.state.currentplayer})
    }
  }

  render(){
  
    return(
      <div className = "chess-container" style = {{textAlign: "center", display: "inline-block"}}>
        <div className = "chess-header">
          <h1>CHESS GAME!</h1>
          {this.header.bind(this)()}
        </div>
        <div className = "chess-board">
          <GameBoard board = {this.state.board} switchPlayers = {this.switchTurns.bind(this)} turn = {this.state.currentplayer} />
        </div>

      </div>
      
    )
  }
}

export default App;

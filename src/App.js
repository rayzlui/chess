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
      gameover: false,
      board: new Board(8)
    }
  }

  header(){
    if (this.state.gameover){
      return (<p>Game Over {this.state.currentplayer.name} Wins!</p>)
    }else{
      return (<p>{this.state.currentplayer.name}'s Turn</p>)
    }
  }

  switchTurns(){
    this.setState({currentplayer: this.state.nextplayer, nextplayer: this.state.currentplayer})
  }

  render(){
  
    return(
      <div className = "chess-container" style = {{textAlign: "center", display: "inline-block"}}>
        <div className = "chess-header">
          <h1>CHESS GAME!</h1>
          {this.header.bind(this)()}
        </div>
        <div className = "chess-board">
          <GameBoard board = {this.state.board}/>
        </div>

      </div>
      
    )
  }
}

export default App;

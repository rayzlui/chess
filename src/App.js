import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currentplayer: null,
      nextplayer: null,
      gameover: false
    }
  }

  header(){
    if (this.state.gameover){
      return (<p>Game Over {this.state.currentplayer.name} Wins!</p>)
    }else{
      return (<p>{this.state.currentplayer.name}'s Turn</p>)
    }
  }

  render(){
  
    return(
      <div className = "chess-container">
        <div className = "chess-header">
          <h1>CHESS GAME!</h1>
          {this.header.bind(this)()}
        </div>
        <div className = "chess-board">
          <GameBoard/>
        </div>

      </div>
      
    )
  }
}

export default App;

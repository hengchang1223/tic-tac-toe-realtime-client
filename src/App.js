import React, { Component } from 'react';
import board from './images/board.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import GetUserDetail from './components/GetUserDetail';
// import GetGameMode from './components/GetGameMode';
import ShowUsers from './components/ShowUsers';
import GamePlay from './components/GamePlay';
import { Container } from 'react-bootstrap';
import socketIOClient from "socket.io-client";

// import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      // endpoint: "localhost:5000",
      endpoint: "https://tic-tac-toe3d.herokuapp.com/",
      socket: null,
      isGameStarted: false,
      gameId:null,
      gameData: null,
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    // Made a connection with server
    const socket = socketIOClient(endpoint);
    socket.on("connected", data => {
      this.setState({ socket: socket })
    });
  }

  registrationConfirmation = (data) => {
    // If registration successfully redirect to player list
    this.setState({ isRegistered: data });
  };

  // gameModeConfirmation = (data) => {
  //   // If game mode successfully be choose 
  //   this.setState({ gameModeChosen: data });
  // };

  gameStartConfirmation = (data) => {
    // If select opponent player then start game and redirect to game play
    this.setState({ isGameStarted: data.status, gameId: data.game_id, gameData: data.game_data });
  };

  opponentLeft = (data) => {
    // If opponent left then get back from game play to player screen
    alert("Opponent Left");
    this.setState({ isGameStarted: false, gameId: null, gameData: null });
  };

  render() {
    return (
      <Container>
        {
          // !this.state.isGameStarted ? !this.state.gameModeChosen ? !this.state.isRegistered ? <header className="App-header">
          !this.state.isGameStarted ? !this.state.isRegistered ? <header className="App-header">
            <img src={board} className="App-logo" alt="board" />
            {this.state.socket
              ? <GetUserDetail socket={this.state.socket} registrationConfirmation={this.registrationConfirmation} />
              : <p>Loading...</p>}
          </header> :
            // <GetGameMode socket={this.state.socket} gameModeConfirmation={this.gameModeConfirmation} /> :
            <ShowUsers socket={this.state.socket} gameStartConfirmation={this.gameStartConfirmation} /> :
            <GamePlay socket={this.state.socket} gameId={this.state.gameId} gameData={this.state.gameData} opponentLeft={this.opponentLeft} />
        }
      </Container>
    );
  }
}

export default App;

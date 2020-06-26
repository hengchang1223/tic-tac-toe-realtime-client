import React, { Component, Fragment } from 'react';
import { Table, Row, Col } from 'react-bootstrap';
import './GamePlay.css';
import Board from './board/Board';

class GamePlay extends Component {
    constructor() {
        super();
        this.state = {
            gameData: null
        }
    };

    componentDidMount() {
        console.log(this.props);
        this.setState({
            gameData: this.props.gameData,
            gameId: this.props.gameId,
            gameBetweenSeconds: 2,
        });

        this.props.socket.on('selectCellResponse', data => {
            // console.log(data);
            this.setState({
                gameData: data
            });
        });
        this.props.socket.on('gameInterval', data => {
            // console.log(data);
            this.setState({
                gameBetweenSeconds: data
            });
        });
        this.props.socket.on('nextGameData', data => {
            // console.log(data);
            this.setState({
                gameId: data.game_id,
                gameData: data.game_data,
                gameBetweenSeconds: 2,
            });
        });
        this.props.socket.on('opponentLeft', data => {
            this.props.opponentLeft();
        });
    };
    
    selectCell = (i) => {
        this.props.socket.emit('selectCell', { gameId: this.state.gameId, "pos": i });
    };

    generateCellDOM = () => {
        var playboard = this.state.gameData.playboard;
        var currentSize = (playboard.length === 9 || playboard.length === 27) ? 3 : 4;
        var currentDim = (playboard.length === 9 || playboard.length === 16) ? 2 : 3;
        return (<div className="game">
                <Board 
                size = {currentSize}
                dimention = {currentDim}
                squares = {playboard}
                onClick = {(i) => (this.state.gameData.game_status !== "ongoing" || this.props.socket.id !== this.state.gameData.whose_turn || this.state.gameData.playboard[i] ? void (0) : this.selectCell(i))}
                />
                </div>)
    }

    render() {
        return (

            this.state.gameData ? <Fragment>
                <Row>
                    <Col>
                        <p className={"text-center " + (this.props.socket.id !== this.state.gameData.whose_turn ? "active-player" : "")}>
                            {this.props.socket.id === this.state.gameData.player1 ? (this.state.gameData.game_status === "won" && this.state.gameData.game_winner === this.state.gameData.player2 ? "Opponent is Winner!!! " : " ") + this.state.gameData[this.state.gameData.player2].username + " | Played : " + this.state.gameData[this.state.gameData.player2].played + " | Won : " + this.state.gameData[this.state.gameData.player2].won + " | Draw : " + this.state.gameData[this.state.gameData.player2].draw : (this.state.gameData.game_status === "won" && this.state.gameData.game_winner === this.state.gameData.player1 ? "Opponent is Winner!!! " : " ") + this.state.gameData[this.state.gameData.player1].username + " | Played : " + this.state.gameData[this.state.gameData.player1].played + " | Won : " + this.state.gameData[this.state.gameData.player1].won + " | Draw : " + this.state.gameData[this.state.gameData.player1].draw}
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table bordered>
                            <tbody>
                                {
                                    this.generateCellDOM()
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className={"text-center " + (this.props.socket.id === this.state.gameData.whose_turn ? "active-player" : "")}>{
                            this.props.socket.id === this.state.gameData.player1 ? (this.state.gameData.game_status === "won" && this.state.gameData.game_winner === this.state.gameData.player1 ? "You are Winner!!! " : " ") + this.state.gameData[this.state.gameData.player1].username + " | Played : " + this.state.gameData[this.state.gameData.player1].played + " | Won : " + this.state.gameData[this.state.gameData.player1].won + " | Draw : " + this.state.gameData[this.state.gameData.player1].draw : (this.state.gameData.game_status === "won" && this.state.gameData.game_winner === this.state.gameData.player2 ? "You are Winner!!! " : " ") + this.state.gameData[this.state.gameData.player2].username + " | Played : " + this.state.gameData[this.state.gameData.player2].played + " | Won : " + this.state.gameData[this.state.gameData.player2].won + " | Draw : " + this.state.gameData[this.state.gameData.player2].draw}
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className="text-center">
                            {this.state.gameData.game_status === "won" ? "New Game will be start in " + this.state.gameBetweenSeconds + " seconds." : ""}
                        </p>
                    </Col>
                </Row>
            </Fragment> : <p>Gathering Data</p>

        );
    }
}

export default GamePlay;
import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
class GetGameMode extends Component {
    constructor() {
        super();
        this.state = {
            gameMode: "2d3"
        };
    };

    componentDidMount() {
        this.props.socket.on('checkGameModeResponse', data => {
            console.log(data);
            this.props.gameModeConfirmation(data);
        });
    };

    play2d3 = () => {
        this.props.socket.emit('checkGameMode', { "mode": '2d3' });
    };

    play3d3 = () => {
        this.props.socket.emit('checkGameMode', { "mode": '3d3' });
    };

    render() {
        return (
            <Form>
                <Form.Group>
                    <Form.Label>Choose Tic Tac Toe Mode</Form.Label>
                    <Form.Text className="text-muted">
                        Choose Tic Tac Toe Mode
                    </Form.Text>
                    <Button onClick={this.play2d3} variant="primary" type="button">
                        2D 3x3
                    </Button>
                    <Button onClick={this.play3d3} variant="primary" type="button">
                        3D 3x3
                    </Button>
                </Form.Group>
            </Form>

        );
    }
}

export default GetGameMode;
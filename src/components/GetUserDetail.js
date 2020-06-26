import React, { Component } from 'react';
import { Form, Button, DropdownButton, Dropdown } from 'react-bootstrap';

class GetUserDetail extends Component {
    /*
    username: Function as user name
    gameMode: Decide game mode (2d or 3d)
    dropDownValue: Default text in dropdown menu
    */
    constructor() {
        super();
        this.state = {
            username: "",
            gameMode: "2d3",
            dropDownValue: "Choose Game Mode (2D 3x3 by default)"
        };
    };

    componentDidMount() {
        // 
        this.props.socket.on('checkUserDetailResponse', data => {
            console.log(data);
            this.props.registrationConfirmation(data);
        });
    };

    submitUsername = () => {
        this.props.socket.emit('checkUserDetail', {
            "username": this.state.username,
            "gameMode": this.state.gameMode
        });
    };

    onGameModeSelect = (e) => {
        this.setState({
            "gameMode": e,
            
        });
    };

    changeDropDownTitle = (text) => {
        this.setState({ dropDownValue: text});
    };

    onUsernameChange = (e) => {
        this.setState({ username: e.target.value });
    };

    render() {
        return (
            <Form>
                <Form.Group>
                    <Form.Label>Enter Your Username</Form.Label>
                    <Form.Control type="text" value={this.state.username} onChange={this.onUsernameChange} placeholder="Enter Username" />
                    <Form.Text className="text-muted">
                        Enter Your Username
                    </Form.Text>
                    <DropdownButton title={this.state.dropDownValue} onSelect={this.onGameModeSelect}>
                        <Dropdown.Item eventKey="2d3" onClick={() => this.changeDropDownTitle("2D 3x3")}>2D 3x3</Dropdown.Item>
                        <Dropdown.Item eventKey="3d3" onClick={() => this.changeDropDownTitle("3D 3x3")}>3D 3x3</Dropdown.Item>
                        <Dropdown.Item eventKey="2d4" onClick={() => this.changeDropDownTitle("2D 4x4")}>2D 4x4</Dropdown.Item>
                        <Dropdown.Item eventKey="3d4" onClick={() => this.changeDropDownTitle("3D 4x4")}>3D 4x4</Dropdown.Item>
                    </DropdownButton>
                    <Button disabled={this.state.username.length === 0} onClick={this.submitUsername} variant="primary" type="button">
                        Submit
                    </Button>
                </Form.Group>
            </Form>

        );
    };
}

export default GetUserDetail;
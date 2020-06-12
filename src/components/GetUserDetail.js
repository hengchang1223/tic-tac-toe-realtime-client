import React, { Component } from 'react';
import { Form, Button, DropdownButton, Dropdown } from 'react-bootstrap';

class GetUserDetail extends Component {
    constructor() {
        super();
        this.state = {
            mobileNumber: "1234567890",
            gameMode: "2d3",
            dropDownValue: "Choose Game Mode (2D 3x3 by default)"
        };
    };

    componentDidMount() {
        this.props.socket.on('checkUserDetailResponse', data => {
            console.log(data);
            this.props.registrationConfirmation(data);
        });
    };

    submitMobileNumber = () => {
        this.props.socket.emit('checkUserDetail', {
            "mobileNumber": this.state.mobileNumber,
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

    onMobileNumberChange = (e) => {
        this.setState({ mobileNumber: e.target.value });
    };

    render() {
        return (
            <Form>
                <Form.Group>
                    <Form.Label>Enter Your Mobile Number</Form.Label>
                    <Form.Control type="number" value={this.state.mobileNumber} onChange={this.onMobileNumberChange} placeholder="Enter Mobile" />
                    <Form.Text className="text-muted">
                        Enter Your Mobile Number
                    </Form.Text>
                    <DropdownButton title={this.state.dropDownValue} onSelect={this.onGameModeSelect}>
                        <Dropdown.Item eventKey="2d3" onClick={() => this.changeDropDownTitle("2D 3x3")}>2D 3x3</Dropdown.Item>
                        <Dropdown.Item eventKey="3d3" onClick={() => this.changeDropDownTitle("3D 3x3")}>3D 3x3</Dropdown.Item>
                    </DropdownButton>
                    <Button disabled={this.state.mobileNumber.length !== 10} onClick={this.submitMobileNumber} variant="primary" type="button">
                        Submit
                    </Button>
                </Form.Group>
            </Form>

        );
    };
}

export default GetUserDetail;
import React, { Component } from 'react';
import './App.css';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import './button.css';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            Email: '',
            Password: ''
        }
        this.Password = this.Password.bind(this);
        this.Email = this.Email.bind(this);
        this.login = this.login.bind(this);
    }
    Email(event) {
        this.setState({ Email: event.target.value })
    }
    Password(event) {
        this.setState({ Password: event.target.value })
    }
    login(event) {
        fetch('https://xmap.azurewebsites.net/api/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                email: this.state.Email,
                password: this.state.Password
            })
        }).then((Response) => Response.json())
            .then((result) => {
                console.log(result.ok);
                if (!result.ok)
                    alert('Invalid User or Password');
                else{
                localStorage.setItem("userToken", result.access_token);
                this.props.history.push("/home");
                }
            })
    }

    render() {

        return (
            <div className="app flex-row align-items-center">
            <img   src='https://static.onecms.io/wp-content/uploads/sites/28/2020/07/10/yosemite-national-park-falls-trail-CALIHIKES0720.jpg'/>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <h1>Log in for X-map:</h1>
                <div >
                <Container className='d-flex justify-content-center header'>
                    <Row className="App">
                        <Col md="11" lg="20" xl="20">
                            <CardGroup>
                                <Card className="p-2">
                                    <CardBody>
                                        <Form>
                                            <div class="row" className="mb-2 pageheading">
                                            </div>
                                            <InputGroup className="mb-3">
                                                <Input type="text" onChange={this.Email} placeholder="Enter Email" />
                                            </InputGroup>
                                            
                                            <InputGroup className="mb-4">
                                                <Input type="password" onChange={this.Password} placeholder="Enter Password" />
                                            </InputGroup>
                                            
                                            <Button onClick={this.login} color="success" block>Login</Button>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
                </div>
            </div>
        );
    }
}

export default Login;
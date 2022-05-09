import React, { Component } from 'react';
import { Button, Card, CardFooter, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Reg extends Component {
  constructor() {
    super();
    this.state = {
      FirstName: '',//Employeename
      LastName: '',//City
      Email: '',
      Password: '',
      Message: 'Not Registered'
    }
    this.Email = this.Email.bind(this);
    this.FirstName = this.FirstName.bind(this);
    this.Password = this.Password.bind(this);
    this.LastName = this.LastName.bind(this);
    this.register = this.register.bind(this);
    // this.Message = this.Message.bind(this);
  }
//   Message(event) {
//     this.setState({ Message: 'You have successfully registered, please go to login page and login' })
//   }
  Email(event) {
    this.setState({ Email: event.target.value })
  }

  Password(event) {
    this.setState({ Password: event.target.value })
  }
  LastName(event) {
    this.setState({ LastName: event.target.value })
  }
  FirstName(event) {
    this.setState({ FirstName: event.target.value })
  }

  register(event) {
    fetch('https://xmap.azurewebsites.net/api/users/register', { 
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.Email,
        first_name: this.state.FirstName,
        last_name: this.state.LastName,
        password: this.state.Password
      })
    }).then((Response) => {Response.json();alert('Success!');this.props.history.push("/home");})
      .then((Result) => {
          console.log("register result is "+Result);
          console.log("result.ok is "+Result.ok);
        //   this.props.history.push("/home");
        // if (Result.ok)

        // else
        //   alert('Sorrrrrry !!!! Un-authenticated User !!!!!')
      })
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <img   src='https://static.onecms.io/wp-content/uploads/sites/28/2020/07/10/yosemite-national-park-falls-trail-CALIHIKES0720.jpg'/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <h1>Sign up for X-map:</h1>
        <Container className='d-flex justify-content-center header'>
          <Row className="App">
            <Col md="13" lg="20" xl="20">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <div class="row" className="mb-2 pageheading">
                    </div>
                    <InputGroup className="mb-3">
                      <Input type="text"  onChange={this.FirstName} placeholder="Enter First Name" />
                    </InputGroup>
                    
                    <InputGroup className="mb-4">
                      <Input type="text"  onChange={this.LastName} placeholder="Enter Last Name" />
                    </InputGroup>
                    
                    <InputGroup className="mb-3">
                      <Input type="text"  onChange={this.Email} placeholder="Enter Email" />
                    </InputGroup>
                   
                    <InputGroup className="mb-3">
                      <Input type="password"  onChange={this.Password} placeholder="Enter Password" />
                    </InputGroup>
                    
                    <Button  onClick={this.register} color="success" block>Create Account</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <br/><br/><br/>
      </div>
    );
  }
}

export default Reg;
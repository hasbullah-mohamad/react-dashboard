import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, Row, Label } from 'reactstrap';

import { Auth } from "react-django"


class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {
        stayLoggedIn: false
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const data = this.state;
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    data[name]  = value;
    this.setState({ data });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.data.stayLoggedIn) {
      Auth.setStayLoggedIn()
    }

    Auth.login()
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>

                      <Button
                        color="primary"
                        className="px-4 mb-4"
                        style={{height: "50px"}}
                        block
                        onClick={this.handleSubmit}
                      >
                        <strong>Apsley Farms</strong>
                      </Button>

                      <div className="form-check">
                        <Input
                          type='checkbox'
                          name='stayLoggedIn'
                          className="form-check-input"
                          id={"formControlInputLoggedSignIn"}
                          checked={this.state.data.stayLoggedIn}
                          onChange={this.handleChange}
                        />
                        <Label htmlFor={"formControlInputLoggedSignIn"} className="form-check-label">
                          Stay logged in
                        </Label>
                      </div>

                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;

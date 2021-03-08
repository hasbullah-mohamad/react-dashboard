import React from 'react';

import { Container } from 'reactstrap';
import { Button, Card, CardBody, CardGroup, Col, Form, Row } from 'reactstrap';


export default (props) => {
  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="6">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <Form>
                    <h1>Connection Failed</h1>
                    <Button
                      color="primary"
                      className="px-4 mb-4"
                      style={{height: "50px"}}
                      block
                      onClick={props.handleFetchUser}
                    >
                      <strong>Try again</strong>
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

import React, { Component } from "react";
import { Control, LocalForm } from "react-redux-form";
import { Row, Col, Label, Button } from "reactstrap";

export default class Test extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <LocalForm
          onSubmit={(values) => {
            alert("Current State is: " + JSON.stringify(values));
            console.log(JSON.stringify(values));
          }}
        >
          <Row className="form-group">
            <Col md={{ size: 4, offset: 2 }}>
              <Control.text
                model=".firstname"
                placeholder="First Name"
                className="form-control"
              />
            </Col>
          </Row>

          <Row className="form-group">
            <Col md={{ size: 8, offset: 2 }}>
              <Button type="submit">Send Feedback</Button>
            </Col>
          </Row>
        </LocalForm>
      </div>
    );
  }
}

import React, {Component} from 'react'
import {Modal, Button, Row, Col, Form} from 'react-bootstrap'
import LoginForm from './LoginForm'

export class LoginModal extends Component{
    constructor(props) {
        super(props)
    }

    render() {
    return (
    <Modal
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Login To Your Account ✔️
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <LoginForm></LoginForm>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    );
    }
  }


  export default LoginModal
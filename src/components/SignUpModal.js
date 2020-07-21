import React, {Component} from 'react'
import SignUpForm from '../components/SignUpForm'
import {Modal, Button, Row, Col, Form} from 'react-bootstrap'

function SignUpModal(props) {

    return (
        
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create Account ✔️
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <SignUpForm></SignUpForm>
    
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
export default SignUpModal
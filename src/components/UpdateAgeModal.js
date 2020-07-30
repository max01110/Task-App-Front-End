import React, {Component} from 'react'
import {Modal, Button, Row, Col, Form} from 'react-bootstrap'
import UpdateAgeForm from './UpdateAgeForm'


export class UpdateAgeModal extends Component{
    constructor(props) {
        super(props)

        this.clickHandler = this.clickHandler.bind(this)

    }
    
    clickHandler() {
      this.props.onHide()
    //   this.props.onStatusUpdate();
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
          Update Age 🔧
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UpdateAgeForm props={this.props}/>
      </Modal.Body>
      <Modal.Footer>
        <Button updatae={this.props} onClick={this.clickHandler}>Close</Button>
      </Modal.Footer>
    </Modal>
    );
    }
  }


  export default UpdateAgeModal
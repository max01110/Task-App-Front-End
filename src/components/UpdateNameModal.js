import React, {Component} from 'react'
import {Modal, Button, Row, Col, Form} from 'react-bootstrap'
import UpdateNameForm from './UpdateNameForm'


export class UpdateNameModal extends Component{
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
          Update Name 🔧
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UpdateNameForm props={this.props}/>
      </Modal.Body>
      <Modal.Footer>
        <Button update={this.props} onClick={this.clickHandler}>Close</Button>
      </Modal.Footer>
    </Modal>
    );
    }
  }


  export default UpdateNameModal
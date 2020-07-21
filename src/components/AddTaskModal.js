import React, {Component} from 'react'
import {Modal, Button, Row, Col, Form} from 'react-bootstrap'
import AddTaskForm from './AddTaskForm'


export class AddTaskModal extends Component{
    constructor(props) {
        super(props)
    }
    
    clickHandler() {
      this.props.onHide()
      this.props.onStatusUpdate();
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
          Create New Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddTaskForm props={this.props}/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.clickHandler}>Close</Button>
      </Modal.Footer>
    </Modal>
    );
    }
  }


  export default AddTaskModal
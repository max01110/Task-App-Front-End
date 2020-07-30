import React, {Component} from 'react'
import {Modal, Button, Row, Col, Form} from 'react-bootstrap'
import UpdateAgeForm from './UpdateAgeForm'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { mainData } from '../pages/main'

toast.configure()

function cannotDelete () {
    toast.error("⚠️Cannot Delete Account!", {
        position: toast.POSITION.TOP_CENTER
    })
}
function deleteAccount () {
    toast.info("Account Deleted", {
        position: toast.POSITION.TOP_CENTER
    })
}

export class DeleteAccount extends Component{
    constructor(props) {
        super(props)

        this.clickHandler = this.clickHandler.bind(this)
        this.deleteAccount = this.deleteAccount.bind(this)

    }
    
    clickHandler() {
      this.props.onHide()
    //   this.props.onStatusUpdate();
    }

    deleteAccount() {
        console.log("Account deleted")
        axios.delete('https://michet-task-manager.herokuapp.com/users/me', {
            headers: {
                'Authorization': `Bearer ${mainData.token}`,
                crossdomain: true
            }

        }).then((resp) => {
            deleteAccount()
            window.location.reload(false);

        }).catch((e) => {
            cannotDelete()
        })
    }

    render() {
        const deleteAccStyle = {
            backgroundColor: "red", /* Green */
            border: "none",
            color: "white",
            padding: "7px 15px",
            textAlign: "center",
            fontSize: "16px",
            margin: "4px 2px",
            cursor: "pointer"
        }
    return (
    <Modal
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Are you sure you want to delete your account?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <button style={deleteAccStyle} onClick={this.deleteAccount}>Delete</button>
      </Modal.Body>
      <Modal.Footer>
        <Button>Close</Button>
      </Modal.Footer>
    </Modal>
    );
    }
  }


  export default DeleteAccount
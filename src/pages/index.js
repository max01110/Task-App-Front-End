import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
    AwesomeButton,
    // AwesomeButtonProgress,
    // AwesomeButtonSocial,
} from 'react-awesome-button';
import "react-awesome-button/dist/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

import SignUpModal from '../../src/components/SignUpModal';
import LoginModal from '../components/LoginModal'
import TasksImg from '../assets/tasks.svg'




class index extends Component {

    constructor(props) {
        super(props)

        this.state = {
            addModalShow: false,
            signupModalShow: false
        }
    }

    render() {
        let addModalClose = () => this.setState({ addModalShow: false })
        let signupModalClose = () => this.setState({ signupModalShow: false })


        const title = {
            color: "RGB(29, 43, 87)",
            margin: "20px",
            fontSize: "50px"
        }

        const quote = {
            fontStyle: "italic",
            fontSize: "20px"
        }
        const footerStyle = {
            height: "142px"


        }

        return (
            <div>

                <div id="leftHalf">
                    <h1 style={title}>Task Manager!</h1>
                    <p style={quote}>Just do stuff!</p>
                    <hr />
                    <p>👋 Welcome </p>
                    <p>Login or Sign up and become a pro of organization!</p>

                    <div id="vertical-center">
                        <br />
                        <br />
                        {/* Login Button */}
                        <AwesomeButton
                            type="primary"
                            onPress={next => {
                                this.setState({ signupModalShow: true })
                            }}
                        >Login</AwesomeButton><br /><br />

                        {/* Sign Up Button */}

                        <AwesomeButton
                            type="primary"
                            onPress={next => {
                                this.setState({ addModalShow: true })
                            }}
                        >Sign Up</AwesomeButton><br />


                    </div>
                    <SignUpModal
                        show={this.state.addModalShow}
                        onHide={addModalClose}
                    ></SignUpModal>

                    <LoginModal
                        show={this.state.signupModalShow}
                        onHide={signupModalClose}
                    ></LoginModal>

                    
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />

                    <hr/>
            

                    <p>Made by Maxime Michet 💻 🎷 ✈️</p>
                    <p style={{ textAlign: "center" }}>&copy; {new Date().getFullYear()} Copyright</p>
                    
                </div>

                <div id="rightHalf">
                    <img src={TasksImg} style={{ height: 600, width: 500 }} />

                </div>


            </div>
        )
    }
}

export default index

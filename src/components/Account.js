import React, { Component } from 'react'
import axios from 'axios'
import { mainData } from '../pages/main'
import Tippy from '@tippy.js/react'
import 'tippy.js/dist/tippy.css'

import updateImg from '../assets/update.jpg'
class Account extends Component {
    constructor(props) {
        super(props)
        this.avatarSubmitHandler = this.avatarSubmitHandler.bind(this);
        this.fileInput = React.createRef();


        this.state = {
            user: {}
        }
    }

    componentDidMount() {

        if (mainData !== undefined) {
            axios.get('https://michet-task-manager.herokuapp.com/users/me', {
                headers: {
                    'Authorization': `Bearer ${mainData.token}`,
                }
            }).then((response) => {
                console.log(response)
                this.setState({ user: response.data })

            }).catch((e) => {
                console.log(e)
                console.log('crap')
            })
        }
    }

    avatarSubmitHandler(event) {
        event.preventDefault();
        const avatar = this.fileInput.current.files[0]
        console.log(avatar)

        axios.post('https://michet-task-manager.herokuapp.com/users/me/avatar', {
            avatar: avatar
        }
            , {
                headers: {
                    'Authorization': `Bearer ${mainData.token}`,
                }
            }).then((response) => {
                console.log(response)
            }).catch((e) => {
                console.log(e)
            })

    }

    updateNameHandler() {
        console.log('Name Update')
    }

    updateAgeHandler() {
        console.log('Age Update')
    }

    updateEmailHandler() {
        console.log('Email Update')
    }

    render() {
        const { user } = this.state

        const mystyle = {
            color: "white",
            // backgroundColor: "#090252",
            padding: "10px",
            fontFamily: "Arial",
            textAlign: "center"
        };

        const mainstyle = {
            color: "white",
            marginLeft: "50px",
            textAlign: "left",
            fontSize: "20px"
        }
        const imageStyle = {
            height: "70px",
            width: "90px",
            cursor: "pointer"
        }

        const dangerStyle = {
            color: "red"
        }

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

        const avatarURL = "https://michet-task-manager.herokuapp.com/users/" + user._id + "/avatar"

        let createdAt = undefined
        let time = undefined
        let timeHr = undefined
        if (mainData !== undefined) {
            createdAt = mainData.user.createdAt
            time = createdAt.split("T")[0]
            timeHr = createdAt.split("T")[1]
            timeHr = timeHr.slice(0, 8);
        }
        return (
            <>
                {/* <form onSubmit={this.avatarSubmitHandler}>
                    <label>
                        Upload file:
          <input type="file" ref={this.fileInput} />
                    </label>
                    <br />
                    <button type="submit">Submit</button>
                </form> */}

                <h1 style={mystyle}>⚙️ Account ⚙️</h1>

                <div style={mainstyle}>

                    <h1>Name
                        <Tippy content="Update Name">
                            <img onClick={this.updateNameHandler} style={imageStyle} src={updateImg} />
                        </Tippy>
                    </h1>
                    <p>{user.name}</p>
                    <hr/>
                    <h1>Age
                        <Tippy content="Update Age">
                            <img onClick={this.updateAgeHandler} style={imageStyle} src={updateImg} />
                        </Tippy>
                    </h1>
                    <p>You lived <b>{user.age}</b> years in our beautiful world 🌎 </p>
                    <hr/>
                    <h1>Email
                        <Tippy content="Update Email">
                            <img onClick={this.updateEmailHandler} style={imageStyle} src={updateImg} /> 
                        </Tippy>
                    </h1>
                    <p>{user.email}</p>
                    <hr/>

                    <h1>Account Creation</h1>
                    <p>You created your accout on <b>{time}</b> at {timeHr} 😉 </p>
                    <br/>
                    <hr style={{borderTop: "3px dashed red"}}/>
                    <h1 style={dangerStyle}>Danger Zone</h1>
                    <button style={deleteAccStyle}>Delete Account</button>


                    {/* <div id="rightHalf" style={dangerStyle}>
                    <p>Danger Zone</p>
                    <button>Delete Account</button>
                    </div> */}
                    {/* <img src={avatarURL} /> */}
                </div>




            </>
        )
    }
}

export default Account

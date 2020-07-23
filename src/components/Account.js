import React, { Component } from 'react'
import axios from 'axios'
import { mainData } from '../pages/main'

class Account extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {},
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

    avatarSubmitHandler() {
        var data = new FormData()
        data.append('file', document.getElementById('file').files[0]);
        console.log("Data Form Avatar:", data)
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
            textAlign: "center",
            fontSize: "20px"
        }

        const avatarURL = "https://michet-task-manager.herokuapp.com/users/" + user._id + "/avatar"
        return (
            <>
                <form role="form" class="form" onsubmit="return false;">
                    <div class="form-group">
                        <label for="file">File</label>
                        <input id="file" type="file" class="form-control" />
                    </div>
                    <button id="upload" type="button" class="btn btn-primary" onClick={this.avatarSubmitHandler}>Upload</button>
                </form>
                <h1 style={mystyle}>🔒 Account 🔒</h1>

                <div style={mainstyle}>
                    <p>Name: {user.name}</p><br />
                    <p>Age: {user.age}</p><br />
                    <p>Email: {user.email}</p><br />
                    <p>Account Created: {user.createdAt}</p><br />
                    <img src={avatarURL} />
                </div>


            </>
        )
    }
}

export default Account

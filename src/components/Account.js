import React, { Component } from 'react'
import axios from 'axios'
import { mainData } from '../pages/main'
import Tippy from '@tippy.js/react'
import 'tippy.js/dist/tippy.css'
import UpdateNameModal from './UpdateNameModal'
import UpdateAgeModal from './UpdateAgeModal'
import UpdateEmailModal from './UpdateEmailModal'
import DeleteAccount from './DeleteAccountModal'

import updateImg from '../assets/update.png'
class Account extends Component {
    constructor(props) {
        super(props)
        this.avatarSubmitHandler = this.avatarSubmitHandler.bind(this);
        this.fileInput = React.createRef();


        this.state = {
            user: {},
            UpdateNameModalShow: false,
            UpdateEmailModalShow: false,
            UpdateAgeModalShow: false,
            deleteAccountModalShow: false
        }
        this.updateNameHandler = this.updateNameHandler.bind(this)
        this.updateAgeHandler = this.updateAgeHandler.bind(this)
        this.updateEmailHandler = this.updateEmailHandler.bind(this)
        this.fetchUser = this.fetchUser.bind(this)
        this.deleteAccountHandler = this.deleteAccountHandler.bind(this)
    }

    componentDidMount() {

        if (mainData !== undefined) {
            this.fetchUser()
        }
    }

    fetchUser() {
        console.log("Fetched------------")
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
        this.setState({ UpdateNameModalShow: true })
    }

    updateAgeHandler() {
        this.setState({ UpdateAgeModalShow: true })
    }

    updateEmailHandler() {
        this.setState({ UpdateEmailModalShow: true })
    }

    deleteAccountHandler() {
        this.setState({ deleteAccountModalShow: true })
    }
    render() {
        const { user } = this.state

        let UpdateNameModalClose = () => this.setState({ UpdateNameModalShow: false })
        let UpdateAgeModalClose = () => this.setState({ UpdateAgeModalShow: false })
        let UpdateEmailModalClose = () => this.setState({ UpdateEmailModalShow: false })
        let deleteAccountModalClose = () => this.setState({ deleteAccountModalShow: false })


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
            height: "40px",
            width: "40px",
            cursor: "pointer",
            padding: '5px'
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
                    <hr />
                    <h1>Age
                        <Tippy content="Update Age">
                            <img onClick={this.updateAgeHandler} style={imageStyle} src={updateImg} />
                        </Tippy>
                    </h1>
                    <p>You lived <b>{user.age}</b> years in our beautiful world 🌎 </p>
                    <hr />
                    <h1>Email
                        <Tippy content="Update Email">
                            <img onClick={this.updateEmailHandler} style={imageStyle} src={updateImg} />
                        </Tippy>
                    </h1>
                    <p>{user.email}</p>
                    <hr />

                    <h1>Account Creation</h1>
                    <p>You created your accout on <b>{time}</b> at {timeHr} (UTC)😉 </p>
                    <hr style={{ borderTop: "3px dashed red" }} />
                    <h1 style={dangerStyle}>Danger Zone</h1>
                    <button style={deleteAccStyle} onClick={this.deleteAccountHandler}>Delete Account</button>

                </div>

                <UpdateNameModal
                    show={this.state.UpdateNameModalShow}
                    onHide={UpdateNameModalClose}
                    props={this.props}
                    Update={this.fetchUser}
                ></UpdateNameModal>

                <UpdateAgeModal
                    show={this.state.UpdateAgeModalShow}
                    onHide={UpdateAgeModalClose}
                    props={this.props}
                    Update={this.fetchUser}
                ></UpdateAgeModal>

                <UpdateEmailModal
                    show={this.state.UpdateEmailModalShow}
                    onHide={UpdateEmailModalClose}
                    props={this.props}
                    Update={this.fetchUser}
                ></UpdateEmailModal>
                <DeleteAccount
                    show={this.state.deleteAccountModalShow}
                    onHide={deleteAccountModalClose}
                    props={this.props}
                    Update={this.fetchUser}
                ></DeleteAccount>
            </>
        )
    }
}

export default Account

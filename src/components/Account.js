import React, { Component } from 'react'
import axios from 'axios'
import {mainData} from '../pages/main'

class Account extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             user: {},
        }
    }
    
    componentDidMount () {
        if (mainData !== undefined) {
            axios.get('https://michet-task-manager.herokuapp.com/users/me', {
                headers: {
                    'Authorization': `Bearer ${mainData.token}`,
                }
            }).then((response) => {
                console.log(response)
                this.setState({user: response.data})
            }).catch((e) => {
                console.log(e)
                    console.log('crap')
            })
    }
    }
    
    
    render() {
        const { user  } = this.state

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
        

        return (
            <>
                <h1 style={mystyle}>🔒 Account 🔒</h1>

                <div style={mainstyle}>
                    <p>Name: {user.name}</p><br/>
                    <p>Age: {user.age}</p><br/>
                    <p>Email: {user.email}</p><br/>
                    <p>Account Created: {user.createdAt}</p><br/>

                </div>
            </>
        )
    }
}

export default Account

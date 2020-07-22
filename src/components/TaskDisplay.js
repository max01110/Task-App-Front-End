import React , { useState } from 'react'
import { Button } from 'react-bootstrap';
import crossImg from '../assets/cross.png'
import checkImg from '../assets/checkmark.png'
import axios from 'axios'
import {mainData} from '../pages/main'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

function taskRemoved ()  {
    toast.info("❌Task Removed", {
        position: toast.POSITION.TOP_CENTER
    })
}

function taskCompleted ()  {
    toast.info("🎉 Task Completed!", {
        position: toast.POSITION.TOP_CENTER
    })
}


function TaskDisplay(props) {
    let description = props.data.description
    let number = props.number + 1
    let createdAt = props.data.createdAt
    let time = createdAt.split("T")
    // const { description, completed, createdAt } = props.data
    // console.log("data", props.data)
    // const description = "Do that thing"
    // const number = 1
    // const completed = false
    // const createdAt = "33TUFU UTC AM 88.0"
    

    const taskStyle = {
        color: 'white'
 
    }

    const taskComp = {
        width: '100%',
        padding: '10px',
        border: '5px solid gray',
        margin: '0',
        borderRadius: '10px',
        overflow: "auto"
    }
    const Header = {
        padding: "10px 20px",
        textAlign: "center",
        color: "white",
        fontSize: "30px"
 
      }
    const leftStyle = {
        color: 'white',
        fontSize: '25px',
        marginLeft: '3%',
        textAlign: 'left'
    }
    const imageStyle = {
        height: "50px",
        width: "50px",
        float: "right"

        
    }
    const timeStyle = {
        color: 'grey',
        fontSize: '25px',
        marginLeft: '3%',
        textAlign: 'left',
        fontStyle: "italic"
    }

    function useForceUpdate(){
        const [value, setValue] = useState(0); // integer state
        return () => setValue(value => ++value); // update the state to force render
    }
    const forceUpdate = useForceUpdate();


    function completeTask () {
        let url = 'https://michet-task-manager.herokuapp.com/tasks/'+props.data._id
        axios.patch(url, {
                completed: true
            },
            {
                headers: {
                    'Authorization': `Bearer ${mainData.token}`,
                }
            }).then((response) => {
                console.log(response)
                props.handler()
                taskCompleted()
                forceUpdate()
            }).catch((e) => {
                console.log(e)
            })
    }
    

    return (
        <>
            <div style={taskComp}>
                <h1 style={leftStyle}>{number} - {description}<img onClick={completeTask}style={imageStyle} src={checkImg} /></h1>
                <p style={timeStyle}>{time[0]}</p>
                

            </div>
            <br/>
        </>
    )
}

export default TaskDisplay

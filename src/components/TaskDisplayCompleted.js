import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import undoImg from '../assets/undo.png'
import crossImg from '../assets/cross.png'
import axios from 'axios'
import { mainData } from '../pages/main'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Tippy from '@tippy.js/react'
import 'tippy.js/dist/tippy.css'

toast.configure()

function taskRemoved() {
    toast.info("❌Task Removed", {
        position: toast.POSITION.TOP_CENTER
    })
}

function taskUncompleted() {
    toast.info("↩️ Task Uncompleted!", {
        position: toast.POSITION.TOP_CENTER
    })
}


function TaskDisplayCompleted(props) {
    console.log("PROPS DATA", props.data)
    let description = props.data.description
    let number = props.number + 1
    let createdAt = props.data.createdAt
    let updatedAt = props.data.updatedAt
    let time = createdAt.split("T")
    let update = updatedAt.split("T")
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
        float: "right",
        cursor: "pointer"
    }
    const timeStyle = {
        color: 'grey',
        fontSize: '25px',
        marginLeft: '3%',
        textAlign: 'left',
        fontStyle: "italic"
    }

    function useForceUpdate() {
        const [value, setValue] = useState(0); // integer state
        return () => setValue(value => ++value); // update the state to force render
    }
    const forceUpdate = useForceUpdate();

    function removeTask() {
        let url = 'https://michet-task-manager.herokuapp.com/tasks/' + props.data._id
        axios.delete(url, {
            headers: {
                'Authorization': `Bearer ${mainData.token}`,
            }
        }).then((response) => {
            props.handler()
            forceUpdate()
            taskRemoved()
        }).catch((e) => {
            console.log(e)
        })

    }

    function uncompleteTask() {
        let url = 'https://michet-task-manager.herokuapp.com/tasks/' + props.data._id
        axios.patch(url, {
            completed: false
        },
            {
                headers: {
                    'Authorization': `Bearer ${mainData.token}`,
                }
            }).then((response) => {
                props.handler()
                taskUncompleted()
                forceUpdate()
            }).catch((e) => {
                console.log(e)
            })
    }


    return (
        <>
            <div style={taskComp}>
                <h1 style={leftStyle}>{number} - {description}
                    <Tippy content="Delete Task">
                        <img onClick={removeTask} style={imageStyle} src={crossImg} />
                    </Tippy>
                    <Tippy content="Uncomplete Task">
                        <img onClick={uncompleteTask} style={imageStyle} src={undoImg} />
                    </Tippy>
                </h1>
                <p style={timeStyle}>Created {time[0]}</p>
                <p style={timeStyle}>Completed {update[0]}</p>
                


            </div>
            <br/>
        </>
    )
}

export default TaskDisplayCompleted

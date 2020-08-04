import React, { useState } from 'react'
import {useFormik} from 'formik'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
    AwesomeButton,
    AwesomeButtonProgress,
    // AwesomeButtonSocial,
  } from 'react-awesome-button';
import "react-awesome-button/dist/styles.css";
import {mainData} from '../pages/main'

toast.configure()

function cannotAddTask ()  {
    toast.error("⚠️Cannot Add Task!", {
        position: toast.POSITION.TOP_CENTER
    })
}


let loggedIn=false
let dataLogin;

const initialValues = {
    description: ''
}



//create your forceUpdate hook
function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
}

function AddTaskForm(props) {
    const forceUpdate = useForceUpdate();
    const onSubmit = (values) => {
        axios.post('https://michet-task-manager.herokuapp.com/tasks', {
                description: values.description
            }, {
                headers: {
                            'Authorization': `Bearer ${mainData.token}`,
                            crossdomain: true    
                }    
                
    
                }).then((resp) => {
                    console.log(resp)
                    // if (tasks > 5) {
                    //     updateScroll()
                    // }
                    
                }).catch((e) => {
                    cannotAddTask()
            })
    }

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            formik.handleSubmit()
            props.props.Refresh()
            props.props.onHide()
        }
      }

    const formik = useFormik({
        initialValues,
        onSubmit
    })

    const center = {
        marginLeft: "auto",
        marginRight: "auto",
        margin:"auto",
        display:"block"
    }
    const centerLabel = {
        display: "block",
        textAlign: "center"
    }
    
    if (loggedIn) {
        return (<Redirect to="/main"/>)
    }
    return (
        
        <div>
            <form onSubmit={formik.handleSubmit}>

            <label htmlFor='description' style={centerLabel}>Task Description</label>
            <textarea 
                type='text' 
                id='description' 
                onKeyPress={handleKeyPress}
                name='description' 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={center}
                value={formik.values.description}></textarea>
            {formik.touched.description && formik.errors.description ? <div className='error'>{formik.errors.description}</div> : null}
            <br/>
            <AwesomeButtonProgress
                type="secondary"
                size="medium"
                style={center}
                action={(element, next) => {
                    props.props.Refresh()
                    next();
                    props.props.onHide()
                }}
                >Add</AwesomeButtonProgress>
                           {/* <input type="text" id="one" onKeyPress={handleKeyPress} /> */}

            </form>


        </div>
    )
}

export default AddTaskForm


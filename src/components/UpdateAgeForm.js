import React, { useState } from 'react'
import {useFormik} from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
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

function cannotUpdateAge () {
    toast.error("⚠️Cannot Update Age!", {
        position: toast.POSITION.TOP_CENTER
    })
}
function UpdateAge () {
    toast.info("🔧 Age Updated!", {
        position: toast.POSITION.TOP_CENTER
    })
}


let loggedIn=false
let dataLogin;

const initialValues = {
    age: ''
}


//Form validation
const validationSchema = Yup.object({
    age: Yup.number("Age must be a number")
        .moreThan(0, "What? That's not possible...🤔")
        .integer("Age must be a number")
        .typeError('Age must be a number'),

})


//create your forceUpdate hook
function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
}

function AddTaskForm(props) {
    const forceUpdate = useForceUpdate();
    const onSubmit = (values) => {

        axios.patch('https://michet-task-manager.herokuapp.com/users/me', {
                age: values.age
            }, {
                headers: {
                            'Authorization': `Bearer ${mainData.token}`,
                            crossdomain: true    
                }    
                
    
                }).then((resp) => {
                    props.props.Update()
                    UpdateAge()
                }).catch((e) => {
                    cannotUpdateAge()
            })
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
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

            <label htmlFor='age' style={centerLabel}>New Age</label>
            <textarea 
                type='text' 
                id='age' 
                name='age' 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={center}
                value={formik.values.age}></textarea>
            {formik.touched.age && formik.errors.age ? <div className='error'>{formik.errors.age}</div> : null}
            <br/>
            <AwesomeButtonProgress
                type="secondary"
                size="large"
                style={center}
                action={(element, next) => {
                    next();
                    props.props.onHide()
                }}
                >Update</AwesomeButtonProgress>
                
            </form>


        </div>
    )
}

export default AddTaskForm


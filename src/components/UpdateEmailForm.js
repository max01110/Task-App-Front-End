import React, { useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
    AwesomeButton,
    AwesomeButtonProgress,
    // AwesomeButtonSocial,
} from 'react-awesome-button';
import "react-awesome-button/dist/styles.css";
import { mainData } from '../pages/main'

toast.configure()

function cannotUpdateEmail () {
    toast.error("⚠️Cannot Update Email!", {
        position: toast.POSITION.TOP_CENTER
    })
}
function UpdateEmail () {
    toast.info("🔧 Email Updated!", {
        position: toast.POSITION.TOP_CENTER
    })
}


//Form validation
const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email format')
        .required('Required'),

})

let loggedIn = false
let dataLogin;

const initialValues = {
    email: ''
}



//create your forceUpdate hook
function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
}

function AddTaskForm(props) {
    const forceUpdate = useForceUpdate();
    const onSubmit = (values) => {
        axios.patch('https://michet-task-manager.herokuapp.com/users/me', {
            email: values.email
        }, {
            headers: {
                'Authorization': `Bearer ${mainData.token}`,
                crossdomain: true
            }


        }).then((resp) => {
            props.props.Update()
            UpdateEmail()
        }).catch((e) => {
            cannotUpdateEmail()
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
        margin: "auto",
        display: "block"
    }
    const centerLabel = {
        display: "block",
        textAlign: "center"
    }

    if (loggedIn) {
        return (<Redirect to="/main" />)
    }
    return (

        <div>
            <form onSubmit={formik.handleSubmit}>

                <label htmlFor='email' style={centerLabel}>New Email</label>
                <textarea
                    type='text'
                    id='email'
                    name='email'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={center}
                    value={formik.values.email}></textarea>
                {formik.touched.email && formik.errors.email ? <div className='error'>{formik.errors.email}</div> : null}
                <br />
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


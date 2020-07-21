import React, { useState } from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import { toast } from 'react-toastify'
import {
    AwesomeButton,
    AwesomeButtonProgress,
    // AwesomeButtonSocial,
  } from 'react-awesome-button';
import "react-awesome-button/dist/styles.css";
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

function cannotLogin ()  {
    toast.error("⚠️Shoot! We weren't able to log you in... 😞", {
        position: toast.POSITION.TOP_CENTER
    })
}

function welcomeBack (name)  {
    toast(`😉 Welcome back ${name}`, {
        position: toast.POSITION.TOP_RIGHT
    })
}

let loggedIn=false
let dataLogin;

const initialValues = {
    email: '',
    password: ''
}

//Form validation
const validationSchema = Yup.object({
    email: Yup.string()
        .required('Required'),
    
    password: Yup.string()
    .required('Required')
})

//create your forceUpdate hook
function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
}

function LoginForm() {
    const forceUpdate = useForceUpdate();
    const onSubmit = (values) => {
        axios.post('https://michet-task-manager.herokuapp.com/users/login', {
                email: values.email,
                password: values.password
                }).then((resp) => {
                    dataLogin = resp.data
                    loggedIn = true;
                    forceUpdate()
                    console.log(dataLogin)
                    welcomeBack(dataLogin.user.name)
                }).catch((e) => {
                    //Little notification
                    cannotLogin()
                    console.log(e)
            })
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })


    if (loggedIn) {
        return (<Redirect to="/main"/>)
    }
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>

            <label htmlFor='email'>E-mail</label>
            <input 
                type='text' 
                id='email' 
                name='email' 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}></input>
            {formik.touched.email && formik.errors.email ? <div className='error'>{formik.errors.email}</div> : null}

            <label htmlFor='password'>Password</label>
            <input 
                type='text' 
                id='password' 
                name='password' 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}></input>
            {formik.touched.password && formik.errors.password ? <div className='error'>{formik.errors.password}</div> : null}

            <AwesomeButtonProgress
                type="secondary"
                // type="submit"
                size="large"
                action={(element, next) => {
                    formik.handleSubmit()
                    // next()
                    
                }}
                >Login</AwesomeButtonProgress>
            </form>

        </div>
    )
}

export default LoginForm

export {dataLogin}

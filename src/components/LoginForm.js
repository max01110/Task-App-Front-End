import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
    AwesomeButton,
    AwesomeButtonProgress,
    // AwesomeButtonSocial,
} from 'react-awesome-button';
import "react-awesome-button/dist/styles.css";
import 'react-toastify/dist/ReactToastify.css'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

toast.configure()

function cannotLogin() {
    toast.error("⚠️Shoot! We weren't able to log you in... 😞", {
        position: toast.POSITION.TOP_CENTER
    })
}

function welcomeBack(name) {
    toast(`😉 Welcome back ${name}`, {
        position: toast.POSITION.TOP_RIGHT
    })
}

let loggedIn = false
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
function useForceUpdate() {
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
            Cookies.set('user', dataLogin);
            welcomeBack(dataLogin.user.name)
        }).catch((e) => {
            //Little notification
            cannotLogin()
        })
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

    const togglePassword = (t) => {
        var x = document.getElementById("password")
        var y = document.getElementById("hide1")
        var z = document.getElementById("hide2")
        

        if (x.type === 'password') {
            x.type = "text"
            y.style.display = "block"
            z.style.display = "none"  
        } else {
            x.type = "password"
            y.style.display = "none"
            z.style.display = "block"  
        }      
    }

    //Styling
    const eyeStyle = {
        position: "absolute",
        top: "124px",
        left: "380px"
    }

    const hide1 = {
        display: "none"
    }

    const hide2 = {

    }


    if (loggedIn) {
        return (<Redirect to="/main" />)
    }
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>

                <label htmlFor='email'>E-mail</label>
                <input
                    type='text'
                    id='email'
                    placeholder="email@mail.com"
                    name='email'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}></input>
                {formik.touched.email && formik.errors.email ? <div className='error'>{formik.errors.email}</div> : null}

                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    id='password'
                    name='password'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}></input>
                {formik.touched.password && formik.errors.password ? <div className='error'>{formik.errors.password}</div> : null}
                <span style={eyeStyle} class="eye" onClick={togglePassword}>
                    <FaEye style={hide1} id="hide1"/>
                    <FaEyeSlash style={hide2} id="hide2"/>
                </span>
            
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

export { dataLogin }

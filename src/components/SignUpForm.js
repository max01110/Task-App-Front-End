import React, { useState } from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
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

toast.configure()

function cannotSignup ()  {
    toast.error("⚠️Shoot! We weren't able to create you account... 😞", {
        position: toast.POSITION.TOP_CENTER
    })
}

function welcome (name)  {
    toast(`🎉 Welcome, ${name}`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 8000
    })
}

let loggedIn = false;
let data;

const initialValues = {
    name: '',
    email: '',
    password: ''
}

//Form validation
const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    age: Yup.number("Age must be a number")
        .moreThan(0, "What? That's not possible...🤔")
        .integer("Age must be a number")
        .typeError('Age must be a number'),
    email: Yup.string()
        .email('Invalid email format')
        .required('Required'),
    
    password: Yup.string()
    .min(5, 'A password of at least 5 characters is required!')
    .required('Required')
})




//create your forceUpdate hook
function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
}

function SignUpForm() {
    const forceUpdate = useForceUpdate();
    //Form Submit --> POST / users
    const onSubmit = values => {
        axios.post('https://michet-task-manager.herokuapp.com/users', {
                name: values.name,
                age: values.age,
                email: values.email,
                password: values.password
                }).then((resp) => {
                    data = resp.data
                    loggedIn = true;
                    forceUpdate()
                    welcome(data.user.name)
                }).catch((e) => {
                    cannotSignup()
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
    } else {
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>

            <label htmlFor='name'>Name</label>
            <input 
                type='text' 
                id='name' 
                name='name' 
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur}
                value={formik.values.name}></input>
            {formik.touched.name && formik.errors.name ? <div className='error'>{formik.errors.name}</div> : null}
            
            <label htmlFor='age'>Age</label>
            <input 
                type='text' 
                id='age' 
                name='age' 
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur}
                value={formik.values.age}></input>
            {formik.touched.age && formik.errors.age ? <div className='error'>{formik.errors.age}</div> : null}

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
                size="large"
                action={(element, next) => {
                    // formik.handleSubmit()
                    // next()
                    
                }}
                >Create</AwesomeButtonProgress>
        
            </form>

        </div>
    )
}
}

export default SignUpForm

export {data}

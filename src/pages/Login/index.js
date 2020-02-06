import React from 'react'

import { ErrorMessage, Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import axios from 'axios'

import { history } from '../../history'
import './styles.css'

const Login = () => {
    const handleSubmit = values => {
        axios.post('http://localhost:3002', values).then(resp => {
            const { data } = resp
            if (data) {
                localStorage.setItem('app-token', data)
                history.push('/')
            }
        })
    }
    const validations = yup.object().shape({
        email: yup
            .string()
            .email()
            .required(),
        password: yup
            .string()
            .min(8)
            .required(),
    })
    return (
        <div className="app-login">
            <h1>Login</h1>
            <p>Fill the fields to continue</p>
            <Formik
                onSubmit={handleSubmit}
                initialValues={{}}
                validationSchema={validations}
            >
                <Form className="login">
                    <div className="login-group">
                        <Field name="email" className="login-field" />
                        <ErrorMessage
                            component="span"
                            name="email"
                            className="login-error"
                        ></ErrorMessage>
                    </div>
                    <div className="login-group">
                        <Field name="password" className="login-field" />
                        <ErrorMessage
                            component="span"
                            name="password"
                            className="login-error"
                        ></ErrorMessage>
                    </div>
                    <button className="login-btn" type="submit">
                        Login
                    </button>
                </Form>
            </Formik>
        </div>
    )
}

export default Login

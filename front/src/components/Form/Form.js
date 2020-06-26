import React, { useState } from "react"
import Button from "react-bootstrap/Button"
import  Form from 'react-bootstrap/Form'
import classes from './Form.module.scss'

export const AuthForm = ({register}) => {
    const [validated, setValidated] = useState(false)
    const submitHandler = (event) => {
      event.preventDefault()
      const form = event.target
      if(form.checkValidity()) {
        // make request to server
      }

    }
    return (
      <Form
        style={{ marginTop: "10rem" }}
        validated={validated}
        onSubmit={submitHandler}
      >
        <Form.Group controlId='formBasicEmail' className={classes.Controls}>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' required placeholder='Enter email' />
          <Form.Control.Feedback type='invalid'>
            Please choose a username.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId='formBasicPassword' className={classes.Controls}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            required
            minLength='5'
            placeholder='Password'
          />
        </Form.Group>
        <Button variant='primary' type='submit' style={{ float: "right" }}>
          {register ? "Зарегистрироваться " : "Войти"}
        </Button>
      </Form>
    )
}


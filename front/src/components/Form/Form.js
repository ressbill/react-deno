import React, { useState, createRef, useEffect } from "react"
import Button from "react-bootstrap/Button"

export const AuthForm = ({ register }) => {
  const [formInputs, setFormInputs] = useState({ email: "", password: "" })
  const [validEmail, setValidEmail] = useState(false)
  const [validPassword, setValidPassword] = useState(false)
  const [formValidated, setFormValidated] = useState(false)

  const submitHandler = (event) => {
    setFormValidated(true)
    setValidEmail(isEmail(formInputs.email))
    setValidPassword(formInputs.password.length >=5)
    event.preventDefault()
    if (validPassword && validEmail) {
      // request to server depends on register props
    }
  }

  const onEmailChange = (event) => {
    const emailValue = event.target.value
    setValidEmail(isEmail(event.target.value))
    setFormInputs((prev) => {
      return { ...prev, email: emailValue }
    })
  }
  const onPasswordChange = (event) => {
    const passwordValue = event.target.value
    setValidPassword(passwordValue.length >= 5)
    setFormInputs((prev) => {
      return { ...prev, password: passwordValue }
    })
  }

  return (
    <form style={{ marginTop: "10rem" }} onSubmit={submitHandler}>
      <label htmlFor='email'>Enter email:</label>
      <div className='input-group mb-4'>
        <div className='input-group-prepend'>
          <span className='input-group-text' id='basic-addon1'>
            @
          </span>
        </div>
        <input
          type='text'
          className='form-control'
          placeholder='u@mail.com'
          aria-label='Email'
          id='email'
          onChange={onEmailChange}
        />
      </div>
      {!validEmail && formValidated ? (
        <span
          style={{
            display: "block",
            fontSize: "0.9rem",
            color: "red",
            marginTop: "-1rem",
          }}
        >
          Please enter a valid email
        </span>
      ) : null}

      <label htmlFor='password'>Password:</label>
      <div className='input-group mb-3'>
        <div className='input-group-prepend'></div>
        <input
          type='text'
          className='form-control'
          placeholder='Password'
          aria-label='Password'
          id='password'
          onChange={onPasswordChange}
        />
      </div>
      {!validPassword && formValidated ? (
        <span
          style={{
            display: "block",
            fontSize: "0.9rem",
            color: "red",
            marginTop: "-0.5rem",
          }}
        >
          Password must contain at least 5 charachters
        </span>
      ) : null}

      <Button variant='primary' type='submit' style={{ float: "right" }}>
        {register ? "Sign in" : "Login"}
      </Button>
    </form>
  )
}

function isEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

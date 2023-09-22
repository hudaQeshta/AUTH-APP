import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { AuthRequest } from '../api/users.api'
import { RootState } from '../store'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { Link, Navigate } from 'react-router-dom'
import { login, setError } from '../store/users.store'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import ToastErrorMsg from '../components/ToastErrorMsg'

const SignInPage = () => {
  const [signInFormData, setSignInFormData] = useState({} as AuthRequest)
  const [disabled, setDisabled] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const dispatch = useAppDispatch()

  const { isAuthed, loading, error } = useAppSelector(
    (state: RootState) => state.users
  )
  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.value) {
      setSignInFormData({
        ...signInFormData,
        [e.target.name]: e.target.value,
      })
    }
  }

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let signInData = { ...signInFormData }
    signInData['email'] = signInData['email'].toLocaleLowerCase()
    await dispatch(login({ ...signInData }))
  }

  useEffect(() => {
    if (
      Object.values(signInFormData).length === 0 ||
      Object.values(signInFormData).filter(
        (v: Record<string, any>) => v.length === 0
      ).length > 0 ||
      loading
    ) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [JSON.stringify(signInFormData), loading])

  return isAuthed ? (
    <Navigate to='/' />
  ) : (
    <>
      {error &&
        error.map((e) => (
          <ToastErrorMsg
            key={e}
            e={e}
            onClose={() => dispatch(setError(error.filter((err) => err !== e)))}
          />
        ))}
      <Row className='align-items-center justify-content-center'>
        <Col xs={12} md={8} lg={6}>
          <Card>
            <Card.Title className='custom'>Sign In</Card.Title>
            <Card.Body>
              <Form onSubmit={handleOnSubmit}>
                <Row className='my-2'>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <Form.Group className='mt-2' controlId='Email'>
                      <Form.Label className='label'>Email</Form.Label>
                      <Form.Control
                        type='email'
                        autoComplete='off'
                        placeholder={'John@johndoe.com'}
                        name='email'
                        maxLength={80}
                        required={true}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleOnChange(e)
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className='my-2'>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <Form.Group className='mt-2' controlId='Password'>
                      <Form.Label className='label'>Password</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={showPass ? 'text' : 'password'}
                          autoComplete='new-password'
                          placeholder={'**************'}
                          name='password'
                          required={true}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleOnChange(e)
                          }
                        />
                        <InputGroup.Text onClick={() => setShowPass(!showPass)}>
                          {showPass ? <AiFillEyeInvisible /> : <AiFillEye />}
                        </InputGroup.Text>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className='my-3'>
                  <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    className={'text-center'}
                  >
                    <Button
                      disabled={disabled}
                      className='btn btn-primary my-2 px-3'
                      type='submit'
                    >
                      {loading ? (
                        <div
                          className='spinner-border text-light'
                          role='submit'
                        ></div>
                      ) : (
                        'Sign in'
                      )}
                    </Button>
                  </Col>
                </Row>
                <small className='d-flex justify-content-center mt-4'>
                  Not a part of the crew yet ? &nbsp;
                  <span
                    style={{
                      cursor: 'pointer',
                      color: 'blue',
                    }}
                    onClick={() => {
                      if (
                        document &&
                        document.getElementById('signup-redirect-link')
                      ) {
                        let redirectLink = document.getElementById(
                          'signup-redirect-link'
                        ) as HTMLElement
                        redirectLink.click()
                      }
                    }}
                    className='text-decoration-underline link-offset-2'
                  >
                    Sign Up
                  </span>
                </small>
              </Form>
              <Link to={'/signup'} replace={true} id='signup-redirect-link' />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default SignInPage

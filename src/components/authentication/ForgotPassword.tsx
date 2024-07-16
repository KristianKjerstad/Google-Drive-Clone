


import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import { CenteredContainer } from './centeredContainer';

export function ForgotPassword() {

    const emailRef = useRef()
    const [error, setError] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const { resetPassword } = useAuth()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setMessage("")
            setError("")
            setLoading(true)
            console.log("sdf")
            await resetPassword(emailRef.current.value)
            console.log("x")
            setMessage("Check your inbox for further instructions.")
        } catch {
            setError("Failed to reset password")
            setMessage("")
        } finally {
            setLoading(false)
        }
    }

    return (
        <CenteredContainer>
            <div>
                <Card>
                    <Card.Body>
                        <h2 className='text-center mb-4'>Rest Password</h2>
                        {error && <Alert variant='danger'>{error}</Alert>}
                        {message && <Alert variant='success'>{message}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" required ref={emailRef} />
                            </Form.Group>
                            <Button disabled={loading} className='w-100 mt-4' type="submit">
                                Reset Password
                            </Button>
                        </Form>
                        <div className="w-100 text-center mt-4">
                            <Link to="/login">Log in</Link>
                        </div>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    Need an account? <Link to="/signup">Sign up</Link>
                </div>
            </div>
        </CenteredContainer>
    )
}
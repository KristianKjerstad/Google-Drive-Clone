
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

export function Login() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value ?? "", passwordRef.current.value ?? "")
            navigate("/")
        } catch {
            setError("Failed to log in")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Log in</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" required ref={emailRef} />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" required ref={passwordRef} />
                        </Form.Group>

                        <Button disabled={loading} className='w-100 mt-4' type="submit">
                            Log in
                        </Button>
                    </Form>
                    <div className="w-100 text-center mt-4">
                        <Link to="/forgot-password">Forgot password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signup">Sign up</Link>
            </div>
        </div>
    )
}
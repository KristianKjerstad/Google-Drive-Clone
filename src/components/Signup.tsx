import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useRef, useState } from "react"
import { useAuth } from "../contexts/AuthContext"


export function Signup() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup, currentUser } = useAuth()
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    async function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("password do not match")
        }
        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value ?? "", passwordRef.current.value ?? "")

        } catch {
            setError("Failed to create an account")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Sign Up</h2>
                    {JSON.stringify(currentUser)}
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
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" required ref={passwordConfirmRef} />
                        </Form.Group>
                        <Button disabled={loading} className='w-100 mt-4' type="submit">
                            Sign Up
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? Login
            </div>
        </div>
    )
}
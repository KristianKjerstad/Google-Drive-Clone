import { useEffect } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom";

import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useRef, useState } from "react"
import { CenteredContainer } from "./centeredContainer";

export function UpdateProfile() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup, currentUser, updateUserEmail, updateUserPassword } = useAuth()
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Password do not match")
        }
        setLoading(true)
        setError("")
        const promises = []
        if (emailRef.current.value !== currentUser?.email) {
            promises.push(updateUserEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(updateUserPassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            navigate("/user")
        }).catch(() => {
            setError("Failed to update account")
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        if (currentUser === null) {
            navigate("/login")
        }
    }, [])

    return (
        <CenteredContainer>
            <div>
                <Card>
                    <Card.Body>
                        <h2 className='text-center mb-4'>Update profile</h2>
                        {error && <Alert variant='danger'>{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email" >
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" defaultValue={currentUser?.email} required ref={emailRef} />
                            </Form.Group>
                            <Form.Group id="password" >
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Leave blank to keep the same" ref={passwordRef} />
                            </Form.Group>
                            <Form.Group id="password-confirm">
                                <Form.Label>Password Confirmation</Form.Label>
                                <Form.Control type="password" placeholder="Leave blank to keep the same" ref={passwordConfirmRef} />
                            </Form.Group>
                            <Button disabled={loading} className='w-100 mt-4' type="submit">
                                Update
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    <Link to="/user">Cancel</Link>
                </div>
            </div>
        </CenteredContainer>
    )
}
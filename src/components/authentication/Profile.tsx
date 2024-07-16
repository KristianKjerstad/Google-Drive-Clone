import { useEffect, useState } from "react";
import { Alert, Button, Card } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { CenteredContainer } from "./centeredContainer";

export function Profile() {
    const [error, setError] = useState<string>("")
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()

    async function handleLogout() {
        setError("")
        try {
            await logout()
            navigate("/login")
        } catch {
            setError("Failed to log out")
        }

    }

    useEffect(() => {
        if (currentUser === null) {
            navigate("/login")
        }
    }, [])



    return <CenteredContainer>
        <div>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email:</strong> {currentUser?.email ?? "None"}
                    <Link to="/update-profile" className="btn btn-primary w-100 mt-4">Update profile</Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}>
                    Log out
                </Button>
            </div>
        </div>
    </CenteredContainer>
}
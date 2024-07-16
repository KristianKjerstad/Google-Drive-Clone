import { Container } from "react-bootstrap";



export function CenteredContainer({ children }: { children: JSX.Element }) {
    return <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: "100vh" }}>
        <div className='w-100' style={{ maxWidth: "400px" }}>
            {children}
        </div>
    </Container>
}
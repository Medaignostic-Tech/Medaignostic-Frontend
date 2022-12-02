import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../assets/Medaignostic-logos.jpeg';
import '../styles/MainNavbar.css'
import auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';

function UserNavbar() {
    const history = useNavigate();

    const callLogout = async () => {
        auth.logout(() => {
            history("/");
        })
    }

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="md">
                <Container>
                    <Navbar.Brand href="/dashboard"><img src={ logo } alt="Medaignostic" className="nav-logo"/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />  
                    <Navbar.Collapse id="basic-navbar-nav">  
                        <Nav className="me-auto">
                            <Button variant="outline-light" onClick={callLogout}>Logout</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default UserNavbar;
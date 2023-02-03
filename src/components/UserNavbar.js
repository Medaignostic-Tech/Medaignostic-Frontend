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

    const callLogout = () => {
        auth.logout(() => {
            history("/login", {replace: true});
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
                            <Nav.Link href="/dashboard">Home</Nav.Link>
                            <Nav.Link href="/upload_reports">Upload</Nav.Link>
                            <Nav.Link href="/verify_reports">Verify</Nav.Link>
                            <Nav.Link href="/profile">Profile</Nav.Link>
                            &nbsp;&nbsp;&nbsp;
                            <button type="button" className="logout-btn logout-cube logout-cube-hover" style={{marginTop: '0.7em'}} onClick={callLogout}>
                                <div className="logout-bg-top">
                                    <div className="logout-bg-inner"></div>
                                </div>
                                <div className="logout-bg-right">
                                    <div className="logout-bg-inner"></div>
                                </div>
                                <div className="logout-bg">
                                    <div className="logout-bg-inner"></div>
                                </div>
                                <div className="logout-text">Logout</div>
                            </button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default UserNavbar;
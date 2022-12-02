import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.css';
import MainNavbar from './MainNavbar';
import '../styles/Login.css'
import auth from '../utils/auth';
import logo from '../assets/Medaignostic-logos.jpeg';
import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Register() {
    const loginNavigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [alert, setAlert] = useState('');

    const registerHandler = async () => {
        if (password !== confirm_password) {
            setAlert("Passwords did not match");
        }
        else {
            const response = auth.register(name, email, phone, age, gender, password);
            const status = await response;
            loginNavigate("/login", {replace:true, state:{"alert_status":status[1], "alert":status[0]}});
        }
    }

    return (
        <div>
            <MainNavbar />
            <Container className='register-content' fluid={true}>
                <Row className='justify-content-md-center login-form'>
                    <Col md={{span:4}}>
                        <Card className='main-login mb-2' bg='light' text='dark' border='dark'>
                            <Card.Img variant="top" src={ logo } height="300em" />
                            <Card.Header>
                                <Nav variant="tabs" defaultActiveKey="/register">
                                    <Nav.Item>
                                        <Nav.Link href="/login">Login</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href="/register">Register</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter name" required onChange={event => setName(event.target.value)}/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="email">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" required onChange={event => setEmail(event.target.value)}/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="phone">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control type="text" placeholder="Enter phone number" onChange={event => setPhone(event.target.value)}/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="age">
                                        <Form.Label>Age</Form.Label>
                                        <Form.Control type="number" placeholder="Enter age" required onChange={event => setAge(event.target.value)}/>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Check inline name='gender' type="radio" placeholder="Male" label='Male' onClick={() => setGender('male')}/>
                                        <Form.Check inline name='gender' type="radio" placeholder="Female" label='Female' onClick={() => setGender('female')}/>
                                    </Form.Group>
                                    <Form.Group className="mb-4" controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" required onChange={event => setPassword(event.target.value)}/>
                                    </Form.Group>
                                    <Form.Group className="mb-4" controlId="confirm_password">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control type="password" placeholder="Confirm Password" required onChange={event => setConfirmPassword(event.target.value)}/>
                                    </Form.Group>
                                    <Button variant="dark" type="button" onClick={registerHandler}>
                                        Submit
                                    </Button>
                                </Form>
                            </Card.Body>
                            <Card.Footer className="text-danger">{ alert }</Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Register;